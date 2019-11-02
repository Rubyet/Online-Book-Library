var db = require('./db');

module.exports={

	getById: function(id, callback){

		var sql = "select * from bookdetails where id=?";
		db.getResults(sql, [id], function(result){

			console.log(result);
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	getAllById: function(id, callback){

		var sql = "select * from bookdetails where genre=?";
		db.getResults(sql, [id], function(result){

				callback(result);
		});
	},

	getAll : function(callback){
		var sql = "select * from bookdetails";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	}
}	


