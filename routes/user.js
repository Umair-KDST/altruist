const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User } = require("../models/User");
const { Auth } = require("../models/Auth");
const { Skill } = require("../models/Skill");

//GET users listing
router.get("/", async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "_id",
          foreignField: "user_id",
          as: "user",
        },
      }, {
        $unwind: "$user",
      },
      {
        $project: {
          "user._id": 0,
          "user.password": 0,
          "user.user_id": 0,
          "user.__v": 0,
        },
      },

    ]).sort({ verified: 1 });
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get user by username
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.aggregate([
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "_id",
          foreignField: "user_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: Skill.collection.name,
          localField: "skills.skill_id",
          foreignField: "_id",
          as: "skills",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          "user.username": username,
        },
      },
      {
        $project: {
          "user._id": 0,
          "user.flag": 0,
          "user.password": 0,
          "user.user_id": 0,
          "user.__v": 0,
        },
      },
    ]);

    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.put("/", async (req, res, next) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       phone,
//       address,
//       dob,
//       cnic,
//       gender,
//       email,
//       userType,
//       profile_picture,
//     } = req.body;

//     let user = await User.findOne({ phone });
//     if (user) return res.status(409).send("This phone number already exists");

//     user = await User.findOne({ cnic });
//     if (user) return res.status(409).send("This cnic number already exists");

//     user = await User.findByIdAndUpdate({
//       name: { firstName, lastName },
//       phone,
//       address,
//       dob,
//       gender,
//       cnic,
//       email,
//       phone,
//       userType,
//       profile_picture,
//     });
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

//Update User
router.put("/update", async (req, res, next) => {
  try {
    const { _id, phone, address, email } = req.body;

    user = await User.findByIdAndUpdate(
      _id,
      {
        phone,
        address,
        email,
      },
      { new: true, omitUndefined: true }
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Search users listing
router.get("/search/user", async (req, res) => {
  try {
    const { abc } = req.body;
    let user = null;
    let reg = { $regex: abc, $options: "i" };

    // if (abc) {
    //   user = await User.find().or([{ "name.firstName": abc },
    //   { "name.lastName": abc }])

    //   // user = await User.find({}).where(name.firstName_or_name.lastName).equals(abc)
    // }
    // else {
    //   user = await User.find()
    // }

    if (abc) {
      user = await User.find().or([
        { "name.firstName": reg },
        { "name.lastName": reg },
        { phone: reg },
      ]);
    } else {
      user = await User.find();
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

//Add skill to user profile
router.post("/:id/skill", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    let skill = await Skill.findOne({ name: name });

    if (skill === null) {
      const newSkill = new Skill({ name });
      await newSkill.save();
      skill = await Skill.findOne({ name: name });
    }
    var user_id = mongoose.Types.ObjectId(id);
    let user = await User.findOne({ _id: id, "skills.skill_id": skill._id });

    // let user = await User.findByIdAndUpdate(
    //   id,
    //   {
    //     $pull: { skills: { skill_id: skill._id } },
    //   },
    //   { new: true }
    //   // { upsert: true }
    // );

    if (user === null) {
      user = await User.findByIdAndUpdate(
        id,
        {
          $push: { skills: { skill_id: skill._id } },
        },
        { new: true }
      );
    }
    console.log("user is ", user);
    console.log("skill is ", skill._id);
    return res.status(201).send(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//Change to Non-Verified
router.put("/unverify", async (req, res, next) => {
  try {
    const { user_id } = req.body;
    let verified = 0;

    user = await User.findByIdAndUpdate(
      user_id,
      {
        verified,
      },
      { new: true, omitUndefined: true }
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Verify
router.put("/verify", async (req, res, next) => {
  try {
    const { user_id } = req.body;
    let verified = 1;

    user = await User.findByIdAndUpdate(
      user_id,
      {
        verified,
      },
      { new: true, omitUndefined: true }
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Disable
router.put("/disable", async (req, res, next) => {
  try {
    const { user_id } = req.body;
    let enabled = 0;

    user = await User.findByIdAndUpdate(
      user_id,
      {
        enabled,
      },
      { new: true, omitUndefined: true }
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});


//Enable
router.put("/enable", async (req, res, next) => {
  try {
    const { user_id } = req.body;
    let enabled = 1;

    user = await User.findByIdAndUpdate(
      user_id,
      {
        enabled,
      },
      { new: true, omitUndefined: true }
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});


//Get Disabled Users
router.get("/get/getDisabledUsers", async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "_id",
          foreignField: "user_id",
          as: "user",
        },
      }, {
        $unwind: "$user",
      },
      {
        $project: {
          "user._id": 0,
          "user.password": 0,
          "user.user_id": 0,
          "user.__v": 0,
        },
      },
      {
        $match: {
          enabled: false,
        },
      },


    ])
    // .sort({ verified: 1 });
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// //Get current details of logged in user
// router.get("/get/current", async (req, res) => {
//   try {
//     const {user_id}=req.body;
//     const user = await User.findOne({ 'user_id': user_id });
//     // .sort({ verified: 1 });
//     res.status(200).send(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send(err.message);
//   }
// });


//Get Single User
router.get("/:id/getUserById", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
