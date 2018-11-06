angular.module('confirmApp',[])
.service('ServiceConfirm',function($uibModal){
	this.modalInstance;

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
	this.TITLE_GENERAL_CONFIRMATION = 'Confirmation';
//###############################
//###############################
//###############################
	this.KEY_TASK_ID = '<task-id>';
	this.MSG_GENERAL = 'Please confirm operation...';
	this.MSG_DELETE_TASK = 'Please confirm <b>delete</b> operation for task: <b>' + this.KEY_TASK_ID + '</b>';
	this.MSG_CANCEL_TASK = 'Please confirm <b>cancel</b> operation for task: <b>' + this.KEY_TASK_ID + '</b>';
//###############################
//###############################
//###############################
	this.ShowConfirmation = function(type,title,message,ok_callback,cancel_callback){
			this.modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: '/web/templates/template_confirm_modal.html',
			      controller: 'ControlConfirmModal',
			      size: 'lg',
  			      backdrop: 'static',  //for click outside - disable close of the modal
		      	  keyboard: false,     //for escape key  - disable close of the modal
			      resolve: {
			      		type: function(){
			      			return type;
			      		},
			      		title: function(){
			      			return title;
			      		},
			      		message: function(){
			      			return message;
			      		},
			      		ok_callback: function(){
			      			return ok_callback;
			      		},
			      		cancel_callback: function(){
			      			return cancel_callback;
			      		}
			      	}
			    }).result.then(function(result){
			    	console.log('confirmation result',result);
			    	if(result){
			    		ok_callback();
			    	}else{
			    		cancel_callback();
			    	}
		    });

  		};

})
.controller('ControlConfirmModal',function($scope,$uibModalInstance,type,title,message,ok_callback,cancel_callback){
		$scope.type_class = type.class;
		$scope.title = title;
  		$scope.message = message;
  		$scope.ok_callback = ok_callback;
  		$scope.cancel_callback = cancel_callback;

  		$scope.ok = function(){
  			$uibModalInstance.close(true);
  		};

  		$scope.cancel = function(){
  			$uibModalInstance.close(false);
  		};
});