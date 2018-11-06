angular.module('newton_messaging').config(	function ($routeProvider) {

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	$routeProvider
	.when ('/',{
		templateUrl: '/web/pages/login.html'
	})
	.when('/home',{
		resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.LoggedUserId){
					$location.path('/');
				}

		}},
		templateUrl: '/web/pages/home.html'
	})
	.when('/message',{
		resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.LoggedUserId){
					$location.path('/');
				}

		}},
		templateUrl: '/web/pages/message.html'
	})
	.when('/tasks',{
		resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.LoggedUserId){
					$location.path('/');
				}

		}},
		templateUrl: '/web/pages/tasks.html'
	})
	.otherwise({
		redirectTo: '/'
	});
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
});