require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var thirdPartyRequest = require('request');

var mongodb = require("mongodb");
var mongodbclient = mongodb.MongoClient;
var db_url = "mongodb://"+ process.env.MONGODB_USER +":"+ process.env.MONGODB_PASSWORD +"@ds013951.mlab.com:13951/fcc-challenge";

app.use(bodyParser());

app.get('/', function(req,res){
	res.end("hello world!");
});

app.get('/book/findAll', function(req,res){
	var result = [
		{
			title : "blah",
			author: "blah",
			description: "blah"
		},
		{
			title : "blah",
			author: "blah"
		}
	];
	res.status(200).json(result);
});

app.get('/book/search/:query', function(req,res){
	thirdPartyRequest.get(
		process.env.API_URL + "&q=" + req.params.query,
		{},
		function (err, response, body) {
			res.status(200).json(JSON.parse(body));
			res.end();
		}
	);
});

app.post('/book/add', function(req,res){
	var data = JSON.parse(req.body.data);
	if (!data.title || !data.description || !data.imageLinks) {
		throw Error('wrong data format');
		return;
	}

	mongodbclient.connect(db_url, function(err,db){
		if (err) throw err;
		
		var collection = db.collection("fcc-bookjump-books");
		collection.insert(
			data,
			{},
			function(err,doc) {
				if (err) {
					console.log(err);
					res.end(err);
				}
				res.status(200).json(data);
				res.end();
		    }
		);
	});
})

app.listen(process.env.PORT || 5000, function(err){
	if (err) {
		throw err;
	}
	console.log('listening to port ' + process.env.PORT || 5000);	
});

module.exports = app;