const express = require('express');
const list = require('list')
const task = require('task');
const user = require('user');
const error = require('error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/list', list);
  app.use('/api/task', task);
  app.use('/api/users', user);
  app.use(error);
}