const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model(
  "comments",
  new mongoose.Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "comments",
      required: false,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now,
      required: false,
    },

    // replies: [
    //   {
    //     user_id: {
    //       type: Schema.Types.ObjectId,
    //       ref: "users",
    //     },
    //     text: {
    //       type: String,
    //       required: true,
    //     },

    //     date: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
  })
);

exports.Comment = Comment;
