/**
 * Created by Administrator on 2017/3/2 0002.
 */
const express = require('express');
const router = express.Router();

let User=require('../common/models/usermodel');
router.get('/', function(req, res) {
    res.render('login', {title: "用户登录"});

});

router.post('/',(req,res)=>{
    var uname=req.body.uname;
    User.findOne({'name':uname},(error,doc)=>{
        if (error){
            console.log(error);
        res.sendStatus(500);

        }else if (!doc){
            req.session.error = '用户名不存在！';
            res.sendStatus(404);
        }else {
            if(req.body.upwd!=doc.password){
                req.session.error = "密码错误!";
                res.sendStatus(404);
            }else {
                req.session.user=doc;
                res.sendStatus(200);
            }

        }

    });

});
module.exports = router;