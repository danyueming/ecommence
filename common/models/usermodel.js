/**
 * Created by Administrator on 2017/3/10 0010.
 */
const  mongoose=require('mongoose');
const userSchema=require('../schemas/user');
let usermodel=mongoose.model('User',userSchema);//此处的user一定要大写

module.exports=usermodel;