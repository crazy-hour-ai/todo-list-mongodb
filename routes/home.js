
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// 設定路由
// Todo 首頁
router.get('/', (req, res) => {
  // res.send('hello world');
  // res.render('index')
  Todo.find()
    .sort({ name: 'asc' })
    .lean()
    .find((err, todos) => {
      if (err) {
        return console.log(err);
      }
      return res.render('index', { todos: todos });
    })
})

module.exports = router;
