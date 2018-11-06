angular.module('msgApp', [])
  .service('ServiceMsg', function($uibModal){

  		this.modalInstance;
//###############################
//###############################
//###############################
  		this.TITLE_LOGIN_ERROR = 'Login Error';
      this.TITLE_VALIDATION_ERROR = 'Validation Error';
      this.TITLE_TASK_REQUEST_RESULT = 'Task request result';


      this.MSG_MISSING_USER_PASS = 'Missing - Username or Password';
      this.MSG_MISSING_FB_USER_PASS = 'Missing - Facebook Username or Password';
  		this.MSG_WRONG_USER_PASS = 'Wrong - Username or Password';
  		this.MSG_USER_EXPIRED = 'User is expired, please contact company to renew account';
      this.MSG_INVALID_FB_USER = 'Invalid Facebook Username or Password';
      this.MSG_MISSING_CHAT_MESSAGE = 'Missing - Message to send';
      this.MSG_FRIEND_LIST_EMPTY = 'Friends list is empty';

//###############################
//###############################
//###############################
  		this.TYPE_ERROR = {
  			code: 100,
  			class: 'modal-header modal-header-danger'
  		};

  		this.TYPE_INFO = {
  			code: 200,
  			class: 'modal-header'
  		};
  		

//###############################
//###############################
//###############################
	  	this.ShowMessage = function(type,title,message){
			this.modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: '/web/templates/template_msg_modal.html',
			      controller: 'ControlMsgModal',
			      size: 'lg',
			      resolve: {
			      		type: function(){
			      			return type;
			      		},
			      		title: function(){
			      			return title;
			      		},
			      		message: function(){
			      			return message;
			      		}
			      	}
			    }).result.then(function(result){
			    	console.log('wait result',result);
		    });

  		};
//###############################
//###############################
//###############################



  })
  .controller('ControlMsgModal',function($scope,$uibModalInstance,type,title,message){

  		$scope.type_class = type.class;
  		$scope.title = title;
  		$scope.message = message;

  		$scope.ok = function(){
  			$uibModalInstance.close('close');
  		};

  });