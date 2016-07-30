module.exports = function(io) {
  var app = require('express');
  var router = app.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  io.on('connection', function(socket) {
    socket.emit('test', {'test': 'hi'});
  });

  return router;
}
