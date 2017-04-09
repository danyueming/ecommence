/**
 * Created by Administrator on 2017/3/1 0001.
 */
var mongoose = require('mongoose');
var user=new mongoose.Schema({
    name:  String,
    password:  String,
    createAt:{type:Date}
});

user.pre('save',function(next){
    if(this.isNew){
        this.createAt = Date.now();
    }
    next();
});


user.statics = {
    fetch:function(cb){
        return this.find({})
            .sort('createAt')
            .exec(cb);
    },

    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }

};

module.exports  = user;








