$(document).ready(function() {
  var socket = io.connect();
  var topic,
      nowTopic = 0,
      numCorrect = 0;
  socket.on('setTopic', function(data) {
    topic = data;
    postTopic(nowTopic);
  });

  $('#answer .button').click(function() {
    // check is in 10
    if (nowTopic < 10) {
      var ans = parseInt($(this).attr('value'));
      socket.emit('checkAns',
        {
          'topicNum': topic[nowTopic]['topicNum'],
          'ans': ans
        }
      );
    }
  });

  $('.shape').shape();
  $('#result .button#goForm').click(function(){
    $('.shape').shape('flip right');
  });

  socket.on('correctPersent', function(persent){
    $('#correctPersent span').html(persent);
  });

  socket.on('result', function(result) {
    var icon = '';
    if (result) {
      icon = '#correct';
      numCorrect += 1;
    }
    else {
      icon = '#wrong';
    }

    $('.segment').css('z-index', 10);
    $('.segment').dimmer('show');
    $(icon).show();

    $('#answer .ui.button').addClass('disabled');
    setTimeout(function(){
      $('.segment').css('z-index', -1);
      $('.segment').dimmer('hide');
      $(icon).hide();
      $('#answer .ui.button').removeClass('disabled');
      nowTopic += 1;
      // check is in 10
      if(nowTopic >= 10) {
        console.log('num of correct ans:' + numCorrect);
        $('#gameStep').hide();
        $('#resultStep span').html(numCorrect);
        $('#resultStep').show();
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
    socket.emit('getPersent', topic[nowTopic]['topicNum']);
  }
});
