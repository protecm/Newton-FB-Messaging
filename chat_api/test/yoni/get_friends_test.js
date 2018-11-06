var login = require('../../index.js');

login({email: "protechmulti@gmail.com", password: "p1r2o3t4"}, function callback (err, api) {
    if(err) return console.error(err);

    api.getFriendsList(function(err, data) {
    if(err) return console.error(err);

    	console.log(data.length);
    	console.log(data);
  	});

});
