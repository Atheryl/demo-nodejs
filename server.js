var http = require('http');
var os = require('os');
var fs = require('fs');

var handleRequest = function(request, response) {
	fs.readFile('version.txt', 'utf8', function (err, version) {
		fs.readFile('index.html', 'utf8', function (err, html) {
	    	response.writeHead(200);
	   // response.end("Hello World!");
	   // 	response.end(os.hostname() + ' ' + version);
	   		html = html.replace('NODE_NAME', os.hostname());
			html = html.replace('VERSION_NUMBER', version);
	   		response.end(html);
		});
	});
  
}
var www = http.createServer(handleRequest);
www.listen(8080);

