var express = require('express');
var userModel = require('./../models/user-model');

var router = express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password
	}

	userModel.validate(user, function(status,id){
		
		if(status){
			res.cookie('username', req.body.uname);
			res.cookie('id', id);
			res.redirect('user/index');	
		}else{
			res.send('invalid username/password');
		}
	});

});

module.exports = router;


