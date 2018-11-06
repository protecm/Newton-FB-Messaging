var CONFIG = require('./CONFIG.js');
var Datastore = require('nedb');


var db = {};
db.sys_users = new Datastore({ filename: CONFIG.DB_SYS_USERS_FILE_NAME , autoload: true });
db.sys_users_tasks = new Datastore({ filename: CONFIG.DB_SYS_USERS_TASKS_FILE_NAME , autoload: true });
db.fb_users = new Datastore({ filename: CONFIG.DB_FB_USERS_FILE_NAME , autoload: true });

//db.sys_users.persistence.setAutocompactionInterval(30);
//db.sys_users_tasks.persistence.setAutocompactionInterval(10);

//##########################################################
//##########################################################
//##########################################################
var Test = function(){
	console.log('DB_MANAGER - Test');
	//AddSysUser('protechm','p1r2o3t4',new Date("2016-10-30"));
	//DeleteSysUser('17ZKKTXqPorKKzkN');
	
	/*GetSysUser('protechm','p1r2o3t4',function(res){
		console.log(res);
	});*/
};

//##########################################################
//##########################################################
//##########################################################
var AddSysUser = function(username,password,expire_date){

	var doc = {
		username: username,
		password: password,
		expire_date: expire_date
	};

	db.sys_users.insert(doc , function(err,NewDoc){
		if(err){
			console.log(err);
		}

		if(NewDoc){
			console.log(NewDoc);
		}
	});
};
//##########################################################
//##########################################################
//##########################################################
var GetSysUser = function(username,password,func_callback){
	console.log('GetSysUser');
	console.log('sys_users PATH: ' + CONFIG.DB_SYS_USERS_FILE_NAME);
	var doc = {
		username: username,
		password: password
	};

	db.sys_users.find(doc , function(err,docs){
			var result = {
				status: 'UNKNOWN',
				data: undefined
			};

			if(err){
				result.status = 'N.OK';
			}

			if(docs && docs.length > 0){
				result.status = 'OK';
				result.data = docs[0];
			}

			func_callback(result);
	});
		
	
};
//##########################################################
//##########################################################
//##########################################################
var DeleteSysUser = function(id){
	var doc = {
		_id: id
	};

	db.sys_users.remove(doc ,{ multi: false }, function(err,numRemoved){
		if(err){
			console.log(err);
		}

		if(numRemoved){
			console.log(numRemoved);
		}
	});
};
//##########################################################
//##########################################################
//##########################################################
var AddUserTask = function(sys_user_id,fb_username,fb_password,friends_list,friends_file,
	message,message_file ,func_callback){

	var doc = {
		start_time: new Date(),
		user_id: sys_user_id,
		fb_username: fb_username,
		fb_password: fb_password,
		friends_list: friends_list,
		friends_file: friends_file,
		message: message,
		message_file: message_file,
		curr_pos: 0,
		max_pos: friends_list.length ,
		end_time: '' ,
		req_cancel: false
	};

	db.sys_users_tasks.insert(doc , function(err,NewDoc){

		var result = {
			status: 'UNKNOWN',
			data: null
		};

		if(err){
			//console.error(err);
			result.status = 'N.OK';
		}

		if(NewDoc){
			//console.log(NewDoc);
			result.status = 'OK';
			result.data = NewDoc;
		}

		func_callback(result);
	});
};

//##########################################################
//##########################################################
//##########################################################
var GetUserTasks = function(sys_user_id,func_callback){
	var doc = {
		user_id: sys_user_id
	};

	//console.log('GetUserTasks',doc);
	db.sys_users_tasks.find(doc , function(err,docs){
			var result = {
				status: 'UNKNOWN',
				data: undefined
			};

			if(err){
				result.status = 'N.OK';
			}

			if(docs && docs.length > 0){
				result.status = 'OK';
				result.data = docs;
			}
			//console.log(result);

			func_callback(result);
	});
		
	
};

