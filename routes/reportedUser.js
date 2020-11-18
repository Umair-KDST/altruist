const express = require("express");
const router = express.Router();
const { ReportedUser } = require("../models/ReportedUser");
const mongoose = require("mongoose");
const { Auth } = require("../models/Auth");
const { User } = require("../models/User");


// Report a User
router.post("/", async (req, res) => {
  const { reporter_user_id, reported_user_id } = req.body;
  try {
    let reportedUser = await ReportedUser.findOne({
      reporter_user_id,
      reported_user_id,
    });
    console.log("reported User found is ", reportedUser);
    if (!reportedUser) {
      reportedUser = new ReportedUser({
        reporter_user_id,
        reported_user_id,
      });
      await reportedUser.save();
    }
    res.status(201).send(reportedUser);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get Reported Users
router.get("/", async (req, res) => {
  try {
    const reportedUser = await ReportedUser.aggregate([
      {
        $group: {
          _id: "$reported_user_id",
          totalReports: { $sum: 1 }
        }
      },

      {
        $lookup: {
          from: User.collection.name,
          localField: "_id", //post
          foreignField: "_id", //joining with
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: Auth.collection.name,
          localField: "_id", //post
          foreignField: "user_id", //joining with
          as: "user.user",
        },
      },
      {
        $unwind: "$user.user",
      },
      {
        $project: {
          "user.user.password": 0,
          "user.user.__v": 0,
        },
      },
    ]).sort({ totalReports: -1 });




    res.status(200).send(reportedUser);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get Users reported by a specific ID
router.get("/:reporter_user_id", async (req, res) => {
  try {
    const { reporter_user_id } = req.params;
    const reportedUser = await ReportedUser.find({ reporter_user_id });
    res.status(200).send(reportedUser);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Clear Reports against a specific user
router.get("/:id/clearUserReports", async (req, res) => {
  try {
    const { id } = req.params;
    const reportedUser = await ReportedUser.deleteMany({ "reported_user_id": id });
    res.status(200).send(id);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Delete all Reports by a Specic Person
// router.get("/:id/delete", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const reportedUser = await ReportedUser.findByIdAndRemove((reported_user_id: id));
//     res.status(200).send(reportedUser);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send(err.message);
//   }
// });

module.exports = router;
