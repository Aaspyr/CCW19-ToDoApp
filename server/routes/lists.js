const {list, validate} = require('../models/list'); //będzie supi jak Olcia zrobi <3
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const list = await List.find().sort('name');
  res.send(list);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  res.send(list);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


  if (!list) return res.status(404).send('The list with the given ID was not found.');
  
  res.send(list);
});

router.delete('/:id', async (req, res) => {
  const list = await List.findByIdAndRemove(req.params.id);

  if (!list) return res.status(404).send('The list with the given ID was not found.');

  res.send(list);
});