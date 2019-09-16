const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const getUsers = async () => {
  return await User.find()
    .select(["_id", "name", "email"]);
}

const createUser = async user => {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  return await new User(_.pick(user, ["name", "email", "password"])).save();
}

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.delete("/:id", auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id)
  if (!user) return res.status(404).send(`A user with id ${req.params.id} was not found!`);
  
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const newUser = await createUser(req.body);
  res.header("x-auth-token", newUser.generateAuthToken()).send(_.pick(newUser, ["_id", "name", "email"]));
});

module.exports = router;