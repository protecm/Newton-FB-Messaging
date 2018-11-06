var login = require('../../index.js');
var fs = require('fs');

login({email: "protechmulti@gmail.com", password: "p1r2o3t4"}, function callback (err, api) {
    if(err) return console.error(err);

    api.getFriendsList(function(err, data) {
    	if(err) return console.error(err);

    	console.log(data.length);

    	/*
    	for(i=0;i<10 && i<data.length; i++){
			console.log('id',data[i].userID);
    	}
    	*/

    	fs.writeFileSync('friends.json', JSON.stringify(data) );
    	
  	});

});
