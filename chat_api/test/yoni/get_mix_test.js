var login = require('../../index.js');
var fs = require('fs');

login({email: "protechmulti@gmail.com", password: "p1r2o3t4"}, function callback (err, api) {
    if(err) return console.error(err);

    var state = api.getAppState();
    //console.log('state',state);

    fs.writeFileSync('appstate.json', JSON.stringify(state) );

    var curr_id = api.getCurrentUserID();
    console.log('curr_id',curr_id);

    api.getUserInfo([curr_id,'100013013058636'], function(err, ret) {
      if(err) return console.error(err);

      for(var user in ret) {
        console.log('user',user);
      }

    });


    console.log('start logout');

    api.logout(function(res){
    	console.log('logout-res',res);
    });

});