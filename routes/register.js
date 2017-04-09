/**
 * Created by Administrator on 2017/3/1 0001.
 *
 */

const express = require('express');
const router = express.Router();
let User=require('../common/models/usermodel');

router.get('/', function(req, res) {
    res.render('register', {title: "用户注册"});
});

router.post('/', function(req, res){
        uname = req.body.uname;

    if (req.body.password == req.body.valid) {
          User.findOne({'name': uname}, function (error, doc) {
              if (error) {
                  res.sendStatus(500);
                  req.session.error = '网络异常错误！';
                  console.log(error);
              } else if (doc){
                  req.session.error = '用户名已存在！';
                  res.sendStatus(500);
              } else {
                  User.create({
                      name: uname,
                      password: req.body.upwd
                  }, function (error, doc) {
                      if (error) {
                          res.send(500);
                          console.log(error);
                      } else {
                          req.session.error = '用户名创建成功！';
                          res.sendStatus(200);
                      }
                  });
              }
          })
    }else{
        req.session.error = '请输入相同密码';
        res.redirect('register');
        }


    });


module.exports = router;
