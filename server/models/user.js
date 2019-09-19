const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true,
    }
});

UserSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    _.pick(this, ["_id", "isAdmin"]),
    config.get("jwtPrivateKey")
  );
};

function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(20).required(),
      email: Joi.string().min(5).max(100).required().email(),
      password: Joi.string().min(8).max(100).required()
    };
  
    return Joi.validate(user, schema);
}
  
module.exports.validate = validateUser;
module.exports.User = mongoose.model("User", UserSchema);