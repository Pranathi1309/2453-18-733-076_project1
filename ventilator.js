var mongoose =require("mongoose");
var v_schema=mongoose.Schema({
	hid:String,
	vid:String,
	status:String,
	hname:String
})
var vent=mongoose.model("vent",v_schema);
module.exports=vent;