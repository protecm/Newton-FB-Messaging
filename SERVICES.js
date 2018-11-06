//##########################################################
//##########################################################
//##########################################################
var dispatcher = require('httpdispatcher');
var db_mng = require('./DB_MANAGER.js');
var CONFIG = require('./CONFIG.js');
var UTIL = require('./UTIL.js');
var FB = require('./FB.js');

//##########################################################
//##########################################################
//##########################################################
const ROOT = '/';
const LOGIN = '/web/Login';
const GET_FRIENDS = '/web/GetFriends';
const MSG_TASK = '/web/MsgTask';
const GET_TASKS = '/web/GetTasks';
const UPDATE_TASK = '/web/UpdateTask';
const UPDATE_TASK_PROGRESS = '/web/UpdateTaskProgress';
const UPDATE_TASKS_PACK = '/web/UpdateTasksPack';
const CANCEL_TASK = '/web/CancelTask';
const DELETE_TASK = '/web/DeleteTask';
const GET_CANCEL_STATUS_TASK = '/web/GetCancelStatusTask';

const services = [
					ROOT,
					LOGIN,
					GET_FRIENDS,
					MSG_TASK,
					GET_TASKS,
					UPDATE_TASK,
					UPDATE_TASK_PROGRESS,
					UPDATE_TASKS_PACK,
					CANCEL_TASK,
					DELETE_TASK,
					GET_CANCEL_STATUS_TASK
				];
//##########################################################
//##########################################################
//##########################################################
var IsService = function(service_name){
	//console.log('IsServiceExists',service_name);
	if( services.indexOf(service_name) != -1 ){
		return true;
	}
	return false;
};
//##########################################################
//##########################################################
//##########################################################
var ServiceRouter = function(service_name,request,response){

	if( IsService(service_name) ){
		//db_mng.Test();
		dispatcher.dispatch(request,response);
	}
};
//##########################################################
//##########################################################
//##########################################################

dispatcher.onPost(MSG_TASK, function(request,response){
	var post_data = JSON.parse(request.body);

	var sys_user_id = post_data.sys_user_id;
	var fb_username = post_data.fb_username;
	var fb_password = post_data.fb_password;
	var fb_friends_list = post_data.fb_friends_list;
	var message = post_data.message;

	//Save list of users to file
	var stamp = new Date().getTime();
	var file_name_users = __dirname + '\\files\\users_'+ sys_user_id + '_' + stamp +'.json';
	var data = JSON.stringify(fb_friends_list);
	UTIL.SaveFile(file_name_users,data);
	//END

	//Save message to a file
	//stamp = new Date().getTime();
	var file_name_msg = __dirname + '\\files\\msg_'+ sys_user_id + '_' + stamp +'.json';
	data = JSON.stringify(message);
	UTIL.SaveFile(file_name_msg,data);
	//END

	FB.StartMsgTask(sys_user_id , fb_username , fb_password , fb_friends_list, file_name_users , 
		message , file_name_msg ,
		function(error,data){

		var res = {
			status: 'UNKNOWN',
			data: null
		};

		if(error){
			console.error(error);
			res.status = 'N.OK';
			res.data = null;
		}else{
			res.status = 'OK';
			res.data = data._id;
		}

		res = JSON.stringify(res);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
					CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(res);

	} );

});
//##########################################################
//##########################################################
//##########################################################

dispatcher.onPost(GET_FRIENDS, function(request,response){
	var post_data = JSON.parse(request.body);
	var fb_username = post_data.fb_username;
	var fb_password = post_data.fb_password;

	FB.GetFriends(fb_username,fb_password,function(err,data){

		var friends_list;

		if(err){
			console.log('FB.GetFriends - ERROR',err);
			friends_list = null;
		}else{
			friends_list = data;
		}

		friends_list = JSON.stringify(friends_list);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
					CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(friends_list);
	});

});

