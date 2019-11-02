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
