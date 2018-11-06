var path = require('path');
var url = require('url');
var filesys = require('fs');
var mime = require('mime-types');

var CONFIG = require('./CONFIG.js');
var SERVICES = require('./SERVICES.js');
//##########################################################
//##########################################################
//##########################################################
var srv_handler = function(){

};

//##########################################################
//##########################################################
//##########################################################
srv_handler.prototype.handleRequest = function(request,response){
	var req_url = request.url;
	//console.log('handleRequest: ' + req_url);

	//Check if service called
	if( SERVICES.IsService(req_url) ){

		SERVICES.ServiceRouter(req_url,request,response);
		return;
	}
	//

	//var exe_path = process.cwd();
	var exe_path = __dirname;
	var my_path = url.parse(req_url).pathname;
	var full_path = path.join(exe_path,my_path);

	filesys.exists(full_path,function(exists){
		if(!exists){

			WriteResponse(response,
							CONFIG.RESPONSE_CODE_NOT_FOUND,
							CONFIG.RESPONSE_CONTENT_TYPE_TEXT_PLAIN,
							CONFIG.MSG_NOT_FOUND + ': ' + full_path,
							CONFIG.ENCODING_UTF8);
			return;
		}

		filesys.readFile(full_path,function(err,content){
			if(err){
				WriteResponse(response,
								CONFIG.RESPONSE_CODE_INTERNAL_SRV_ERROR,
								CONFIG.RESPONSE_CONTENT_TYPE_TEXT_PLAIN,
								err,
								CONFIG.ENCODING_UTF8);
				return;
			}

			var file_content_type = GetContentType(full_path);

			WriteResponse(response,
							CONFIG.RESPONSE_CODE_OK,
							file_content_type,
							content,
							CONFIG.ENCODING_UTF8);
		});


	});
};
//##########################################################
//##########################################################
//##########################################################
var WriteResponse = function(response,code,content_type,msg,encoding){
	response.writeHead(code,content_type);
	response.write(msg,encoding);
	response.end();
};
//##########################################################
//##########################################################
//##########################################################
var GetContentType = function(file_path){
	//Default
	var content_type_obj = {'Content-Type' : 'text/plain'}; 


	var file_content_type = mime.lookup(file_path);
	//console.log('file_content_type',file_content_type);

	if(file_content_type){
		content_type_obj = {'Content-Type' : file_content_type }; 
	}

	return content_type_obj;
};
//##########################################################
//##########################################################
//##########################################################	

module.exports = srv_handler;