#!/usr/bin/env node

const isDeveloping = process.env.NODE_ENV !== 'production';
const PORT = isDeveloping ? 80 : process.env.PORT;

let req = require("request");

const http = require("http");
// var express = require("express");
// var app = express();

const server = http.createServer(function (req, res) {
	res.end("Not your buiessenes");
})

server.listen(PORT, (err) => {
	if ( ! err) {
		console.log(`server is listening on ${PORT}`)
	}
})



pingator = function pingator() {

	req('http://zatelegramit.herokuapp.com/api/pingator', function (error, response, body) {
			  console.log('error:', error); // Print the error if one occurred
			  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			  console.log('body:', body); // Print the HTML for the Google homepage.
			});

};



const i_pingator =  setInterval(pingator,10*1000);

