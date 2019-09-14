const bcrypt = require('bcrypt');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post('/', async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  try {
    user = new User( { name: req.body.name, email: req.body.email, password: req.body.password});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  } catch(err) {
    res.status(400).send(err.message);
  }

  res.send(user);

});

router.put('/:id', async (req, res) => {
  const user = User.findById(req.params.id);

  if(!user) return res.status(404).send('The user with the given ID was not found.');

  try {
    user.name = req.body.name;
    user.email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
  } catch(err) {
    res.status(400).send(err.message)
  }

  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router; 
