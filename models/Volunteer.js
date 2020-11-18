const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Volunteer = mongoose.model(
  "volunteers",
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
    date: {
      type: Date,
      default: Date.now,
      required: false,
    },
  })
);

exports.Volunteer = Volunteer;
