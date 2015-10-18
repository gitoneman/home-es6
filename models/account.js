var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Account = new Schema({
	time:String,
	name:String,
	money:Number	
});

module.exports = mongoose.model("account",Account);