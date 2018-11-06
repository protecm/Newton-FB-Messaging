angular.module('loginApp', [])
  .directive('login', function() {
    return {
      restrict : 'EA',
      templateUrl: '/web/templates/template_login.html',
      controller: 'ControlLogin'
    }
 })
  .service('ServiceLogin', function($http,$location,$rootScope,$uibModal,ServiceWait,ServiceMsg){

  	this.default_login_request_path = '/web/Login';
  	this.default_login_success_redirect_path = '/home';

//###############################
//###############################
//###############################
  	this.LoginUser = function($app_username,$app_password,$login_request_path,$login_success_redirect_path){
  		//console.log('ServiceLogin - LoginUser',$app_username);
  		//console.log('ServiceLogin - LoginUser',$app_password);

  		ServiceWait.OpenDialog();

  		var request = {
			 method: 'POST',
			 url: $login_request_path,
			 data: { 
				    	app_username: $app_username,
				    	app_password: $app_password
				    }
		};


		$http(request).then(function(result){

			ServiceWait.CloseDialog();
			//console.log('result',result);

			if(result.data != 'null'){

						if(result.data.expire_status == false){
							//console.log('Logged In');
							$rootScope.LoggedUserId = result.data._id;
							$rootScope.LoggedUserName = result.data.username;
							$location.path($login_success_redirect_path);
						}else{
							//console.log('user expired!');
							ServiceMsg.ShowMessage(ServiceMsg.TYPE_ERROR,
													ServiceMsg.TITLE_LOGIN_ERROR,
													ServiceMsg.MSG_USER_EXPIRED);
						}
					
			}else{
				//console.log('Wrong username or password');
				ServiceMsg.ShowMessage(ServiceMsg.TYPE_ERROR,
										ServiceMsg.TITLE_LOGIN_ERROR,
										ServiceMsg.MSG_WRONG_USER_PASS);
			}

		}, function(error){
			ServiceWait.CloseDialog();
			//console.log('error',error);
		});


  	};
//###############################
//###############################
//###############################
	this.GetDefaultLoginRequestPath = function(){
		return this.default_login_request_path;
	};

	this.GetDefaultLoginSuccessRedirectPath = function(){
		return this.default_login_success_redirect_path;
	}

//###############################
//###############################
//###############################

  });