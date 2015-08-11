var express = require('express'),
	http = require('http');
var path = require('path');
var app = express();
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/qlbh');
//app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

app.set('port',process.env.PORT||3000);
app.set('view engine','jade');
app.use('views',express.static(__dirname +'/views'));
app.get('/index',function(req,res,next){
	var Fiber = require('fibers');
	Fiber(function(){
		var Server = require("mongo-sync").Server;
		var server = new Server('127.0.0.1');
		var result = server.db("qlbh").getCollection("sanpham").find().toArray();
		server.close();
		res.render('index',{ yt: result });
		//res.render('index');
	}).run();
});
app.get('/login',function(req,res){
	res.render('login');
});
app.get('/admin/sanpham',function(req,res){
	var Fiber = require('fibers');
	Fiber(function(){
		var Server = require("mongo-sync").Server;
		var server = new Server('127.0.0.1');
		var result = server.db("qlbh").getCollection("sanpham").find().toArray();
		server.close();
		res.render('qlsanpham',{ yt: result });
	}).run();
});
app.get('/admin/user',function(req,res){
	var Fiber = require('fibers');
	Fiber(function(){
		var Server = require("mongo-sync").Server;
		var server = new Server('127.0.0.1');
		var result = server.db("qlbh").getCollection("user").find().toArray();
		server.close();
		res.render('qluser',{ us: result });
	}).run();
});
http.createServer(app).listen(app.get('port'),function(){
	console.log('Start successfully');
});