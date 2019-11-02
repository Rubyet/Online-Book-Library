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

<<<<<<< HEAD
router.get('/blog/view/:id', blogHelper.viewsingleblog);

router.post('/blog/comment/:id', blogHelper.addcomment);

router.get('/blog/comment/:id', blogHelper.viewcomment);

=======
>>>>>>> d37365138c18730ab90660381d98116749395a1a
module.exports = router;