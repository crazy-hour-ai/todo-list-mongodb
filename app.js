const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

const mongoose = require('mongoose')                    // 載入 mongoose
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })   // 設定連線到 mongoDB

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection;

const Todo = require('./models/todo');


// 連線異常
db.on('error', () => {
  console.log('mongodb error');
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected');
})

// 設定路由
// Todo 首頁
app.get('/', (req, res) => {
  // res.send('hello world');
  // res.render('index')
  Todo.find()
    .lean()
    .find((err, todos) => {
      if (err) {
        return console.log(err);
      }
      return res.render('index', { todos: todos });
    })
})

// 列出全部 Todo
app.get('/todos', (req, res) => {
  return res.redirect('/');
  // res.send('列出所有 Todo');
})

// 新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  res.send('新增 Todo 頁面')
})
// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示 Todo 的詳細內容')
})
// 新增一筆  Todo
app.post('/todos', (req, res) => {
  res.send('建立 Todo')
})
// 顯示修改 Todo 頁面
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})
// 修改 Todo
app.post('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo')
})
// 刪除 Todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`)

})