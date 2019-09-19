const express = require('express');
const list = require('./lists')
const task = require('./tasks');
const user = require('./users');
const error = require('./error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/list', list);
  app.use('/api/task', task);
  app.use('/api/users', user);
  app.use(error);
}