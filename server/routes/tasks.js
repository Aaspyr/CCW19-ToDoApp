const Task = require('../models/task'); 
const User = require('../models/user');
const List = require('../models/list');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort('createdAt');
  res.send(tasks);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.')

  res.send(task);
});

router.get('/:userID', async (req, res) => {
  const tasks = await Task.find({ userID: req.params.userID});
  res.send(tasks);
});

router.get('/:list', async (req, res) => {
  const tasks = await Task.find({ list: req.params.list});
  res.send(tasks);
});

router.post('/', async (req, res) => {
  const list = await List.findById(req.body.list);
  if(!list) return res.status(400).send('The list with the given ID must exist to add a task.');

  const user = await User.findById(req.body.userID);
  if(!user) return res.status(400).send('The user with the given ID must exist to add a task.');

  let task = new Task({
    userID: req.body.userID,
    nameID: req.body.nameID,
    list: req.body.list,
    createdAt: req.body.createdAt,
    done: req.body.done
  });
  try {
    await task.save();
  } catch(err) {
    res.status(400).send(err.message);
  }
  res.send(task);
});

router.put('/:id', async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('The task with the given ID was not found.');

  const list = await List.findById(req.body.list);
  if(!list) return res.status(400).send('The list with the given ID must exist to add a task.');

  const user = await User.findById(req.body.userID);
  if(!user) return res.status(400).send('The user with the given ID must exist to add a task.');


  task = new Task({
    userID: req.body.userID,
    nameID: req.body.nameID,
    list: req.body.list,
    createdAt: req.body.createdAt,
    done: req.body.done
  });
  try {
    await task.save();
  } catch(err) {
    res.status(400).send(err.message);
  }
  res.send(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router; 