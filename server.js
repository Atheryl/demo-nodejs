var http = require('http');
var url = require('url');
var os = require('os');
var fs = require('fs');

var handleRequest = function(request, response) {
	
	var path = url.parse(request.url).pathname;
	var apiSampleRes = [
		{
		    name: "name",
		    year: "year",
		    region: "ukraine"
		},
		{
		    name: "name",
		    year: "year",
		    region: "ukraine"
		}
	];
	if (path == "/apiSample") {
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify(apiSampleRes));
	}
	
	fs.readFile('version.txt', 'utf8', function (err, version) {
		fs.readFile('index.html', 'utf8', function (err, html) {
	    	response.writeHead(200);
	   		html = html.replace('NODE_NAME', os.hostname());
			html = html.replace('VERSION_NUMBER', version);
	   		response.end(html);
		});
	});
}

var www = http.createServer(handleRequest);
www.listen(8080);
