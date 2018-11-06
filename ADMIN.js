var stdin = process.openStdin();
var CONFIG = require('./CONFIG.js');
var db_mng = require('./DB_MANAGER.js');

var MENU_ADMIN ='######################\n';
	MENU_ADMIN += 'Welcome Admin,\n';
	MENU_ADMIN += 'Enter operation:\n';
	MENU_ADMIN += '1. Add System user.\n';
	MENU_ADMIN += '2. Update System user.\n';
	MENU_ADMIN += '3. Delete System user.\n';
	MENU_ADMIN += '4. Exit.\n';
	MENU_ADMIN += '######################';

const MENU_GET_SYS_USERNAME ='Username:';
const MENU_GET_SYS_PASSWORD ='Password:';
const MENU_GET_SYS_EXPIRE ='Expire date <yyyy-mm-dd>:';

const STATUS_OK = 'OK';

const MSG_USER_NOT_FOUND = 'User not found.';
const MSG_OPERATION_FAILED = 'Operation failed.';
const MSG_OPERATION_SUCCESS = 'Operation success.';


//##########################################################
//##########################################################
//##########################################################
var Print = function(data){
	console.info(data);
};
//##########################################################
//##########################################################
//##########################################################
var InputListenerAdminMenu = function(inp){
	var value = inp.toString().trim();

	switch(value){
		case '1':
			AddSysUser();
			break;
		case '2':
			UpdateSysUser();
			break;
		case '3':
			break;
		case '4':
			process.exit(0);
			break;
		default:
			break;
	};

};

//##########################################################
//##########################################################
//##########################################################
var ClearScreen = function(){
	var stdout = '';

	var lines = process.stdout.getWindowSize()[1];
	for(var i=0;i<lines;i++){
		stdout += "\r\n";
	}

	// Reset cursur
    stdout += "\033[0f";

	process.stdout.write(stdout);
};
//##########################################################
//##########################################################
//##########################################################
var AddSysUser = function(){

	var msg_arr = [
					MENU_GET_SYS_USERNAME,
					MENU_GET_SYS_PASSWORD,
					MENU_GET_SYS_EXPIRE
					];
	
	GetDataFromUser(msg_arr,function callback(data){
		var username = data[0];
		var password = data[1];
		var expire_date = data[2];

		//db_mng.AddSysUser(username,password,expire_date);


	});

};
//##########################################################
//##########################################################
//##########################################################
var UpdateSysUser = function(){
	var msg_arr = [
					MENU_GET_SYS_USERNAME,
					MENU_GET_SYS_PASSWORD
					];

	GetDataFromUser(msg_arr,function callback(data){
		var username = data[0];
		var password = data[1];

		db_mng.GetSysUser(username,password,function(result){
			if(result.status != STATUS_OK){
				Print(MSG_USER_NOT_FOUND);
				return;
			}

			var user = result.data;
			ClearScreen();
			Print(user);

			msg_arr = [
						MENU_GET_SYS_EXPIRE
						];

				GetDataFromUser(msg_arr,function callback(data){
					var new_expire = data[0];  //string
					new_expire = new Date(new_expire);

					db_mng.UpdateSysUser(user._id,new_expire,function(result){
						if(result.status != STATUS_OK){
							Print(MSG_OPERATION_FAILED);
							return;
						}

						Print(MSG_OPERATION_SUCCESS);

					});

				});

		});

	});

};

//##########################################################
//##########################################################
//##########################################################
var GetDataFromUser = function(msg_arr,func_callback){

	var pos = 0;
	var count = msg_arr.length;
	var data = [];

	GetDataFromUser_Worker(msg_arr,pos,count,data,func_callback);

};

//##########################################################
//##########################################################
//##########################################################
var GetDataFromUser_Worker = function(msg_arr,pos,count,data,func_callback){

	stdin.removeAllListeners('data');
	ClearScreen();
	var msg = msg_arr[pos];
	Print(msg);

	stdin.addListener('data' , function(inp){
		var value = inp.toString().trim();
		data[pos++] = value;

		if( !(pos < count) ){
			stdin.removeAllListeners('data');
			ClearScreen();
			func_callback(data);
			return;
		}

		GetDataFromUser_Worker(msg_arr,pos,count,data,func_callback);

	} );

};
//##########################################################
//##########################################################
//##########################################################
var Main = function(){

	Print(MENU_ADMIN);
	stdin.addListener( 'data' , InputListenerAdminMenu );

};
//##########################################################
//##########################################################
//##########################################################

Main();

