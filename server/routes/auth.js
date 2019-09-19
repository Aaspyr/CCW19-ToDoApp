const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const authenticateUser = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

const validate = req => {
  const schema = {
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(100)
      .required()
  };

  return Joi.validate(req, schema);
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await authenticateUser(req.body.password, user.password)
  if (!isValid) return res.status(400).send("Invalid email or password");

  return res.send(user.generateAuthToken());
});

module.exports = router;