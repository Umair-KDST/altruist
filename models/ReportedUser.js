const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportedUser = mongoose.model(
  "ReportedUsers",
  new mongoose.Schema({
    reporter_user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    reported_user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  })
);

exports.ReportedUser = ReportedUser;
