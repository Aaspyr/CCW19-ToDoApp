const express = require('express');
const list = require('../models/list')
const task = require('../models/task');
const user = require('../models/user');
const error = require('../models/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/list', list);
  app.use('/api/task', task);
  app.use('/api/users', user);
  app.use(error);
}