module.exports = function(io) {
  var app = require('express');
  var router = app.Router();
  var fs = require('fs');
  var topic;

  fs.readFile('./public/data/quiz.json', 'utf8', function (err, data) {
    if (!err) {
      topic = JSON.parse(data);
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
    socket.emit('setTopic', setTopic(10));
    socket.on('checkAns', function(ans) {
      var userAns = ans['ans'];
      if (topic[ans['topicNum']]['answer'] == userAns) {
        socket.emit('result', true);
      }
      else {
        socket.emit('result', false);
      }
    })
  });
  /**
   * 挑選數題隨機題目
   * @param {Number} num 題數
   * @return {json} topicData 選出的題目
   */
  function setTopic(num) {
    var count = topic.length,
        randary = [],
        topicData = [];
    for (var i = 0; i < count; i++) { 
      randary[i] = i;
    } 
    randary.sort(function(){ return 0.5 - Math.random(); }); 
    for (var i = 0; i < num; i++) { 
      topicData.push(
        {
          'topicNum': i,
          'title': topic[randary[i]]['title'],
          'choice': topic[randary[i]]['choice']
        }
      ); 
    } 
    return topicData;
  }

  return router;
}

