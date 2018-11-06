var fs = require('fs');
var net = require('net');
//##########################################################
//##########################################################
//##########################################################
var GetExpireStatus = function(expire_date){

	var curr_date = new Date();

	//console.log('Curr Date',curr_date);
	//console.log('Exp Date',expire_date);
	
	return curr_date > expire_date;
};
//##########################################################
//##########################################################
//##########################################################
var SaveFile = function(file_name,data){
	fs.writeFileSync(file_name, data );
};

//##########################################################
//##########################################################
//##########################################################
var SendSocketMessage = function(port,msg){

	var client = net.connect({port: port}, () => {
  	// 'connect' listener
	  console.log('connected to socket!');
	  client.write(msg + '\n');
	});
	client.on('data', (data) => {
	  console.log(data.toString());
	  client.end();
	});
	client.on('end', () => {
	  console.log('disconnected from socket');
	});

};
//##########################################################
//##########################################################
//##########################################################

module.exports = {
	GetExpireStatus: GetExpireStatus,
	SaveFile: SaveFile,
	SendSocketMessage: SendSocketMessage
};