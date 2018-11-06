angular.module('newton_messaging').controller('ControlLogin',function($scope,ServiceLogin,ServiceMsg){
	
	$scope.username = '';
	$scope.password= '';

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	$scope.submit = function(){

		var validation_result = $scope.validation();

		if(validation_result.status == false ){
			ServiceMsg.ShowMessage(ServiceMsg.TYPE_ERROR,
									ServiceMsg.TITLE_VALIDATION_ERROR,
									validation_result.message);
			return;
		}

		$login_path = ServiceLogin.GetDefaultLoginRequestPath();
		$success_redirect_path = ServiceLogin.GetDefaultLoginSuccessRedirectPath();

		ServiceLogin.LoginUser($scope.username,$scope.password,$login_path,$success_redirect_path);

		//console.log('ControlLogin - submit: Login OK');

	};
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	$scope.validation = function(){

		var result = {
			status: true,
			message: ''
		};

		if($scope.username == '' || angular.isUndefined($scope.username) || 
					$scope.password == '' || angular.isUndefined($scope.password)){

			result.status = false;
			result.message = ServiceMsg.MSG_MISSING_USER_PASS;
		}

		return result;
	};
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################

});