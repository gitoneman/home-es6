var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Account = new Schema({
	time:Date,
	name:String,
	money:Number	
});

module.exports = mongoose.model("account",Account);