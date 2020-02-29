const mongoose = require('mongoose');
const Todo = require('../todo');

mongoose.connect('mongodb://127.0.0.1:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', () => {
  console.log('db error');
})

db.once('open', () => {
  console.log('db connected');

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i });
  }

  console.log('done');
})