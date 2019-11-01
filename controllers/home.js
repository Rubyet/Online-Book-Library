var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

		//var sql = "select * from user";
		//db.getResults(sql, function(results){
		//if(req.cookies['username'] != null){
			res.render('home/index', {user: results});
		//}else{
			//	res.redirect('/login');
			//}	
		//});
});





module.exports = router;


