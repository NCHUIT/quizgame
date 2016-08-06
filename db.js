var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var quizLog = new Schema({
  topicNum: Number,
  correct : Number,
  ans_1   : Number,
  ans_2   : Number,
  ans_3   : Number,
  ans_4   : Number
});

mongoose.model( 'quizLog', quizLog );
mongoose.connect( 'mongodb://localhost/express-quizGame' );
