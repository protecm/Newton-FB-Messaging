angular.module('fbuserApp', [])
  .directive('fbheader', function() {
    return {
      restrict : 'EA',
      template: '<h3>Facebook - User:</h3>',
    }
 })
  .directive('fbtoken', function() {
    return {
      restrict : 'EA',
      template: function(elem, attr) {
      		var ngChange = attr.ngChange;
      		var ngModel = attr.ngModel;

	        return '<textarea rows="2" id="TxtAccessToken" name="TxtAccessToken" ' +
       		'placeholder="User access token..." class="form-control input-lg" ' +
       		'ng-change=\"' + ngChange + '\" ng-model=\"' + ngModel + '\" ' +
       		'style="font-size:16px;" required></textarea>';
	  }
    }
 })
  .directive('fbimg', function() {
    return {
      scope: {
      	id: '@'
      },
      restrict : 'EA',
      template: '<img ng-src="https://graph.facebook.com/{{ id }}/picture">',
      link: function (scope, element, attrs) {
            //some code
      }
    }
 })
  .directive('fbname', function() {
    return {
      scope: {
      	name: '@'
      },
      restrict : 'EA',
      template: '<div>{{ name }}</div>'
    }
 })
  .directive('fbfriends', function() {
    return {
      restrict : 'EA',
      template: '<div>Friends list:</div>'
    }
 })
  .factory('FbUser', function($http,$window,$interval){

//###############################
//###############################
//###############################
  		var FbUser = function(username,password){
  			this.username = username;
  			this.password = password;

  			this.Friends = {
					arr: [],
				};

			  this.default_get_friends_request_path = '/web/GetFriends';
  		};

//###############################
//###############################
//###############################

  		FbUser.prototype.Init = function($username,$password){
  		   this.username = $username;
  			 this.password = $password;
  		};
//###############################
//###############################
//###############################
  		FbUser.prototype.Clear = function(){
  		   this.username = '';
  			 this.password = '';
  		};
//###############################
//###############################
//###############################
      FbUser.prototype.GetUserName = function(){
         return this.username;
      };
//###############################
//###############################
//###############################
      FbUser.prototype.GetPassword = function(){
         return this.password;
      };
//###############################
//###############################
//###############################
      FbUser.prototype.GetFriendsList = function(){
         return this.Friends.arr;
      };

      FbUser.prototype.filterFriends = function(arr,filter_field,filter_value){

        for(let i=0;i<arr.length;i++){
          let value = arr[i][filter_field];
          if(value != filter_value){
            arr.splice(i,1);
            i--;
          }
        }

        return arr;

      };
//###############################
//###############################
//###############################
  		FbUser.prototype.IsValid = function(){
			if(angular.isUndefined( this.username ) || this.username == ''){
				return false;
			}

			if(angular.isUndefined( this.password ) || this.password == ''){
				return false;
			}

			return true;
  		};

//###############################
//###############################
//###############################
	    FbUser.prototype.GetFbUserInfo = function() {

	    	console.log('FbUser - GetFbUserInfo');
    	};
//###############################
//###############################
//###############################
	    FbUser.prototype.GetUserFriends = function(func_callback) {
	    	//console.log('FbUser - GetFbUserInfo');

        var self = this;

	    	if( this.IsValid() ){
	    		var request = {
					 method: 'POST',
					 url: this.default_get_friends_request_path,
					 data: { 
						    	fb_username: this.username,
						    	fb_password: this.password
						    }
				};

				$http(request).then(function(result){

					//console.log('result',result);
          let clean_arr = [];
          if(result.data != 'null'){

            clean_arr = self.filterFriends(result.data,'isFriend',true)

            self.Friends.arr = clean_arr;
          }else{
            self.Friends.arr = [];
          }
          
          func_callback(false,clean_arr);

				}, function(error){
					//console.log('error',error);
          self.Friends.arr = [];
          func_callback(error,false);
				});


	    	}//END-IF

    	};
//###############################
//###############################
//###############################


  		return FbUser;
  });


//@  Used to pass a string value into the directive
//=    Used to create a two-way binding to an object that is passed into the directive
//&    Allows an external function to be passed into the directive and invoked

