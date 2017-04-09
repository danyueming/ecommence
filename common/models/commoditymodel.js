/**
 * Created by Administrator on 2017/3/10 0010.
 */
const mongoose=require('mongoose');
const CommoditySchema=require('../schemas/commodity');
let Commoditys=mongoose.model('Commoditys',CommoditySchema);//所以如果集合名为Admin，读取数据始终为空，改成Admins就好了

module.exports=Commoditys;