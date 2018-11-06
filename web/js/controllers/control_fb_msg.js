angular.module('newton_messaging').controller('ControlFacebookMessage',function($rootScope,$scope,$http,ServiceMsg,ServiceWait){

	$scope.FbUser = undefined;
	$scope.TxtMessage = '';

//###############################
//###############################
//###############################
	$scope.StartTask = function(){
		//console.log('ControlFacebookMessage - StartTask');
		$rootScope.ControlFacebookUser_InitFbUser();
		$scope.FbUser = $rootScope.ControlFacebookUser_GetFbUser();
		$scope.FbFriendsFiltered = $rootScope.ControlFacebookUser_GetFbFriendsFiltered();

		var validation_result = $scope.validation();

		if(validation_result.status == false){
			ServiceMsg.ShowMessage(ServiceMsg.TYPE_ERROR,
									ServiceMsg.TITLE_VALIDATION_ERROR,
									validation_result.message);
			return;
		}

		ServiceWait.OpenDialog();

		$request_path = '/web/MsgTask';
		//console.log('message',escape($scope.TxtMessage));
		var request = {
			 method: 'POST',
			 url: $request_path,
			 data: { 
			 			sys_user_id: $rootScope.LoggedUserId,
				    	fb_username: $scope.FbUser.GetUserName(),
				    	fb_password: $scope.FbUser.GetPassword(),
				    	fb_friends_list: $scope.FbFriendsFiltered,
				    	message: $scope.TxtMessage
				    }
		};

		$http(request).then(function(result){
			ServiceWait.CloseDialog();

			if(result.data.status == 'OK'){

				var message = 'Task added, ID: <b>' + result.data.data + '</b>';
				ServiceMsg.ShowMessage(ServiceMsg.TYPE_INFO,
									ServiceMsg.TITLE_TASK_REQUEST_RESULT,
									message);
			}else{
				//error
			}
			

			//console.log('result',result);
		}, function(error){
			ServiceWait.CloseDialog();
			console.log('error',error);
		});
	};
//###############################
//###############################
//###############################

	$scope.validation = function(){

		var result = {
			status: true,
			message: ''
		};

		if( $scope.FbUser.IsValid() == false ){
			result.status = false;
			result.message += '*' + ServiceMsg.MSG_INVALID_FB_USER + '<br>';
		}

		if( angular.isUndefined($scope.TxtMessage) || $scope.TxtMessage == '' ){
			result.status = false;
			result.message += '*' + ServiceMsg.MSG_MISSING_CHAT_MESSAGE + '<br>';
		}

		if( angular.isUndefined($scope.FbFriendsFiltered) || $scope.FbFriendsFiltered.length == 0 ){
			//console.error('friends list is empty');
			result.status = false;
			result.message += '*' + ServiceMsg.MSG_FRIEND_LIST_EMPTY + '<br>';
		}


		return result;

	};

//###############################
//###############################
//###############################

});