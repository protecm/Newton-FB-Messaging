angular.module('newton_messaging').controller('ControlMainMenu',function($scope,$location){
	
	$scope.MenuClicked = function($page){

		//console.log('MenuClicked','/'+$page);
		//console.log('Current path',$location.path());

		$location.path('/' + $page);

	};

});