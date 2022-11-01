#!/usr/bin/env node

const isDeveloping = process.env.NODE_ENV !== 'production';
const PORT = isDeveloping ? 8001 : process.env.PORT;

const fs = require('fs');

const http = require("http");

const axios = require('axios');

const {domainToASCII} = require('url');

const server = http.createServer(function (req, res) {
	res.end("Not your buiessenes");
})

server.listen(PORT, (err) => {
	if ( ! err) {
		console.log(`server is listening on ${PORT}`)
	}
})

let pingator = async function pingator(url) {
	const response = await axios(url);
//	  let json = await response.json();
	console.log(`${response.status}:${response.statusText}`);
};

const pings = []

try {
			const domains = fs.readFileSync('domains.txt', 'utf8').toString().split("\n").slice(0,-1);
			for (i in domains){
				console.log(domains[i])
				pings.push(setInterval(pingator,1*1000,domains[i]));
			}
} 
catch (err) {console.error(err)}
	



