const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 25
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    _.pick(this, ["_id", "isAdmin"]),
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    email: Joi.string()
      .min(5)
      .max(25)
      .required()
      .email(),
    password: Joi.string()
    .min(5)
    .max(255)
    .required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validate: validateUser
};