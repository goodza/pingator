#!/usr/bin/env node

const BASIC_TIMING = 10
const BASIC_WAIT_ALERT = 3601


const isDeveloping = process.env.NODE_ENV !== 'production';
const PORT = isDeveloping ? 8001 : process.env.PORT;

const fs = require('fs');
const http = require("http");
const axios = require('axios');

const server = http.createServer((req, res)=>{
	res.end("Not your buiessenes");
})

server.listen(PORT, (err) => {
	if (!err) console.log(`server is listening on ${PORT}`)
})

const pingator = async (url) =>{
		try {
			await new Promise(resolve => setTimeout(resolve,1*1000))
			const response = await axios(url);
			console.log(`${url}:${response.status}:${response.statusText}`);
//			break;
		} catch (err) {
			domains_wait_alert[url] -= 1;
			//console every 3 microcycles
			if (domains_wait_alert[url] % ((BASIC_WAIT_ALERT-1)/3) == 0) console.log(err);
		};
	if (domains_wait_alert[url] % (BASIC_WAIT_ALERT - 1) == 0) {
	const err_resp = await axios.put(msg_domain,
			    {
				'msg': `${url.split('http://')[1]} is BROKEN`,
				'order': 'None'
			    },
			    {
				headers: {
				    'Content-Type': 'application/json; charset=utf-8'
				}
			    }
			);
	};
	// Reset wait cycles for alert (1hour)
	domains_wait_alert[url] == 0 ? domains_wait_alert[url] = BASIC_WAIT_ALERT : NaN
};

const pings = []

const domains = fs.readFileSync('domains.txt', 'utf8').toString().split("\n").slice(0,-1);
const msg_domain = domains[0]
console.log(`Message domain: ${msg_domain}`)

let domains_wait_alert = {}
domains.splice(1).map(e=>{
	domains_wait_alert[e] = BASIC_WAIT_ALERT
	pings.push(setInterval(pingator,BASIC_TIMING*1000,e));
});

