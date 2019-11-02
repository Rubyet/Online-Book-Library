var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

		var sql = "SELECT * FROM bookdetails ORDER BY id DESC";
		db.getResults(sql,[], function(results){
			if(req.cookies['id'])
			{
				var id2 = req.cookies['id'];
				console.log(id2);
				res.render('user/index', {bookdetails: results, id1: id2});
			}
			else
			{
				res.render('home/index', {bookdetails: results});	
			}
			
	
		});
});

router.post('/',function(req, res){
	var search= req.body.search;
	var sql = "SELECT * FROM bookdetails WHERE name LIKE '%"+search+"%'";
	console.log(sql);
		db.getResults(sql,[], function(results){
			var id2 = req.cookies['id'];
			res.render('book/bookSearch', {book: results, id1: id2});	
		});
});



module.exports = router;

