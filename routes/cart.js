/**
 * Created by Administrator on 2017/3/7 0007.
 */

const express = require('express');
const router = express.Router();
let Carts=require('../common/models/cartmodel');
let Commoditys=require('../common/models/commoditymodel');

router.get('/',(req,res,next)=>{
    if (!req.session.user){
        req.session.error = "用户已过期，请重新登录:";
        res.redirect('/login');
    }else {

        Carts.find({"uId":req.session.user._id,"cStatus":false},(error,docs)=>{
            res.render('cart',{carts:docs});
        });
    }

});


router.post("/",(req,res)=>{

    Carts.update({"_id":req.body.cid},{$set:{cQuantity:req.body.cnum},cStatus:true},function(error,doc){
    if(doc > 0){//更新成功返回1  失败返回0
        res.sendStatus(200);
    }
        });
});


module.exports = router;