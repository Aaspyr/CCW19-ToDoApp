const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const express = require('express');
const auth = require ('../middleware/auth')
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
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User( { name: req.body.name, email: req.body.email, password: req.body.password});
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();
  } catch(err) {
    res.status(400).send(err.message);
  }

  res.send(user);

});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  if(!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);  
});

router.delete('/:id', auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router; 
