const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// 引用 method-override
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
// 設定 method-override
app.use(methodOverride('_method'));

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


app.use('/', require('./routes/home'));
app.use('/todos', require('./routes/todo'));
app.use('/users', require('./routes/user'));

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`)
})