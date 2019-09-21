const {List, validate, validateListUpdate} = require('../models/list'); 
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const lists = await List.find()
    .populate('userId', 'name _id')
    .sort('createdAt');
  res.send(lists);
});

router.get('/:id', async (req, res) => {
  const list = await List.find()
    .or([{_id: req.params.id}, {userId: req.params.id}])
    .populate('userId', 'name _id');
  if (list.length === 0) return res.status(404).send('The list with the given ID was not found.');
  
  res.send(list);
});

router.post('/', async (req, res) => {
  const user = await User.findById(req.body.userId);
  if(!user) return res.status(400).send('The user with the given ID must exist to add a task.');

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const list = new List({
    userId: req.body.userId, 
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
  const user = await User.findById(req.body.userId);
  if(!user) return res.status(400).send('The user with the given ID must exist to add a task.');

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const list = await List.findByIdAndUpdate(req.params.id, {
    userId: req.body.userId, 
    name: req.body.name,
    createdAt: req.body.createdAt,
    color: req.body.color,
    tasks: req.body.tasks,
  });
  
  if (!list) return res.status(404).send('The list with the given ID was not found.');
  
  res.send(list);
});

router.delete('/:id', async (req, res) => {
  const list = await List.findByIdAndRemove(req.params.id);

  if (!list) return res.status(404).send('The list with the given ID was not found.');

  res.send(list);
});

module.exports = router; 
