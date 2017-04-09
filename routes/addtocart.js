/**
 * Created by Administrator on 2017/3/24 0024.
 */
const express = require('express');
const router = express.Router();
let Commoditys=require('../common/models/commoditymodel');
let Carts=require('../common/models/cartmodel');



router.get('/',(req,res,next)=>{
    next();
});


router.get('/:id',(req,res,next)=>{
    //req.params.id 获取商品ID号
    if(!req.session.user){
        req.session.error="用户已过期，请重新登录";
        res.redirect('/login');
    }else{
        console.log(req.params.id);
        Carts.findOne({"uId":req.session.user._id,"cId":req.params.id},(error,doc)=>{
            //商品已经存在 +1
            if(doc){
                Carts.update({"uId":req.session.user._id,"cId":req.params.id},
                    {$set:{cQuantity:doc.cQuantity+1}},(error,doc)=>{
                        //成功返回1  失败返回0
                        if(doc > 0){
                            res.redirect('/home');
                        }
                    });

                }else{

                Commoditys.findOne({"_id": req.params.id},(error,doc)=>{
                    if(doc){
                        console.log(doc.name+doc.price);
                        Carts.create({
                            uId: req.session.user._id,
                            cId: req.params.id,
                            cName: doc.name,
                            cPrice: doc.price,
                            cImgSrc: doc.imgSrc,
                            cQuantity :1,
                            cStatus:false

                        },(error,doc)=>{
                            if(doc){
                                res.redirect('/home');
                                console.log("success");
                                console.log(doc);
                            }
                        });
                    }else{
                        console.log(error);
                    }

                })

            }

        });
    }


});

module.exports=router;