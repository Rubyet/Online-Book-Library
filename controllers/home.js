var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

		var sql = "SELECT * FROM bookdetails ORDER BY id DESC";
		db.getResults(sql,[], function(results){
			
			res.render('home/index', {bookdetails: results});
	
		});
});

router.post('/',function(req, res){
	var search= req.body.search;
	var sql = "SELECT * FROM bookdetails WHERE name LIKE '%"+search+"%'";
	console.log(sql);
		db.getResults(sql,[], function(results){
			res.render('search/index', {book: results});	
		});
});



module.exports = router;

