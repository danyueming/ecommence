var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var mongoose=require('mongoose');
var config = require('config-lite');// 读取配置文件
var session=require('express-session');
var MongoStore = require('connect-mongo')(session);// 将 session 存储于 mongodb，结合 express-session 使用
var multer=require('multer');
var app = express();

mongoose.Promise = global.Promise;

global.db  = mongoose.connect('mongodb://localhost/xiaodianshang'); //创建一个数据库连接
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine( '.html', require( 'ejs' ).__express );


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(multer());

app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb,// mongodb 地址
    collection: 'sessions'
  })
}));
routes(app);

app.use(function(req,res,next){
  res.locals.user=req.session.user;//保存用户信息
  var err=req.session.error;//保存结构响应信息
  var msg = req.session.success;
  res.locals.message = '';//保存html标签
  if (err) res.locals.message='<div class="alert alert-danger" ' +
  'style="margin-bottom: 20px ;color:red;" >'+err+'</div>';
  if (msg) res.locals.message = '<p >' + msg + '</p>';
  next();
});


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });


}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
