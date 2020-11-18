const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportedPost = mongoose.model(
  "ReportedPosts",
  new mongoose.Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  })
);

exports.ReportedPost = ReportedPost;
