var mongoose=require("mongoose");
var h_schema=mongoose.Schema({
	hid:String,
	name:String,
	location:String,
	address:String,
	phone:String
})
var hospital=mongoose.model("hospital",h_schema);
module.exports=hospital;