$(document).ready(function() {
  var socket = io.connect();
  console.log(topic);
  socket.on('test', function(data) {
    console.log(data);
  });
});
