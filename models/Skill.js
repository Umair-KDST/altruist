const mongoose = require("mongoose");

const Skill = mongoose.model(
  "skills",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

exports.Skill = Skill;
