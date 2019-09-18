const {Task, validate} = require('../models/task'); 
const {User} = require('../models/user');
const {List} = require('../models/list');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find().populate('list', '_id name').populate('userId', 'name _id').sort('createdAt');
  res.send(tasks);
});

router.get('/:id', async (req, res) => {
  try{
  const task = await Task.find()
    .or([{_id: req.params.id}, {userId: req.params.id}, {list: req.params.id}])
    .populate('list', '_id name')
    .populate('userId', 'name _id');
    res.send(task);
  }catch(err){
    res.status(404).send("Task not found.");
  }
  
});


router.post('/', async (req, res) => {
  const list = await List.findById(req.body.list);
  if(!list) return res.status(400).send('The list with the given ID must exist to add a task.');

  const user = await User.findById(req.body.userId);
  if(!user) return res.status(400).send('The user with the given ID must exist to add a task.');

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({
    userId: req.body.userId,
    name: req.body.name,
    list: req.body.list,
    createdAt: req.body.createdAt,
    deadline: req.body.deadline,
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

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const list = await List.findById(req.body.list);
  if(!list) return res.status(400).send('The list with the given ID must exist to add a task.');

  const user = await User.findById(req.body.userId);
  if(!user) return res.status(400).send('The user with the given ID must exist to add a task.');



  task = await Task.findByIdAndUpdate(req.params.id, {
    userId: req.body.userId,
    name: req.body.name,
    list: req.body.list,
    createdAt: req.body.createdAt,
    deadline: req.body.deadline,
    done: req.body.done
  });
  
  if(!task) return res.status(404).send("Task with the given ID was not found.");

  res.send(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router; 
