angular.module('newton_messaging').controller('ControlTasks',function($rootScope,$scope,$http,ServiceConfirm){

	$scope.tasks = [];

//##########################################################
//##########################################################
//##########################################################
	$scope.GetUserTasks = function(){

		console.log('GetUserTasks');

		$request_path = '/web/GetTasks';
		var request = {
			 method: 'POST',
			 url: $request_path,
			 data: { 
			 			sys_user_id: $rootScope.LoggedUserId
				    }
		};

		$http(request).then(function(result){
			console.log('result',result);
			$scope.tasks = result.data;
		}, function(error){
			console.log('error',error);
			$scope.tasks = [];
		});

	};
//##########################################################
//##########################################################
//##########################################################
	$scope.GetLocalDate = function(server_date){
		return new Date(server_date).toLocaleString();
	};
//##########################################################
//##########################################################
//##########################################################
	$scope.CancelTask = function($task,$event){

		var elem = $event.target || $event.currentTarget;
		elem.disabled  = true;

		var OkCallback = function(){
			$request_path = '/web/CancelTask';
			var request = {
				 method: 'POST',
				 url: $request_path,
				 data: { 
				 			task_id: $task._id
					    }
			};

			$http(request).then(function(result){
				console.log('result',result);
			}, function(error){
				console.log('error',error);

			});
		};

		var CancelCallback = function(){};

		var msg = ServiceConfirm.MSG_CANCEL_TASK;
		msg = msg.replace(ServiceConfirm.KEY_TASK_ID,$task._id);

		ServiceConfirm.ShowConfirmation(ServiceConfirm.TYPE_INFO,
										ServiceConfirm.TITLE_GENERAL_CONFIRMATION,
										msg,
										OkCallback,
										CancelCallback);

	};
//##########################################################
//##########################################################
//##########################################################
	$scope.DeleteTask = function($task,$event){

		var elem = $event.target || $event.currentTarget;
		elem.disabled  = true;

		var OkCallback = function(){
				$request_path = '/web/DeleteTask';
				var request = {
					 method: 'POST',
					 url: $request_path,
					 data: { 
					 			task_id: $task._id
						    }
				};

				$http(request).then(function(result){
					console.log('result',result);
				}, function(error){
					console.log('error',error);

				});
		};

		var CancelCallback = function(){};

		var msg = ServiceConfirm.MSG_DELETE_TASK;
		msg = msg.replace(ServiceConfirm.KEY_TASK_ID,$task._id);

		ServiceConfirm.ShowConfirmation(ServiceConfirm.TYPE_INFO,
										ServiceConfirm.TITLE_GENERAL_CONFIRMATION,
										msg,
										OkCallback,
										CancelCallback);

	};
//##########################################################
//##########################################################
//##########################################################
	$scope.IsTaskCancled = function($task){
		return $task.req_cancel;
	};
//##########################################################
//##########################################################
//##########################################################
	$scope.IsTaskDeleted = function($task){
		return false;
	};
//##########################################################
//##########################################################
//##########################################################
});