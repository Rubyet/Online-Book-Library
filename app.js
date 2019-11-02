//DECLARATION
var express  	= require('express');
var bodyParse  	= require('body-parser');
var exSession  	= require('express-session');
var cookieParser= require('cookie-parser');
var home  		= require('./controllers/home');
var user  		= require('./controllers/user');
var login  		= require('./controllers/login');
var logout  	= require('./controllers/logout');
var app 		= express();
var authentication = require('./controllers/authentication');
var blog = require('./controllers/blog');

//CONGIFURATION
app.set('view engine', 'ejs');


//MIDDLEWARE
app.use(bodyParse.urlencoded({extended:false}));
app.use(exSession({secret:"my top secret value", saveUninitialized:true, resave:false}));
app.use(cookieParser());
app.use('/home', home);
app.use('/user', user);
app.use('/login', login);
app.use('/logout', logout);
app.use(authentication);
app.use(blog);

//ROUTING
app.get('/', function(req, res){
	console.log(req.session.username);
	console.log(req.session.userId);
	res.send('<h2>hello from express</h2>');
});



//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at localhost:3000');
});
