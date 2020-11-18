const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: Number,
      min: 0,
      max: 2,
      required: true,
    },

    email: {
      type: String,
      minlength: 7,
      maxlength: 100,
      required: true,
    },

    cnic: {
      type: String,
      minlength: 15,
      maxlength: 15,
      required: true,
    },

    phone: {
      type: String,
      maxlength: 11,
      minlength: 11,
      required: true,
    },

    address: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
    },

    userType: {
      type: Number,
      required: true,
    },

    profile_picture: {
      type: String,
      required: false,
    },
    cnic_front: {
      type: String,
      required: true,
    },
    cnic_back: {
      type: String,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
      required: true,
    },

    skills: [
      {
        skill_id: {
          type: Schema.Types.ObjectId,
          ref: "skills",
          unique: true,
        },
      },
    ],
  })
);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(11).max(11).required(),
    address: Joi.string().min(5).max(100).required(),
    dob: Joi.date().required(),
    gender: Joi.number().min(0).max(2).required(),
    email: Joi.string().regex(
      /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
    cnic: Joi.string()
      .regex(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/)
      .required(),
    userType: Joi.number().min(-1).max(100).required(),
    profile_picture: Joi.string(),
    cnic_front: Joi.string(),
    cnic_back: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    _id: Joi.objectId(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
