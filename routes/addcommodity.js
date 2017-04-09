/**
 * Created by Administrator on 2017/3/9 0009.
 */
var express = require('express');
var router = express.Router();
var Commoditys=require('../common/models/commoditymodel');
var Carts=require('../common/models/cartmodel');

router.get('/', (req, res) =>{
    res.render('addcommodity');

});

router.post('/',(req,res)=>{

    Commoditys.create(
        {
            name:req.body.name,
            price:req.body.price,
            imgSrc:req.body.imgSrc
        },(error,doc)=>{
            if (doc) {
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        })
});
module.exports = router;