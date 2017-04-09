/**
 * Created by Administrator on 2017/3/9 0009.
 */
var express = require('express');
var router = express.Router();
var Cart=require('../common/models/cartmodel');

//删除购物车商品
router.get('/',(req,res,next)=>{
    next();
});

router.get("/:id", (req, res,next)=> {
    //req.params.id 获取ID号

    Cart.remove({"_id":req.params.id},function(error,doc){
        //成功返回1  失败返回0
        if(doc > 0){
            res.sendStatus(200);
         //  res.redirect('/cart');
           // res.render('cart');
        }
    });
});

module.exports = router;