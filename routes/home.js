/**
 * Created by Administrator on 2017/3/6 0006.
 */
var express = require('express');
var router = express.Router();
var Commoditys=require('../common/models/commoditymodel');

//console.log(Commoditys);
router.get('/',(req,res)=>{

    if(req.session.user) {
        Commoditys.find({},function(error,docs){
            res.render('home', {Commoditys:docs});
        });
    }
    else{
        req.session.error = "请先登录";
        res.redirect('/login');
    }
});

module.exports=router;