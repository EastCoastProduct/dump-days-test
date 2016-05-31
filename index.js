const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', `${msg.a2uthor}: ${msg.message}`);
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
