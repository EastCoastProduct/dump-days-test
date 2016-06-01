const app = require('express')();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const database = require('./database');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', function(req, res) {
  if (!req.body || !req.body.name) {
    return res.status(400).json({message: 'Name required'});
  }

  if (database.indexOf(req.body.name) !== -1) {
    return res.status(400).json({message: 'Name already taken'});
  }

  database.push(req.body.name);

  res.status(200).json({message: 'success'});
});

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit(
      'chat message',
      {
        author: msg.author,
        message: `${msg.author}: ${msg.message}`
      }
    );
  });
});

server.listen(process.env.PORT || 3000, function(){
   console.log('listening on *:' + server.address().port);
});

module.exports = app;
