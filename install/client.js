var net = require('net');


var port = 3000;

var client = new net.Socket();

client.connect( port, function() {
    console.log("connection" + host + ";"+port)
    client.write("CONNECTION")
});

client.on('data', function(data) {
    console.log("data" + data);
    client.destory();
});

client.close('close' , function() {
    console.log("close")
});