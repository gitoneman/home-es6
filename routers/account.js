var Account = require('../models/account');
module.exports = {
	list:function(req,res){
		Account.find()
			.exec(function(err,doc){
				res.send(doc)
			})
	},
	add:function(req,res){
		var name = req.body.name;
		var money = req.body.money;
		var time = new Date();

		name = "1234",
		money = "25";
		
		console.log(req.body)
		Account.create({time:time,name:name,money:money},function(){
			res.send("add account")
		})
	},
	del:function(req,res){

	}
}