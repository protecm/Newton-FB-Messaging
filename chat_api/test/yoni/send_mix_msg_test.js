var login = require('../../index.js');
//var sleep = require('sleep');

login({email: "protechmulti@gmail.com", password: "p1r2o3t4"}, function callback (err, api) {
    if(err) return console.error(err);

    var arr= ['697256482','100013013058636','100000206055701','100000248419960','100013022088144',
    			'100000774834458','100000108957810','100000148553257','1474449706'];

    var len = arr.length;
    var myVar;
    var i = 0;

    	myVar = setInterval(function(){
    		console.log('sleep 4 sec');

    		if(i< len){
    			var yourID = arr[i];   //Tomy Goldman
			    var msg = {body: "newton app is a cool fb management system"};
			    api.sendMessage(msg, yourID);
			    i++;
    		}else{
    			clearInterval(myVar);
    		}

    		
    	}, 4000);
    

    //var yourID = "100013013058636";   //Tomy Goldman
    //var msg = {body: "newton app is a cool fb management system"};
    //api.sendMessage(msg, yourID);

});