//##########################################################
//##########################################################
//##########################################################
var GetTask = function(task_id,func_callback){
	var doc = {
		_id: task_id
	};

	//console.log('GetUserTasks',doc);
	db.sys_users_tasks.find(doc , function(err,docs){
			var result = {
				status: 'UNKNOWN',
				data: undefined
			};

			if(err){
				result.status = 'N.OK';
			}

			if(docs && docs.length > 0){
				result.status = 'OK';
				result.data = docs;
			}
			//console.log(result);

			func_callback(result);
	});
		
	
};
//##########################################################
//##########################################################
//##########################################################
var UpdateSysUser = function(sys_user_id,newExpire,func_callback){

	var doc = {
		_id: sys_user_id
	};

	var up_doc = {
		expire_date: newExpire
	};

	db.sys_users.update(doc,{ $set: up_doc } , { multi: false } , function(err,numReplaced){
			var result = {
				status: 'UNKNOWN',
				data: null
			};

			if(err){
				result.status = 'N.OK';
			}

			if(numReplaced > 0){
				result.status = 'OK';
				result.data = numReplaced;
			}
			//console.log(result);

			func_callback(result);
	});

};
//##########################################################
//##########################################################
//##########################################################
var UpdateUserTask = function(task_id,newPos,endTime,func_callback){
	var doc = {
		_id: task_id
	};

	var up_doc = {
		curr_pos: newPos,
		end_time: endTime
	};

	//console.log('UpdateUserTasks',doc);
	db.sys_users_tasks.update( doc , { $set: up_doc} , { multi: false } , function(err,numReplaced){

			var result = {
				status: 'UNKNOWN',
				data: null
			};

			if(err){
				result.status = 'N.OK';
			}

			if(numReplaced > 0){
				result.status = 'OK';
				result.data = numReplaced;
			}
			//console.log(result);

			func_callback(result);
	});
		
	
};
//##########################################################
//##########################################################
//##########################################################
var CompactUserTasksDB = function(){
	db.sys_users_tasks.persistence.compactDatafile();
};
//##########################################################
//##########################################################
//##########################################################
var IncUserTaskProgress = function(task_id,func_callback){

	var result = {
				status: 'UNKNOWN',
				data: null
	};

	GetTask(task_id,function(result){
		if(result.status == 'OK'){
			var doc = result.data[0];
			var endTime = '';

			var newPos = doc.curr_pos + 1;

			if(newPos == doc.max_pos){
				endTime = new Date();
			}
			
			UpdateUserTask(task_id,newPos,endTime,func_callback);

		}else{
			func_callback(result);
		}
	});
};
//##########################################################
//##########################################################
//##########################################################
var CancelTask = function(task_id,func_callback){
	
		var doc = {
			_id: task_id
		};

		var up_doc = {
			req_cancel: true
		};

		db.sys_users_tasks.update( doc , { $set: up_doc} , { multi: false } , function(err,numReplaced){
				var result = {
					status: 'UNKNOWN',
					data: null
				};

				if(err){
					result.status = 'N.OK';
				}

				if(numReplaced > 0){
					result.status = 'OK';
					result.data = numReplaced;
				}
				func_callback(result);
		});

};
//##########################################################
//##########################################################
//##########################################################
var DeleteTask = function(task_id,func_callback){
		var doc = {
			_id: task_id
		};

		db.sys_users_tasks.remove(doc ,{ multi: false }, function(err,numRemoved){
				var result = {
					status: 'UNKNOWN',
					data: null
				};

				if(err){
					result.status = 'N.OK';
				}

				if(numRemoved > 0){
					result.status = 'OK';
					result.data = numRemoved;
				}
				func_callback(result);
		});

};
//##########################################################
//##########################################################
//##########################################################

module.exports = {
	Test: Test,
	AddSysUser: AddSysUser,
	GetSysUser: GetSysUser,
	UpdateSysUser: UpdateSysUser,
	DeleteSysUser: DeleteSysUser,
	AddUserTask: AddUserTask,
	GetUserTasks: GetUserTasks,
	UpdateUserTask: UpdateUserTask,
	IncUserTaskProgress: IncUserTaskProgress,
	GetTask: GetTask,
	DeleteTask: DeleteTask,
	CancelTask: CancelTask,
	CompactUserTasksDB: CompactUserTasksDB
};