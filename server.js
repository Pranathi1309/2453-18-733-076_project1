var express=require("express");
var app=express();
var mongoose=require("mongoose");
var body=require("body-parser");
var hospital=require("./hospital");
var vent=require("./ventilator");
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/user_app",{useNewUrlParser:true});
app.use(body.urlencoded({extended:true}));
//--------------------------------------------------------------------------
app.listen(3000,function(req,res){
console.log("Server Started");
});
//----------------------------------------------------------------------------
app.get("/home",function(req,res){
	res.render("home");
});
//---------------------------------------------------------------------//1111111111
app.get("/hospDetails",function(req,res){
hospital.find({},function(err,me){
res.render("hospDetails",{
	me:me
})
});
});
//----------------------------------------------------------------------1111111111111
app.get("/ventDetails",function(req,res){
vent.find({},function(err,me){
res.render("ventDetails",{
	vent:me
})
});
});
//------------------------------------------------------------------222222222
app.get("/searchVent",function(req,res){
	res.render("searchVent");
})
app.post("/searchVent",function(req,res){
status=req.body.status;
hname=req.body.hname;
vent.find({$and:[{status:status},{hname:hname}]},function(err,vent){
	res.render("ventDetails",{
		vent:vent
	})
});
});
//-----------------------------------------------------------------------------3333333
app.get("/searchHosp",function(req,res){
	res.render("searchHosp");
});
app.post("/searchHosp",function(req,res){
hname=req.body.hname;
hospital.find({"name":hname},function(err,hosp){
	res.render("hospDetails",{
		me:hosp
	})
})
})
//---------------------------------------------------------------------------------444444
app.get("/updateVent",function(req,res){
res.render("updateVent");
});
app.post("/updateVent",function(req,res){
	vid=req.body.vid;
vent.findOne({"vid":vid},function(err,vent){
	if(vent.status="occupied"){
		vent.status="vacant"
	}
	if(vent.status="vacant")
	{
		vent.status="occupied";
	}
	vent.save();
	res.redirect("ventDetails")

})
});
//---------------------------------------------------------------------------------------------555555
app.get("/addVent",function(req,res){
res.render("addVent");
});
app.post("/addVent",function(req,res){
hid=req.body.hid;
vid=req.body.vid;
status=req.body.status;
hname=req.body.hname;
vent.create(new vent({"hid":hid,"vid":vid,"status":status,"hname":hname}),function(err,user){
		res.redirect("ventDetails");
	})
});
//---------------------------------------------------------------------------------6666666
app.get("/delVent",function(req,res){
	res.render("delVent");
});
app.post("/delVent",function(req,res){
	vid=req.body.vid;
	vent.findOne({"vid":vid},function(err,vent){
		vent.remove();
		vent.save();
		res.redirect("ventDetails");
	})
	

})



