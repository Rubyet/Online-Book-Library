var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

		var sql = "SELECT * FROM bookdetails ORDER BY id DESC";
		db.getResults(sql,[], function(results){
			
			console.log("from home.js"+ results);
			res.render('home/index', {bookdetails: results});
	
		});
});





module.exports = router;


