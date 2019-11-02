var express = require('express');
var userModel = require('./../models/book-model');
var router = express.Router();



router.get('/userlist', function(req, res){

		userModel.getAll(function(results){
			if(req.cookies['username'] != null){
				res.render('user/index', {user: results});
			}else{
				res.redirect('/blog');
			}
		});
});


//router.get('/adduser', function(req, res){
//	res.render('user/adduser');
//});

router.get('/reg', function(req, res){
	res.render('user/reg');
});
router.post('/reg', function(req, res){

	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		email: req.body.email
	};

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('user/reg');
		}
	});
});

router.get('/edit/:id', function(req, res){

	userModel.getById(req.params.id, function(results){
		res.render('user/edit', {user: results[0]});
	});

});

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		id: req.params.id
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect('/user/userlist');
		}else{
			res.redirect('/user/adduser');
		}
	});
});

router.get('/details/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('user/details', {user: result});
	});
});

module.exports = router;
