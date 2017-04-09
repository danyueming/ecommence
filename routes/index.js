
module.exports=function(app){
    app.get('/',(req,res)=>{
        res.redirect('/login');
    });
    app.use('/register', require('./register'));
    app.use('/home',require('./home'));
    app.use('/addcommodity',require('./addcommodity'));
    app.use('/cart',require('./cart'));
    app.use('/addtocart/',require('./addtocart'));
    app.use('/delete/',require('./delete'));
    app.use('/logout',require('./logout'));
    app.use('/login',require('./login'));

};





