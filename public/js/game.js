$(document).ready(function() {
  var socket = io.connect();
  var topic,
      nowTopic = 1;
  socket.on('setTopic', function(data) {
    topic = data;
    postTopic(nowTopic++);
  });

  function postTopic(num) {
    $('#question p').html(topic[num-1]['title']);
    for (var i = 0; i < 4; i++) {
      $('#answer .column:nth-child(' + (i+1) + ') span').html(topic[num-1]['choice'][i]);
    }
  }
});
