var express = require('express');
var router = express.Router();
var blogHelper = require('../models/blog');

router.get('/blog', function (req, res) {
    if (req.session.loggedin) {
        res.render('blog/create');
    }
    else {
        res.redirect('/auth');
    }

})

router.post('/blog', blogHelper.create);

router.get('/viewblog', blogHelper.viewblog);

router.get('/blog/delete/:id', blogHelper.deleteblog );

module.exports = router;