var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var moment = require('moment')

server.listen(3000 , function(){
	console.log('Server running on port 3000')
});

app.get('/', function(request , response){
	response.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
	console.log('A connection was made at '+ moment().format())

	socket.on('chat.message', function(message){
		/*console.log('New message : '+ message + ' Time: '+ moment().format())*/
		io.emit('chat.message', message);
	});

	socket.on('disconnect', function(){
		io.emit('chat.message','user has disconnected');
	})
})