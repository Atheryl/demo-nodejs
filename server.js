var http = require('http');
var url = require('url');
var os = require('os');
var fs = require('fs');

var handleRequest = function(request, response) {
	
	
	var logStream = fs.createWriteStream('log.txt', {'flags': 'a'});
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
		logStream.write('GET' + '\t' + path + '\t' + Date.now() + '\n');
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify(apiSampleRes));
	}
	else if (path == "/path") {
		logStream.write('GET ' + '\t' + path + '\t' + Date.now() + '\n');
		response.writeHead(200);
		response.end(process.cwd());
	}
	
	fs.readFile('version.txt', 'utf8', function (err, version) {
		logStream.write('GET' + '\t' + 'Example page' + '\t' + Date.now() + '\n');
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
