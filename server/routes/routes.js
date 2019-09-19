const express = require('express');
const list = require('./lists')
const task = require('./tasks');
const user = require('./users');
const auth = require('./auth');
const error = require('./error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/lists', list);
  app.use('/api/tasks', task);
  app.use('/api/users', user);
  app.use('/api/auth', auth);
  app.use(error);
}