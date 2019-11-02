var express = require('express');
var bookModel = require('./../models/book-model');
var router = express.Router();



router.get('/', function(req, res){

		bookModel.getAll(function(results){
				var id2 = req.cookies['id'];
				res.render('book/book', {book: results , id1: id2});
	
			
		});
});

router.get('/bookdetails/:id', function(req, res){

		bookModel.getById(req.params.id, function(result){
		var id2 = req.cookies['id'];
		res.render('book/bookdetails', {book: result, id1: id2});
	});
});

router.get('/booksearch/:id', function(req, res){
		
		console.log("Sending value as id "+req.params.id);
		bookModel.getAllById(req.params.id, function(result){
		var id2 = req.cookies['id'];	
		res.render('book/bookSearch', {book: result, id1: id2});
			
		
	});
});

router.get('/:name', function(req, res){
  const file = `${__dirname}/upload/name`;
  res.download(file); 
  
});


module.exports = router;
