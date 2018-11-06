const net = require('net');

var obj = {
	name: 'yoni',
	role: 'manager'
};

var msg = JSON.stringify(obj);

const client = net.connect({port: 9090}, () => {
  // 'connect' listener
  console.log('connected to server!');
  client.write(msg + '\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});