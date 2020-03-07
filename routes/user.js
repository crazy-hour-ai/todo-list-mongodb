const express = require('express');

const router = express.Router();

const User = require('../models/user');

const passport = require('passport');

//login page
router.get('/login', (req, res) => {
  res.render('login');
})

//login check
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { // 使用 passport 認證
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/users/login' // 失敗會留在登入頁面
  })(req, res, next)
})

//register page
router.get('/register', (req, res) => {
  res.render('register');
})

//register check
router.post('/register', (req, res) => {

  const { name, email, password, password2 } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        console.log('User already exits')
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      }
      else {
        const newUser = new User({ // 如果 email 不存在就直接新增
          name,
          email,
          password
        })
        newUser
          .save()
          .then(user => {
            res.redirect('/') // 新增完成導回首頁
          })
          .catch(err => console.log(err))
      }
    })
  // res.send('register');
})

//logout
router.get('/logout', (req, res) => {
  res.send('logout');
})

module.exports = router;
