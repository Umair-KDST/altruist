const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Post } = require("../models/Post");
const { User } = require("../models/User");
const { Auth } = require("../models/Auth");
const { Comment } = require("../models/Comment");
const { Volunteer } = require("../models/Volunteer");
const { Skill } = require("../models/Skill");

//Create Post
router.post("/", async (req, res) => {
  const { user_id, text, title, lat, long, skills } = req.body;
  try {
    let postSkills = [];
    let pSkills = [];

    //Removing starting and ending spaces from all objects
    skills.forEach((i) => {
      pSkills.push(i.trim());
    });
    console.log("skills after filtering are  ", pSkills);

    //Getting or generating skill_id regarding the names of skills
    for (let i = 0; i < pSkills.length; i++) {
      let name = pSkills[i];
      let sk = await Skill.findOne({ name: name });

      if (sk === null) {
        const newSkill = new Skill({ name });
        await newSkill.save();
        sk = await Skill.findOne({ name: name });
      }
      console.log("sk is ", sk);
      //adding skill ids for skills array
      postSkills.push({ skill_id: sk._id });
      console.log("skills on post are ", postSkills);
    }

    // pSkills.map(async (name) => {
    //   try {
    //     let sk = await Skill.findOne({ name: name });

    //     if (sk === null) {
    //       const newSkill = new Skill({ name });
    //       await newSkill.save();
    //       sk = await Skill.findOne({ name: name });

    //     }
    //     console.log("sk is ", sk)
    //     postSkills.push({ "skill_id": sk._id ? sk._id : "dummy" })
    //     console.log("skills on post are ", postSkills)
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // })

    console.log("skills on post are ", postSkills);
    // const postSkills = skills.filter(v => v.trim())

    //Creating skills
    const post = new Post({ user_id, text, title, lat, long, postSkills });
    await post.save();
    res.status(201).send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//Get User Posts
router.get("/:id/getUserPosts", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.aggregate([
      {
        $match: {
          user_id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "user_id", //post
          foreignField: "user_id", //joining with
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: "user_id", //post
          foreignField: "_id", //joining with
          as: "user.profile",
        },
      },
      {
        $unwind: "$user.profile",
      },
      {
        $lookup: {
          from: Volunteer.collection.name,
          localField: "_id", //post
          foreignField: "post_id", //joining with

          as: "PostVolunteers",
        },
      },

      {
        $lookup: {
          from: Auth.collection.name,
          localField: "PostVolunteers.user_id",
          foreignField: "user_id",

          as: "PostVolunteers",
        },
      },
      {
        $lookup: {
          from: Skill.collection.name,
          localField: "postSkills.skill_id",
          foreignField: "_id",

          as: "postSkills",
        },
      },

      {
        $project: {
          "user._id": 0,
          "user.flag": 0,
          "user.password": 0,
          "user.user_id": 0,
          "user.__v": 0,
          "PostVolunteers.password": 0,
        },
      },
    ]).sort({ date: -1 });
    res.status(200).send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get Volunteered Posts
router.get("/:id/getVolunteeredPosts", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Volunteer.aggregate([
      {
        $match: {
          user_id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: Post.collection.name,
          localField: "post_id", //post
          foreignField: "_id", //joining with
          as: "post",
        },
      },
      {
        $unwind: "$post",
      },
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "post.user_id", //post
          foreignField: "user_id", //joining with
          as: "post.user",
        },
      },
      {
        $unwind: "$post.user",
      },

      {
        $lookup: {
          from: User.collection.name,
          localField: "post.user_id", //post
          foreignField: "_id", //joining with
          as: "post.user.profile",
        },
      },
      {
        $unwind: "$post.user.profile",
      },

      {
        $lookup: {
          from: Volunteer.collection.name,
          localField: "post._id", //post
          foreignField: "post_id", //joining with

          as: "post.PostVolunteers",
        },
      },

      {
        $lookup: {
          from: Auth.collection.name,
          localField: "post.PostVolunteers.user_id",
          foreignField: "user_id",

          as: "post.PostVolunteers",
        },
      },
      {
        $lookup: {
          from: Skill.collection.name,
          localField: "post.postSkills.skill_id",
          foreignField: "_id",

          as: "post.postSkills",
        },
      },
      {
        $project: {

          "post.user.flag": 0,
          "post.user.password": 0,
          "post.user.__v": 0,

          "post.PostVolunteers.flag": 0,
          "post.PostVolunteers.password": 0,
          "post.PostVolunteers.__v": 0,

        },
      },
    ]);
    res.status(200).send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get All or Searched Posts
router.get("/:query?", async (req, res) => {
  try {
    let { query } = req.params;
    console.log("query: ", query);

    let post = null;

    if (query == undefined) {
      query = "";
    }
    let reg = { $regex: query, $options: "i" };
    post = await Post.aggregate([
      {
        $match: {
          $or: [{ title: reg }, { text: reg }, { 'postSkills': { 'name': reg } }, { "user.username": reg }],
        },
      },
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "user_id", //post
          foreignField: "user_id", //joining with
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },

      {
        $lookup: {
          from: User.collection.name,
          localField: "user_id", //post
          foreignField: "_id", //joining with
          as: "user.profile",
        },
      },
      {
        $unwind: "$user.profile",
      },

      {
        $lookup: {
          from: Volunteer.collection.name,
          localField: "_id", //post
          foreignField: "post_id", //joining with

          as: "PostVolunteers",
        },
      },

      {
        $lookup: {
          from: Auth.collection.name,
          localField: "PostVolunteers.user_id",
          foreignField: "user_id",

          as: "PostVolunteers",
        },
      },

      // {
      //   $lookup: {
      //     from: User.collection.name,
      //     localField: "PostVolunteers.user_id",
      //     foreignField: "_id",

      //     as: "PostVolunteers.profile",
      //   },
      // },
      // {
      //   $unwind: "$PostVolunteers.profile",
      // },


      {
        $lookup: {
          from: Skill.collection.name,
          localField: "postSkills.skill_id",
          foreignField: "_id",

          as: "postSkills",
        },
      },

      {
        $project: {
          "user._id": 0,
          "user.flag": 0,
          "user.password": 0,
          "user.user_id": 0,
          "user.__v": 0,
          "PostVolunteers.password": 0,
        },
      },
    ]).sort({ date: -1 });

    res.status(200).send(post);
    console.log("get post api : ", post);
    // console.log('abc is : ', abc)
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

//Get Single Posts
router.get("/:id/getPost", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "user_id", //post
          foreignField: "user_id", //joining with
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: "user_id", //post
          foreignField: "_id", //joining with
          as: "user.profile",
        },
      },
      {
        $unwind: "$user.profile",
      },
      {
        $lookup: {
          from: Volunteer.collection.name,
          localField: "_id", //post
          foreignField: "post_id", //joining with

          as: "PostVolunteers",
        },
      },

      {
        $lookup: {
          from: Auth.collection.name,
          localField: "PostVolunteers.user_id",
          foreignField: "user_id",

          as: "PostVolunteers",
        },
      },
      {
        $lookup: {
          from: Skill.collection.name,
          localField: "postSkills.skill_id",
          foreignField: "_id",

          as: "postSkills",
        },
      },

      {
        $project: {
          "user._id": 0,
          "user.flag": 0,
          "user.password": 0,
          "user.user_id": 0,
          "user.__v": 0,
          "PostVolunteers.password": 0,
        },
      },
    ]).sort({ date: -1 });
    res.status(200).send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Delete Posts
router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndRemove(id);
    const volunteer = await Volunteer.deleteMany({ post_id: id });
    res.status(200).send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Edit Posts
router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { text, title, lat, long, skills } = req.body;
  try {
    let postSkills = [];
    console.log("skills are ", skills);
    if (skills.length > 0) {
      let pSkills = [];

      //Removing starting and ending spaces from all objects
      skills.forEach((i) => {
        pSkills.push(i.trim());
      });
      console.log("skills after filtering are  ", pSkills);

      //Getting or generating skill_id regarding the names of skills
      for (let i = 0; i < pSkills.length; i++) {
        let name = pSkills[i];
        let sk = await Skill.findOne({ name: name });

        if (sk === null) {
          const newSkill = new Skill({ name });
          await newSkill.save();
          sk = await Skill.findOne({ name: name });
        }
        console.log("sk is ", sk);
        //adding skill ids for skills array
        postSkills.push({ skill_id: sk._id });
        console.log("skills on post are ", postSkills);
      }
    }
    const post = await Post.findByIdAndUpdate(
      id,
      {
        text,
        title,
        lat,
        long,
        postSkills,
      },
      { new: true, omitUndefined: true }
    );

    console.log("");
    res.status(200).send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Volunteer on Post
router.post("/:id/volunteer", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { volunteers: { user: user_id } },
      },
      { new: true }
    );
    console.log(post);
    return res.status(201).send(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//Vote a Post
router.post("/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { user_id, vote_type } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, {
      $push: { votes: { user: user_id, type: vote_type } },
    });
    res.status(201).send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
