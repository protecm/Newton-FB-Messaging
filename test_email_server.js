var SMTPServer = require('smtp-server').SMTPServer;

var server = new SMTPServer({
	size: 1024,
	secure: false,
	requireTLS: false,
    onConnect: function(session, callback){
        console.log("onConnect",session.remoteAddress);
        return callback(); // Accept the connection 
    },
    onMailFrom: function(address, session, callback){
    	console.log("onMailFrom",address.address );
    	return callback();
    },
    onRcptTo: function(address, session, callback){
        console.log("onRcptTo",address.address );
        return callback(); // Accept the address
    },
    onData: function(stream, session, callback){
    	console.log('onData');
        stream.pipe(process.stdout); // print message to console
        stream.on('end', function(){
            var err;
            if(stream.sizeExceeded){
                err = new Error('Message exceeds fixed maximum message size');
                err.responseCode = 552;
                return callback(err);
            }
            callback(null, 'OK: message queued');
        });
    },
    onAuth: function(auth, session, callback){
        console.log('onAuth',auth);
        callback(null, {user: 1}); // where 123 is the user id or similar property
    }

});

server.on('error', function(err){
    console.log('Error %s', err.message);
});


server.listen(25,function(res){
	console.log("server.listen",res);
});