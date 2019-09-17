const List = require('../models/list'); 
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const lists = await List.find().sort('createdAt');
  res.send(lists);
});

router.get('/:id', async (req, res) => {
  const list = await List.findById(req.params.id);
  if (!list) return res.status(404).send('The list with the given ID was not found.');
  
  res.send(list);
});

router.get('/:userID', async (req, res) => {
  const lists = await List.find({ userID: req.params.userID});
  res.send(lists);
})

router.post('/', async (req, res) => {
  
  const user = await User.findById(req.body.userID);
  if(!user) return res.status(400).send('The user must exist in order to add a list');

  const list = new List({
    userID: req.body.userID, 
    name: req.body.name,
    createdAt: req.body.createdAt,
    color: req.body.color,
    tasks: req.body.tasks
  });
  try {
    await list.save();
  } catch(err) {
    res.status(400).send(err.message);
  }

  res.send(list);
});

router.put('/:id', async (req, res) => {
  let list = await List.findById(req.params.id);
  if (!list) return res.status(404).send('The list with the given ID was not found.');

  const user = await User.findById(req.body.userID);
  if(!user) return res.status(400).send('The user must exist in order to add a list');

  list = new List({
    userID: req.body.userID, 
    name: req.body.name,
    createdAt: req.body.createdAt,
    color: req.body.color,
    tasks: req.body.tasks
  });
  try {
    await list.save();
  } catch(err) {
    res.status(400).send(err.message);
  }
  
  res.send(list);
});

router.delete('/:id', async (req, res) => {
  const list = await List.findByIdAndRemove(req.params.id);

  if (!list) return res.status(404).send('The list with the given ID was not found.');

  res.send(list);
});

module.exports = router; 