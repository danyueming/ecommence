/**
 * Created by Administrator on 2017/3/10 0010.
 */
var mongoose = require('mongoose');
var cart=new mongoose.Schema({
    uId:  String,//用户的id
    cId:String ,//商品的id
    cName:  String,//商品的名字
    cPrice:  Number ,//商品的价格
    cImgSrc: String  ,//商品的图片路径
    cQuantity:  Number ,//商品的个数
    cStatus :   Boolean//商品的结算状态

});

module.exports  = cart;