//##########################################################
//##########################################################
//##########################################################
dispatcher.onPost(UPDATE_TASKS_PACK, function(request,response){
	var post_data = JSON.parse(request.body);
	var data = post_data.data;

	console.log('UPDATE_TASKS_PACK',data);
	var res = {
			status: 'UNKNOWN',
			data: null
	};

	for(let i=0; i< data.length ; i++){
		let task = data[i];
		let endTime = '';

		if(task.finished == true){
			endTime = new Date();
		}

		db_mng.UpdateUserTask(task.task_id , task.count , endTime , function(result){
			if(result.status != 'OK'){
				res.status = 'N.OK';
			}
		});
	}

	//Compact DB
	db_mng.CompactUserTasksDB();

	//Response
	res = JSON.stringify(res);
	response.writeHead(CONFIG.RESPONSE_CODE_OK,
					CONFIG.RESPONSE_CONTENT_TYPE_JSON);
	response.end(res);

});
//##########################################################
//##########################################################
//##########################################################
dispatcher.onPost(UPDATE_TASK, function(request,response){
	var post_data = JSON.parse(request.body);
	var task_id = post_data.task_id;

	//console.log('UPDATE_TASK',task_id);
	var res = {
			status: 'UNKNOWN',
			data: null
	};

	db_mng.IncUserTaskProgress(task_id,function(result){
		if(result.status == 'OK'){
			res.status = 'OK';
		}else{
			res.status = 'N.OK';
		}

		res = JSON.stringify(res);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
						CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(res);
	});
});
//##########################################################
//##########################################################
//##########################################################
dispatcher.onPost(UPDATE_TASK_PROGRESS, function(request,response){
	var post_data = JSON.parse(request.body);
	var task_id = post_data.task_id;
	var count = post_data.count;

	//console.log('UPDATE_TASK',task_id);
	var res = {
			status: 'UNKNOWN',
			data: null
	};

	db_mng.GetTask(task_id,function(result){

		if(result.status == 'OK'){
			var task = result.data[0];
			var endTime = '';
			var new_pos = task.curr_pos + count;

			if(new_pos == task.max_pos){
				endTime = new Date();
			}

			db_mng.UpdateUserTask(task_id,new_pos,endTime,function(result){
				if(result.status == 'OK'){
					res.status = 'OK';
				}else{
					res.status = 'N.OK';
				}

				res = JSON.stringify(res);
				response.writeHead(CONFIG.RESPONSE_CODE_OK,
								CONFIG.RESPONSE_CONTENT_TYPE_JSON);
				response.end(res);
			});

		}else{
			res = JSON.stringify(res);
			response.writeHead(CONFIG.RESPONSE_CODE_OK,
							CONFIG.RESPONSE_CONTENT_TYPE_JSON);
			response.end(res);
		}
	});

	
});
//##########################################################
//##########################################################
//##########################################################
dispatcher.onPost(CANCEL_TASK, function(request,response){
	var post_data = JSON.parse(request.body);
	var task_id = post_data.task_id;

	//console.log('CANCEL_TASK',task_id);
	var res = {
			status: 'UNKNOWN',
			data: null
	};
	
	db_mng.CancelTask(task_id,function(result){
		if(result.status == 'OK'){
			res.status = 'OK';
		}else{
			res.status = 'N.OK';
		}

		res = JSON.stringify(res);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
						CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(res);
	});

	


});
//##########################################################
//##########################################################
//##########################################################

dispatcher.onPost(DELETE_TASK, function(request,response){
	var post_data = JSON.parse(request.body);
	var task_id = post_data.task_id;

	//console.log('DELETE_TASK',task_id);
	var res = {
			status: 'UNKNOWN',
			data: null
	};
	
	db_mng.DeleteTask(task_id,function(result){
		if(result.status == 'OK'){
			res.status = 'OK';
		}else{
			res.status = 'N.OK';
		}

		res = JSON.stringify(res);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
						CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(res);
	});
});
//##########################################################
//##########################################################
//##########################################################

dispatcher.onPost(GET_TASKS, function(request,response){
	var post_data = JSON.parse(request.body);

	var sys_user_id = post_data.sys_user_id;

	db_mng.GetUserTasks(sys_user_id,function(result){

		var tasks = [];

		if(result.status == 'OK'){
			tasks = result.data;
		}

		tasks = JSON.stringify(tasks);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
					CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(tasks);
		
	});

});

//##########################################################
//##########################################################
//##########################################################

dispatcher.onPost(GET_CANCEL_STATUS_TASK, function(request,response){
	var post_data = JSON.parse(request.body);
	var task_id = post_data.task_id;

	db_mng.GetTask(task_id,function(result){

		var status = false;

		if(result.status == 'OK'){
			status = result.data[0].req_cancel;
		}

		status = JSON.stringify(status);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
						CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(status);

	});

});

//##########################################################
//##########################################################
//##########################################################

dispatcher.onPost(LOGIN, function(request,response){
	console.log('LOGIN - SERVICE');
	var post_data = JSON.parse(request.body);
	var user_name = post_data.app_username;
	var password = post_data.app_password;

	//PUT LOGIN FUNCTION....
	db_mng.GetSysUser(user_name,password,function(result){
		//console.log(result);
		var sys_user;

		if(result.status == 'OK'){
			sys_user = result.data;
			sys_user.expire_status = UTIL.GetExpireStatus(sys_user.expire_date);
		}else{
			sys_user = null;
		}

		sys_user = JSON.stringify(sys_user);
		response.writeHead(CONFIG.RESPONSE_CODE_OK,
					CONFIG.RESPONSE_CONTENT_TYPE_JSON);
		response.end(sys_user);

	});


});
//##########################################################
//##########################################################
//##########################################################
dispatcher.onGet(ROOT, function(request,response){

	response.writeHead(CONFIG.RESPONSE_CODE_NOT_FOUND,
		CONFIG.RESPONSE_CONTENT_TYPE_TEXT_PLAIN);
	response.end(CONFIG.MSG_NOT_FOUND);
});
//##########################################################
//##########################################################
//##########################################################



module.exports = {
	IsService: IsService,
	ServiceRouter: ServiceRouter
};