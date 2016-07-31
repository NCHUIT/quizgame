$(document).ready(function() {
  var socket = io.connect();
  var topic,
      nowTopic = 0,
      numCorrect = 0;
  socket.on('setTopic', function(data) {
    topic = data;
    postTopic(nowTopic);
  });

  $('#answer button').click(function() {
    // check is in 10
    if (nowTopic < 10) {
      var ans = parseInt($(this).attr('value'));
      socket.emit('checkAns', {'topicNum': topic[nowTopic]['topicNum'], 'ans': ans});
    }
  });

  socket.on('result', function(result) {
    var icon = '';
    console.log(result);
    if (result) {
      icon = '#correct';
      numCorrect += 1;
    }
    else {
      icon = '#wrong';
    }
    // console.log(icon);
    $(icon).show();
    $('#main').css({
      '-webkit-filter': 'blur(5px)',
      'filter': 'blur(5px)'
    });
    setTimeout(function(){
      $('#main').css({
        '-webkit-filter': 'blur(0px)',
        'filter': 'blur(0px)'
      });
      $(icon).hide();
      nowTopic += 1;
      // check is in 10
      if(nowTopic >= 10) {
        console.log('complete!');
        console.log('num of currect ans:' + numCorrect);
      }
      else {
        postTopic();
      }
    }, 1000);

  });

  function postTopic() {
    $('#topicNum span').html(nowTopic+1);
    $('#question p').html(topic[nowTopic]['title']);
    for (var i = 0; i < 4; i++) {
      $('#answer .column:nth-child(' + (i+1) + ') span').html(topic[nowTopic]['choice'][i]);
    }
  }
});
