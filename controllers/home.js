var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

		var sql = "select * from bookdetails";
		db.getResults(sql, function(results){
			
			res.render('home/index', {user: results});
	
		});
});





module.exports = router;


