//https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#login

angular.module('newton_messaging').controller('ControlFacebookUser',function($rootScope,$scope,
	FbUser,ServiceWait,ServiceMsg,ServiceLoadCustomFile){

	$scope.FbUser = new FbUser('','');

	$scope.fb_username = '';
	$scope.fb_password = '';
	$scope.fb_friends = [];
	$scope.fb_friends_filtered = [];

	$scope.filter_gender = undefined;

	//$scope.isMissingFbUserData = ($scope.fb_username == '' || $scope.fb_password == '');

//###############################
//###############################
//###############################
	$scope.GetUserFriends = function(){
		console.log('ControlFacebookUser - GetUserFriends');

		var validation_result = $scope.validation();

		if(validation_result.status == false){
			ServiceMsg.ShowMessage(ServiceMsg.TYPE_ERROR,
									ServiceMsg.TITLE_VALIDATION_ERROR,
									validation_result.message);
			return;
		}

		ServiceWait.OpenDialog();

		$scope.FbUser.Init($scope.fb_username,$scope.fb_password);

		$scope.FbUser.GetUserFriends(function(err,res){
			if(err){
				console.log(err);
				$scope.fb_friends = [];
				ServiceWait.CloseDialog();
				return;
			}

			if(res != 'null'){
				$scope.fb_friends = res;
			}else{
				$scope.fb_friends = [];
			}

			ServiceWait.CloseDialog();
		});
	};
//###############################
//###############################
//###############################
	$scope.ExportUserFriends = function(){
		console.log('ExportUserFriends');
		var default_filename = 'fb_users.json'
		var data = JSON.stringify($scope.fb_friends_filtered,undefined, 2);
		var blob = new Blob([data], {type: 'text/json'});

		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
		      window.navigator.msSaveOrOpenBlob(blob, default_filename);
	  	}else{
	      var e = document.createEvent('MouseEvents'),
	          a = document.createElement('a');

	      a.download = default_filename;
	      a.href = window.URL.createObjectURL(blob);
	      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
	      e.initEvent('click', true, false, window,
	          0, 0, 0, 0, 0, false, false, false, false, 0, null);
	      a.dispatchEvent(e);
	  }
	};
//###############################
//###############################
//###############################
	$scope.ImportSystemUserFriends = function(){
		console.log('ImportSystemUserFriends');
		var ImportFileId = 'ImportFile';

		var ImportFile = document.getElementById(ImportFileId);

		ImportFile.onchange = function(event){
			var fileList = ImportFile.files;
			console.log('files',fileList);

			var file = ImportFile.files[0];
			var reader = new FileReader();
			reader.readAsText(file, "UTF-8");

			reader.onload = function (evt) {

				ServiceWait.OpenDialog();
        		//evt.target.result;
        		//console.log('file content',evt.target.result);
        		var data = evt.target.result;
        		$scope.fb_friends = JSON.parse(data);
        		$scope.$apply();

        		ServiceWait.CloseDialog();
		    }
		    reader.onerror = function (evt) {
		        //"error reading file";
		        console.log('file content','error reading file');
		    }
		};

		ImportFile.click();


	};
//###############################
//###############################
//###############################
	$scope.ImportCustomUserFriends = function(){
		console.log('ImportCustomUserFriends');
		
		ServiceLoadCustomFile.ShowModal(
			function(result){
				$scope.fb_friends = result;
			},
			function(err){

			});

		


	};
//###############################
//###############################
//###############################
	$scope.change_filter_gender = function(){
		//console.log('change_filter_gender',$scope.filter_gender);
		if($scope.filter_gender == ''){
			$scope.filter_gender = undefined;
		}
	};
//###############################
//###############################
//###############################
	$scope.validation = function(){
		var result = {
			status: true,
			message: ''
		};

		if( angular.isUndefined($scope.fb_username) || $scope.fb_username == ''){
			result.status = false;
			result.message = ServiceMsg.MSG_MISSING_FB_USER_PASS;
		}

		if( angular.isUndefined($scope.fb_password) || $scope.fb_password == ''){
			result.status = false;
			result.message = ServiceMsg.MSG_MISSING_FB_USER_PASS;
		}


		return result;
	};
//###############################
//###############################
//###############################
	//Global
	$rootScope.ControlFacebookUser_InitFbUser = function(){
		$scope.FbUser.Init($scope.fb_username,$scope.fb_password);
	};
	$rootScope.ControlFacebookUser_GetFbUser = function(){
		return $scope.FbUser;
	};
	$rootScope.ControlFacebookUser_GetFbFriendsFiltered = function(){
		return $scope.fb_friends_filtered;
	};
//###############################
//###############################
//###############################


});