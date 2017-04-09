/**
 * Created by Administrator on 2017/3/10 0010.
 */
var mongoose = require('mongoose');
var commodity=new mongoose.Schema({
    name:  String ,
    price:  Number ,
    imgSrc:String

});


commodity.statics = {

    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }

};



module.exports  = commodity;




