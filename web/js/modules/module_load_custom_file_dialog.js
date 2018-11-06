angular.module('loadCustomFile',[])
.service('ServiceLoadCustomFile',function($uibModal){
	this.modalInstance;

//###############################
//###############################
//###############################
	this.ShowModal = function(ok_callback,cancel_callback){
			this.modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: '/web/templates/template_load_custom_file_modal.html',
			      controller: 'ControlLoadCustomFileModal',
			      size: 'lg',
  			      backdrop: 'static',  //for click outside - disable close of the modal
		      	  keyboard: false,     //for escape key  - disable close of the modal
			      resolve: {
			      		ok_callback: function(){
			      			return ok_callback;
			      		},
			      		cancel_callback: function(){
			      			return cancel_callback;
			      		},
			      		parent: function(){
			      			return this;
			      		}
			      	}
			    }).result.then(function(result){
			    	//console.log('confirmation result',result);
			    	if(result){
			    		ok_callback(result);
			    	}else{
			    		cancel_callback('cancel');
			    	}
		    });

  		};
//###############################
//###############################
//###############################
  	this.convertTxtData = function(data,seperator,columnsNum){
  		console.log('convertTxtData');
  		let ids = data.split('\n');
  		let arr = [];

  		for(let i=0;i<ids.length;i++){
  			let id = ids[i];
  			arr.push({
  				alternateName: '',
  				firstName: '',
  				gender: '',
	  			userID: id,
	  			isFriend: false,
	  			fullName: '',
	  			profilePicture: '',
	  			type: '',
	  			profileUrl: '',
	  			vanity: '',
	  			isBirthday: false
	  		});
  		}
  		
  		return arr;
  	};

})
.controller('ControlLoadCustomFileModal',function($scope,$uibModalInstance,ServiceWait,
	ok_callback,cancel_callback,ServiceLoadCustomFile){

  		$scope.ok_callback = ok_callback;
  		$scope.cancel_callback = cancel_callback;

  		$scope.fileFormat = "";
  		$scope.fb_friends = [];

  		$scope.importFile =  function(){

				console.log('ControlLoadCustomFileModal - importFile');
				var ImportFileId = 'ImportCustomFile';

				var ImportFile = document.getElementById(ImportFileId);

				ImportFile.onchange = function(event){
					var fileList = ImportFile.files;
					console.log('files',fileList);

					var file = ImportFile.files[0];
					var reader = new FileReader();
					reader.readAsText(file, "UTF-8");

					reader.onload = function (evt) {

						ServiceWait.OpenDialog();

		        		var data = evt.target.result;
		        		$scope.fb_friends = ServiceLoadCustomFile.convertTxtData(data);
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

  		$scope.ok = function(){
  			$uibModalInstance.close($scope.fb_friends);
  		};

  		$scope.cancel = function(){
  			$uibModalInstance.close(false);
  		};
});