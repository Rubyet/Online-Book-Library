var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	res.clearCookie('username');
	res.clearCookie('id');
	res.redirect('/home');
});

module.exports = router;


