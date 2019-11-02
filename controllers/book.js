var express = require('express');
var bookModel = require('./../models/book-model');
var router = express.Router();



router.get('/', function(req, res){

		bookModel.getAll(function(results){
			
				res.render('book/book', {book: results});
	
			
		});
});

router.get('/reg', function(req, res){
	res.render('book/reg');
});
router.post('/reg', function(req, res){

	var book = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		email: req.body.email
	};

	bookModel.insert(book, function(status){
		if(status){
			res.redirect('/book/userlist');
		}else{
			res.redirect('book/reg');
		}
	});
});

router.get('/bookdetails/:id', function(req, res){

		bookModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('book/bookdetails', {book: result});
	});
});

router.get('/booksearch/:id', function(req, res){
		
		console.log("Sending value as id "+req.params.id);
		bookModel.getAllById(req.params.id, function(result){
			
		res.render('search/index', {book: result});
			
		
	});
});

router.get('/:name', function(req, res){
  const file = `${__dirname}/upload/name`;
  res.download(file); 
  
});


module.exports = router;
