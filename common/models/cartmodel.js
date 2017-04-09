/**
 * Created by Administrator on 2017/3/10 0010.
 */

const mongoose=require('mongoose');
const cartSchema=require('../schemas/cart');
let cartmodel=mongoose.model('Carts',cartSchema);

module.exports=cartmodel;
