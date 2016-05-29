require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var thirdPartyRequest = require('request');

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
			console.log(body);
			res.end();
		}
	);
});

app.listen(process.env.PORT || 5000, function(err){
	if (err) {
		throw err;
	}
	console.log('listening to port ' + process.env.PORT || 5000);	
});

module.exports = app;