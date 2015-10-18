var Account = require('../models/account');
var moment = require('moment');

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
		var time = moment().format("YYYY-MM-DD h:mm:ss");
		
		Account.create({time:time,name:name,money:money},function(){
			res.send({
				code: 0,
				data: {
					name: name,
					money: money,
					time: time
				}
			})
		})
	},
	del:function(req,res){
		var id = req.body.id;

		Account.findOne({_id:id},function(err,doc){		
			doc.remove(function(){
				res.send({code:0,message:"删除成功！"});
			});
			
		})
	}
}