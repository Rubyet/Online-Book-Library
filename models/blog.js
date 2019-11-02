var db = require('./connection');

exports.create = function(req,res){
    if(req.session.loggedin)
    {
    db.query(`INSERT INTO blog(userId, title, details) VALUES (${req.session.userId},'${req.body.title}','${req.body.details}')`,function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0]);
      })

      res.redirect('/blog');
    }
    else{
        res.redirect('/auth');
    }
}

exports.viewblog = function(req,res){
    if(req.session.loggedin)
    {
        db.query(`SELECT * FROM blog`,function (error, results, fields) {
            if (error) throw error;
            res.render('blog/viewblog',{blogs : results});
          })

    }
    else{
        res.redirect('/auth');
    }
}

exports.deleteblog = function(req,res){
    if(req.session.loggedin)
    {
        db.query(`DELETE FROM blog WHERE id=${req.params.id}`,function (error, results, fields) {
            if (error) throw error;
            res.redirect('/viewblog');
          })

    }
    else{
        res.redirect('/auth');
    }
<<<<<<< HEAD


}

exports.viewsingleblog = function(req,res){
    if(req.session.loggedin)
    {
       var comments = [];
        db.query(`SELECT * FROM comment where blogId = ${req.params.id}`,function (error, results, fields) {
            if (error) throw error;
           comments = results;
          })
        db.query(`SELECT * FROM blog WHERE id=${req.params.id}`,function (error, results, fields) {
            if (error) throw error;
            res.render('blog/viewsingleblog', {blogs: results,comments : comments});
          })

    }
    else{
        res.redirect('/auth');
    }
}

exports.addcomment = function(req,res){
    if(req.session.loggedin)
    {
        db.query(`INSERT INTO comment(userId, blogId,details, username) VALUES (${req.session.userId},${req.params.id},'${req.body.details}','${req.session.username}')`,function (error, results, fields) {
            if (error) throw error;
         res.redirect(`/blog/view/${req.params.id}`);
          })

    }
    else{
        res.redirect('/auth');
    }
}

exports.viewcomment = function(req,res){
    if(req.session.loggedin)
    {
        

    }
    else{
        res.redirect('/auth');
    }
=======
>>>>>>> d37365138c18730ab90660381d98116749395a1a
}