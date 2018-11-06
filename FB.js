var login = require('./chat_api/index.js');
var db_mng = require('./DB_MANAGER.js');
var CONFIG = require('./CONFIG.js');
var UTIL = require('./UTIL.js');
var cmd = require('node-cmd');
//##########################################################
//##########################################################
//##########################################################

var LoginToFacebook = function(fb_username,fb_password,func_callback){

	login({email: fb_username, password: fb_password}, function callback (err, api) {
			func_callback(err,api);
	});

};
//##########################################################
//##########################################################
//##########################################################
var GetFriends = function(fb_username,fb_password,func_callback){

	LoginToFacebook(fb_username,fb_password,function(err,api){
		if(err) {
			func_callback(err,null);
			return;
		}

			api.getFriendsList(function(err, data) {
	    	
		        if(err) {
		        	func_callback(err,null);
		        	return;
		        }

		    	func_callback(false,data);
	  		});

	});
};
//##########################################################
//##########################################################
//##########################################################
var StartMsgTaskCmd = function(sys_user_id,fb_username,fb_password,friends_list,friends_file,
	message,message_file , func_callback){


		db_mng.AddUserTask(sys_user_id,fb_username,fb_password,friends_list,friends_file,
			message,message_file,
			function(result){

			if(result.status == 'OK'){
				func_callback(false,result.data);

				var task_id = result.data._id;

				var msg_arr = [
					'java -jar' ,
					"\""+ CONFIG.PATH_NEWTON_JAR +"\"",
					CONFIG.KEY_TASK_ID,
					"\""+ task_id +"\"",
					CONFIG.KEY_DRIVER ,
					"\""+ CONFIG.PATH_CHROME_DRIVER +"\"",
					CONFIG.KEY_USERS_FILE ,
					"\""+ friends_file +"\"",
					CONFIG.KEY_FB_USER ,
					"\""+ fb_username +"\"",
					CONFIG.KEY_FB_PASS ,
					"\""+ fb_password +"\"",
					CONFIG.KEY_MSG ,
					"\""+ message_file +"\"",
					CONFIG.KEY_DRIVER_TYPE ,
					CONFIG.DEFAULT_DRIVER_TYPE ,
					CONFIG.KEY_START_POS ,
					'0' ,
					CONFIG.KEY_THREADS ,
					'2'
				];

				var msg_cmd = msg_arr.join(' ');

				console.log(msg_cmd);
				cmd.run(msg_cmd);
			}else{
				func_callback(true,null);
			}

		});

};
//##########################################################
//##########################################################
//##########################################################
var StartMsgTask = function(sys_user_id,fb_username,fb_password,friends_list,friends_file,
	message,message_file , func_callback){


		db_mng.AddUserTask(sys_user_id,fb_username,fb_password,friends_list,friends_file,
			message,message_file,
			function(result){

			if(result.status == 'OK'){
				func_callback(false,result.data);

				var task_id = result.data._id;
				var task = new Object();
				task[CONFIG.KEY_TASK_ID] = task_id;
				task[CONFIG.KEY_DRIVER] = CONFIG.PATH_CHROME_DRIVER;
				task[CONFIG.KEY_USERS_FILE] = friends_file;
				task[CONFIG.KEY_FB_USER] = fb_username;
				task[CONFIG.KEY_FB_PASS] = fb_password;
				task[CONFIG.KEY_MSG] = message_file;
				task[CONFIG.KEY_DRIVER_TYPE] = CONFIG.DEFAULT_DRIVER_TYPE;
				task[CONFIG.KEY_START_POS] = 0;
				task[CONFIG.KEY_MAX_POS] = friends_list.length;
				task[CONFIG.KEY_THREADS] = 2;

				var msg = JSON.stringify(task);

				UTIL.SendSocketMessage(CONFIG.DEFAULT_SOCKET_PORT,msg);

			}else{
				func_callback(true,null);
			}

		});

};
//##########################################################
//##########################################################
//##########################################################
var SendFbMessage = function(api,fb_id,msg,func_callback){

    api.sendMessage(msg, fb_id,function callback (err, messageInfo){

    	func_callback(err, messageInfo);

    });
    //console.log('SendFbMessage',fb_id);
};
//##########################################################
//##########################################################
//##########################################################

module.exports = {
	GetFriends: GetFriends,
	StartMsgTask: StartMsgTask
};