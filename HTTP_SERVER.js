//##########################################################
//##########################################################
//##########################################################
var cmd = require('node-cmd');
var http = require('http');
var CONFIG = require('./CONFIG.js');
var handler = require('./HANDLE_SERVER.js');
//##########################################################
//##########################################################
//##########################################################

//Create server handler
var srv_handler = new handler();
//Create a server
var server = http.createServer(srv_handler.handleRequest);

//Start Server
server.listen(CONFIG.DEFAULT_HTTP_PORT , function(){
	//Callback triggered when server is successfully listening.
	console.log("Server listening on: http://localhost:%s",CONFIG.DEFAULT_HTTP_PORT);
	console.log('Home Directory:' + __dirname);
});
//##########################################################
//##########################################################
//##########################################################

//Start Newton Messaging Driver
var msg_arr = [
	'java -jar',
	"\""+ CONFIG.PATH_NEWTON_JAR +"\""
];

var msg_cmd = msg_arr.join(' ');
console.log(msg_cmd);
cmd.run(msg_cmd);