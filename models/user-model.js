var db = require('./db');

module.exports={

	getById: function(id, callback){

		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function(result){

			console.log(result);
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from userdetails where name=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){
			console.log();
			if(result.length > 0 ) {
				callback(true,result[0].id);
			}else{
				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from user";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insert : function(user, callback){
		console.log("user :"+user.username + user.type);
		var sql = "INSERT INTO `userdetails` VALUES (NULL, '"+user.username+"', '"+user.address+"', '"+user.phone+"', '"+user.email+"', '"+user.password+"', '"+user.type+"', NULL, '"+user.image+"')";
		db.execute(sql,[], function(status){
			console.log(sql);
			callback(status);
		});
	},
	update : function(user, callback){
		var sql = "update user set username=?, password=? where id=?";		
			db.execute(sql, [user.username, user.password, user.id], function(status){
				callback(status);
			});
		
	},
	delete : function(user, callback){
		//var sql = "insert into user values('','"+ user.username+"', '"+user.password+"')";
		db.execute(sql, [],  function(status){
			callback(status);
		});
	}
}	


