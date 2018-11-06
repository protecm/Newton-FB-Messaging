angular.module('waitApp', [])
  .service('ServiceWait', function($rootScope,$uibModal){

  		this.modalInstance;
//###############################
//###############################
//###############################
	  	this.OpenDialog = function(){
	  		$rootScope.wait_flag = true;
			this.modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: '/web/templates/template_wait_modal.html',
			      controller: 'ControlWaitModal',
			      size: 'lg',
			      backdrop: 'static',  //for click outside - disable close of the modal
		      	  keyboard: false,     //for escape key  - disable close of the modal
			      resolve: {
			      	}
			    }).result.then(function(result){
			    	//console.log('wait result',result);
		    });

  		};
//###############################
//###############################
//###############################
		this.CloseDialog = function(){
			$rootScope.wait_flag = false;
		};
//###############################
//###############################
//###############################


  })
  .controller('ControlWaitModal',function($scope,$rootScope,$uibModalInstance){

    var unregister = $rootScope.$watch('wait_flag', function(newValue) {
        //console.log('wait_flag changed',newValue);

        if(newValue == false){
        	$uibModalInstance.close();
        	unregister();
        }
        
	});

  });