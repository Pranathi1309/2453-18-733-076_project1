const express=require('express');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

let server=require('./server');
let config=require('./config');
let middleware=require('./middleware');
const response=require('express');

const url='mongodb://127.0.0.1:27017';
const dbname="user_app";
let db

MongoClient.connect(url,(err,client)=>{
    if(err) return console.log(err);
    db=client.db(dbname);
    console.log(`connected database: ${url}`);
    console.log(`Database:${dbname}`);
});

app.get('/hospital', middleware.checkToken, (req,res)=>{
    console.log("getting things ready");
    const data=db.collection("hospitals").find().toArray()
    .then(result => res.json(result));
});

app.get('/ventilator', middleware.checkToken, (req,res)=>{
    console.log("getting things ready");
    const data=db.collection("vents").find().toArray()
    .then(result=>(res.json(result)));
});

app.post('/searchventbystatus', middleware.checkToken, (req,res) => {
    const status = req.query.status;
    console.log(status);
    const ventillatordetails=db.collection('vents')
    .find({"status":status}).toArray().then(result=>res.json(result));
});

app.post('/searchventbyname', middleware.checkToken, (req,res) => {
    const hname=req.query.hname;
    console.log(hname);
    const ventilatordeatils=db.collection('vents')
    .find({'name':new RegExp(name, 'i')}).toArray().then(result=>res.json(result));
});

app.post('/searchhospital', middleware.checkToken, (req,res) => {
    const name=req.query.name;
    console.log(name);
    const ventilatordeatils=db.collection('hospitals')
    .find({'name':new RegExp(name, 'i')}).toArray().then(result=>res.json(result));
});

app.post('/addvent',(req,res)=>{
    const hid=req.body.hid;
    const vid=req.body.ventid;
    const status=req.body.status;
    const hname=req.body.name;
    console.log("adding ventilator, please wait a moment");
    const item={"hid":hid, "vid":vid, "status":status, "hname":hname};
    db.collection("vents").insertOne(item, function(err, result){
        res.json("inserted successfully");
    });
});

app.put('/updateventilator', middleware.checkToken, (req,res) => {
    const vid= {ventid: req.query.vid};
    console.log(vid);
    const newvalues={$set: {status:req.query.status}};
    console.log("updating ventilator details, please wait a moment");
    db.collection("vents").updateOne(ventid, newvalues, function(err, result){
        res.json('updated one document');
        if(err) throw err;
    });
});

app.delete('/deletevent', middleware.checkToken, (req,res) => {
    const vid=req.query.vid;
    console.log(vid);
    const temp={"vid":vid};
    db.collection("vents").deleteOne(temp, function(err,obj){
        if(err) throw err;
        res.json("deleted one element");
    });
});

// app.get('/searchventilators',(req,res)=>{
//     const status=req.query.status;
//     const name=req.query.name;
//     console.log("searching ventilators, please wait a moment");
//     const data=db.collection("ventilators").find({"name":name},{"status":status}).toArray().then(result=>res.send(result));
//     res.send("no hospital found :(");
// });

app.listen(9000,(req,res)=>{
    console.log("working well");
});