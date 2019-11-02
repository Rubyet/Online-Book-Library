//DECLARATION
var express  	= require('express');
var ejs  		= require('ejs');
var path 		= require('path');
var bodyParse  	= require('body-parser');
var exSession  	= require('express-session');
var cookieParser= require('cookie-parser');
var home  		= require('./controllers/home');
var user  		= require('./controllers/user');
var book  		= require('./controllers/book');
var login  		= require('./controllers/login');
var logout  	= require('./controllers/logout');
var app 		= express();
//var upload = require('express-fileupload');

//CONGIFURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
//app.use(upload());
app.use(express.static(path.join(__dirname, '/views/css')));
app.use(express.static(path.join(__dirname, '/upload')));
app.use(express.static(path.join(__dirname, '/views/images')));

app.use(bodyParse.urlencoded({extended:false}));
app.use(exSession({secret:"my top secret value", saveUninitialized:true, resave:false}));
app.use(cookieParser());
app.use('/home', home);
app.use('/user', user);
app.use('/book', book);
app.use('/login', login);
app.use('/logout', logout);

//ROUTING
app.get('/', function(req, res){
	res.send('<h2>hello from express</h2>');
});


//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});
