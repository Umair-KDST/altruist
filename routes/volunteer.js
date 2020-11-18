const express = require("express");
const router = express.Router();
const { Volunteer } = require("../models/Volunteer");
const mongoose = require("mongoose");
// const { Post } = require("../models/Post");
// const { User } = require("../models/User");
const { Auth } = require("../models/Auth");

// Create Volunteer
router.post("/", async (req, res) => {
  const { user_id, post_id } = req.body;
  try {
    const volunteer = new Volunteer({
      user_id,
      post_id,
    });
    await volunteer.save();
    res.status(201).send(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get Volunteers
router.get("/", async (req, res) => {
  try {
    const volunteer = await Volunteer.find();
    res.status(200).send(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Get Volunteer of specific ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.find({ user_id: id });
    res.status(200).send(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Delete Volunteer of specific post
router.get("/post/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.deleteMany({ post_id: id });
    res.status(200).send(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

// Delete Volunteer
router.get("/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findByIdAndRemove(id);
    res.status(200).send(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

//Get Volunteers of specific post
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     // const volunteer = await Volunteer.find({ post_id: id });

//     const volunteer = await Volunteer.aggregate([
//       { $match: { post_id: mongoose.Types.ObjectId(id) } },

//       {
//         $lookup: {
//           from: Auth.collection.name,
//           localField: "post_id", //post
//           foreignField: "user_id", //joining with
//           as: "user",
//         },
//       },
//       {
//         $project: {
//           "user._id": 0,
//           "user.flag": 0,
//           "user.password": 0,
//           "user.user_id": 0,
//           "user.__v": 0,
//         },
//       },
//     ]);

//     res.status(200).send(volunteer);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//Reply on Volunteer
// router.post("/:id/reply", async (req, res) => {
//   const { id } = req.params;
//   const { user_id, text } = req.body;
//   try {
//     const volunteer = await Volunteer.findByIdAndUpdate(
//       id,
//       {
//         $push: { replies: { user_id: user_id, text: text } },
//       },
//       { new: true }
//     );
//     // console.log(volunteer);
//     return res.status(201).send(volunteer);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send("Server Error");
//   }
// });

//Create Post
// router.post("/", async (req, res) => {
//   const { user_id, text, title, lat, long } = req.body;
//   try {
//     const post = new Post({ user_id, text, title, lat, long });
//     await post.save();
//     res.status(201).send(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send(err.message);
//   }
// });

// //Get Posts
// router.get("/", async (req, res) => {
//   try {
//     // const post = await Post.find().sort({ date: -1 });
//     const post = await Post.aggregate([
//       // { $match: { _id: userId } },
//       // { $unwind: { path: '$posts' } },
//       {
//         $lookup: {
//           from: Auth.collection.name,
//           localField: "user_id", //post
//           foreignField: "user_id", //joining with
//           as: "user",
//         },
//       },
//       {
//         $project: {
//           "user._id": 0,
//           "user.flag": 0,
//           "user.password": 0,
//           "user.user_id": 0,
//           "user.__v": 0,
//         },
//       },
//       // {
//       //   $project: {
//       //     username: {
//       //        $filter: {
//       //           input: "$username",
//       //           as: "un",
//       //           cond: { $gte: [ "$$item.price", 100 ] }
//       //        }
//       //     }
//       //  }
//       // }
//     ]).sort({ date: -1 });

//     // let list=[]  "match": { "user_id": "_id" }   mongoose.Types.ObjectId.fromString
//     // .populate({ path: "user_id", match: { "_id": "user_id" }, model: "users", select: "email" })
//     res.status(200).send(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send(err.message);
//   }
// });

// //Get Single Posts
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const post = await Post.findById(id);
//     res.status(200).send(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// //Delete Posts
// router.get("/:id/delete", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const post = await Post.findByIdAndRemove(id);
//     res.status(200).send(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // Comment on Post
// router.post("/:id/comment", async (req, res) => {
//   const { id } = req.params;
//   const { user_id, comment } = req.body;
//   try {
//     let post = await Post.findByIdAndUpdate(
//       id,
//       {
//         $push: { comments: { user: user_id, text: comment } },
//       },
//       { new: true }
//     );

//     // post = await Post.findById(id);

//     return res.status(201).send(post);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send("Server Error");
//   }
// });

// //Volunteer on Post
// router.post("/:id/volunteer", async (req, res) => {
//   const { id } = req.params;
//   const { user_id } = req.body;
//   try {
//     const post = await Post.findByIdAndUpdate(
//       id,
//       {
//         $push: { volunteers: { user: user_id } },
//       },
//       { new: true }
//     );
//     console.log(post);
//     return res.status(201).send(post);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send("Server Error");
//   }
// });

// //Vote a Post
// router.post("/:id/vote", async (req, res) => {
//   const { id } = req.params;
//   const { user_id, vote_type } = req.body;
//   try {
//     const post = await Post.findByIdAndUpdate(id, {
//       $push: { votes: { user: user_id, type: vote_type } },
//     });
//     res.status(201).send(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route   GET api/posts
// @desc    Get All Posts
// @access  Private
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET api/posts/:id
// // @desc    Get Post By ID
// // @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: "Post Not Found" });
//     }

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Post Not Found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// // @route   DELETE api/posts/:id
// // @desc    Delete a post
// // @access  Private
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: "Post Not Found" });
//     }

//     //Check User
//     if (post.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "User Not Authorized" });
//     }

//     await post.remove();

//     res.json({ msg: "Post Removed" });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Post Not Found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// // @route   PUT api/posts/like/:id
// // @desc    Like a post
// // @access  Private
// router.put("/like/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     //Check If The Post Has Already Been Liked
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id).length >
//       0
//     ) {
//       return res.status(400).json({ msg: "Post Already Liked" });
//     }

//     post.likes.unshift({ user: req.user.id });

//     await post.save();

//     res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   PUT api/posts/unlike/:id
// // @desc    Unlike a post
// // @access  Private
// router.put("/unlike/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     //Check If The Post Has Already Been Liked
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id)
//         .length === 0
//     ) {
//       return res.status(400).json({ msg: "Post Has Not Yet Been Liked" });
//     }

//     //Get Remove Index
//     const removeIndex = post.likes
//       .map((like) => like.user.toString())
//       .indexOf(req.user.id);

//     post.likes.splice(removeIndex, 1);

//     await post.save();

//     res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   POST api/posts/comment/:id
// // @desc    Comment On A Post
// // @access  Private
// router.post(
//   "/comment/:id",
//   [auth, [check("text", "Text Is Required").not().isEmpty()]],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select("-password");
//       const post = await Post.findById(req.params.id);

//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id,
//       };

//       post.comments.unshift(newComment);

//       await post.save();

//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// // @route   DELETE api/posts/comment/:id/:comment_id
// // @desc    Delete Comment
// // @access  Private
// router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     //Pull Out Comment
//     const comment = post.comments.find(
//       (comment) => comment.id === req.params.comment_id
//     );

//     //Make Sure Comment Exists
//     if (!comment) {
//       return res.status(404).json({ msg: "Comment Does Not Exist" });
//     }

//     //Check User
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "User Not Authorized" });
//     }

//     //Get Remove Index
//     const removeIndex = post.comments
//       .map((comment) => comment.user.toString())
//       .indexOf(req.user.id);

//     post.comments.splice(removeIndex, 1);

//     await post.save();

//     res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
