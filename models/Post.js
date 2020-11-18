const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const PostSchema = new Schema({
const Post = mongoose.model(
  "posts",
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
    title: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: false,
    },
    postSkills: [
      {
        skill_id: {
          type: Schema.Types.ObjectId,
          ref: "skills",
          unique: true,
        },
      },
    ],
    // votes: [
    //   {
    //     user: {
    //       type: Schema.Types.ObjectId,
    //       ref: "users",
    //     },
    //     type: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],
    // volunteers: [
    //   {
    //     user: {
    //       type: Schema.Types.ObjectId,
    //       ref: "users",
    //     },
    //     date: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
    // comments: [
    //   {
    //     user: {
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

exports.Post = Post;
