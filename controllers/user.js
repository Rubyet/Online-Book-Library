var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();
var multer = require('multer');
var db = require('./../models/db.js');

router.get('/userlist', function(req, res){

		userModel.getAll(function(results){
			if(req.cookies['username'] != null){
				res.render('user/index', {user: results});
			}else{
				res.redirect('/blog');
			}
		});
});


router.get('/index', function(req, res){
		
		var sql = "SELECT * FROM bookdetails ORDER BY id DESC";
		db.getResults(sql,[], function(results){
			console.log(results[1].image);
			res.render('user/index', {bookdetails: results});
	
		});
});


//router.get('/adduser', function(req, res){
//	res.render('user/adduser');
//});

router.get('/reg', function(req, res){
	res.render('user/reg');
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/image/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});

var upload = multer({ storage: storage }).single('image');

router.post('/reg',function(req, res){
	var user = {
		username: req.body.username,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password,
		image : Date.now()+req.body.image,
		type: req.body.type
		
	};
	console.log(user.image);
	upload(req, res, function (err) {
        if (err) {
            console.log( "An error occurred when uploading" );
        }
    })
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/Home');
		}else{
			console.log("error in sql");
			res.redirect('user/reg');
		}
	});
});


router.get('/edit/:id', function(req, res){

	userModel.getById(req.params.id, function(results){
		res.render('user/edit', {user: results});
	});

});

router.post('/edit/:id', function(req, res){
	
	var user = {
		id: req.params.id,
		username: req.body.username,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password,
		//image : Date.now()+req.body.image,
		type: req.body.type
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect("/user/profile/"+req.params.id+"");
		}else{
			res.redirect("/user/edit/"+req.params.id+"");
		}
	});
});

router.get('/profile/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('user/profile', {user: result});
	});
});

module.exports = router;
