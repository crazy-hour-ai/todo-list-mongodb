const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// destructuring assignment 的寫法
const { authenticated } = require('../config/auth');

// 列出全部 Todo
router.get('/', authenticated, (req, res) => {
  return res.redirect('/');
  // res.send('列出所有 Todo');
})

// 新增一筆 Todo 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new');
  // res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  // res.send('顯示 Todo 的詳細內容')
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todos) => {
      if (err)
        return console.log(err);
      return res.render('details', { todo: todos })
    })
})

// 新增一筆  Todo
router.post('', authenticated, (req, res) => {
  // res.send('建立 Todo')
  const todo = new Todo({
    name: req.body.name,
  })
  todo.save(err => {
    // console.log(err); err return null = no error
    if (err)
      return console.log(err);
    return res.redirect('/');
  })
})




// 顯示修改 Todo 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  // res.send('修改 Todo 頁面')
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todoEdit) => {
      if (err)
        return console.log(err);
      return res.render('edit', { todo: todoEdit })
    })
})
// 修改 Todo
router.put('/:id/edit', authenticated, (req, res) => {
  // res.send('修改 Todo')
  Todo.findById(req.params.id, (err, todoEditById) => {
    if (err)
      return console.log(err);
    todoEditById.name = req.body.name;

    if (req.body.done === 'on') {
      todoEditById.done = true;
    }
    else {
      todoEditById.done = false;
    }

    todoEditById.save((err) => {
      if (err)
        return console.log(err);
      return res.redirect(`/todos/${req.params.id}`);
    })
  })

})




// 刪除 Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  // res.send('刪除 Todo')
  Todo.findById(req.params.id, (err, todoDelete) => {
    if (err)
      return console.log(err);

    todoDelete.remove((err) => {
      if (err)
        return console.log(err);
      return res.redirect('/');
    })
  })
})

module.exports = router;
