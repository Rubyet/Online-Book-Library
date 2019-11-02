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
}