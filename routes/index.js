module.exports = function(io) {
  var app = require('express');
  var router = app.Router();
  var fs = require('fs');
  var topic;

  fs.readFile('./public/data/quiz.json', 'utf8', function (err, data) {
  	if (!err) {
  		topic = JSON.parse(data);
  		// console.log(topic);
  	}
  	else {
  		throw err;
  	}
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index');
  });

  io.on('connection', function(socket) {
    socket.emit('test', topic);
  });

  return router;
}
