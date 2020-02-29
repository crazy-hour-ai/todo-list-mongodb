const express = require('express');
const app = express();

const PORT = 3000;

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


app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`)

})