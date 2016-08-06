module.exports = function(io) {
  var mongoose = require('mongoose');
  var quizLog = mongoose.model('quizLog');

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

  io.on('connect', function(socket) {
    socket.emit('setTopic', setTopic(10));
    socket.on('checkAns', function(ans) {
      var topicNum = ans['topicNum'],
          userAns = ans['ans'],
          trueAns = topic[topicNum]['answer'];
      var result = false;
      if (trueAns == userAns) {
        result = true;
      }
      quizLog.find({'topicNum': topicNum}, function(err, data) {
        if (!data.length) {
          new quizLog({
            topicNum: topicNum,
            correct : 0,
            ans_1   : 0,
            ans_2   : 0,
            ans_3   : 0,
            ans_4   : 0
          }).save();
          // console.log('add data to db');
        }
        if(result) {
          quizLog.update({'topicNum': topicNum}, {'$inc': {'correct': 1}}, {upsert : true}, function(err){ if(err) console.log(err);});
        }
        switch (userAns) {
          case 1:
            quizLog.update({'topicNum': topicNum}, {'$inc': {'ans_1': 1}}, {upsert : true}, function(err){ if(err) console.log(err);});
            console.log(1);
            break;
          case 2:
            quizLog.update({'topicNum': topicNum}, {'$inc': {'ans_2': 1}}, {upsert : true}, function(err){ if(err) console.log(err);});
            console.log(2);
            break;
          case 3:
            quizLog.update({'topicNum': topicNum}, {'$inc': {'ans_3': 1}}, {upsert : true}, function(err){ if(err) console.log(err);});
            console.log(3);
            break;
          case 4:
            quizLog.update({'topicNum': topicNum}, {'$inc': {'ans_4': 1}}, {upsert : true}, function(err){ if(err) console.log(err);});
            console.log(4);
            break;
        }
        // console.log(data[0]);
      })
      socket.emit('result', result);
    });
    socket.on('getPersent', function(topicNum){
      quizLog.find({'topicNum': topicNum}, function(err, data) {
        var persent = 0;
        console.log(data[0]);
        if (data.length) {
          var correct = data[0].correct;
          var tot = data[0].ans_1 + data[0].ans_2 + data[0].ans_3 + data[0].ans_4;
          persent = (correct / tot)*100;
          if(isNaN(persent)) {
            persent = 0;
          }
          else {
            persent = persent.toFixed(2);
          }
        }
        socket.emit('correctPersent', persent);
      });
    })
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
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
          'topicNum': randary[i],
          'title': topic[randary[i]]['title'],
          'choice': topic[randary[i]]['choice']
        }
      );
    }
    return topicData;
  }

  return router;
}
