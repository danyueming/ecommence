/**
 * Created by Administrator on 2017/3/7 0007.
 */
var express = require('express');
var router = express.Router();
 router.get('/', function(req, res){
     req.session.user = null;
     req.session.error = null;
     res.redirect('/index');
 });
module.exports = router;