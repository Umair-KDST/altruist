const express = require("express");
const router = express.Router();
const { ReportedPost } = require("../models/ReportedPost");
const mongoose = require("mongoose");
const { Auth } = require("../models/Auth");
const { Post } = require("../models/Post");


// Report a Post
router.post("/", async (req, res) => {
  const { user_id, post_id } = req.body;
  try {
    let reportedPost = await ReportedPost.findOne({ user_id: user_id, post_id: post_id })
    console.log("reportedPost found is ", reportedPost)
    if (!reportedPost) {
      reportedPost = new ReportedPost({
        user_id,
        post_id,
      });
      await reportedPost.save();
      console.log("reportedPost created is ", reportedPost)

    }
    res.status(201).send(reportedPost);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get Reported Posts
router.get("/", async (req, res) => {
  try {

    // const reportedPost = await ReportedPost.find({ "post_id": mongoose.Types.ObjectId(id) });
    const reportedPost = await ReportedPost.aggregate([
      {
        $group: {
          _id: "$post_id",
          totalReports: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: Post.collection.name,
          localField: "_id", //post
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
        $project: {


          "post.user.password": 0,

          "post.user.__v": 0,

        },
      },

    ]).sort({ totalReports: -1 });

    res.status(200).send(reportedPost);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get Posts reported by a specific ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reportedPost = await ReportedPost.find({ user_id: id });
    res.status(200).send(reportedPost);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Clear Reports of specific post
router.get("/:id/clearPostReports", async (req, res) => {
  try {
    const { id } = req.params;

    const reportedPost = await ReportedPost.deleteMany({ "post_id": id });
    console.log('reportedPost ', reportedPost)
    res.status(200).send(id);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Delete reported posts
router.get("/:id/deleteReportedPost", async (req, res) => {
  try {
    const { id } = req.params;

    const reportedPost = await Post.findByIdAndDelete(id);
    // console.log('reportedPost ', reportedPost)
    res.status(200).send(reportedPost);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Delete all Reports by a Specic Person
// router.get("/:id/delete", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const reportedPost = await ReportedPost.findByIdAndRemove(id);
//     res.status(200).send(reportedPost);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send(err.message);
//   }
// });

module.exports = router;
