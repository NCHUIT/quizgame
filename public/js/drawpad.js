jQuery(document).ready(function($) {
  var board,
      $canvas = document.getElementById('myCanvas'),
      $img = document.getElementById('img');

  $canvas.width = $('#myCanvas').width();
  $canvas.height = 300;

  board = $canvas.getContext('2d');

  var mousePress = false;
  var last = null;

  $('#clean').click(function() {
    clean();
  });

  $('#submit').click(function() {
    submit();
  });

  function beginDraw(){
    mousePress = true;
  }

  function drawing(event){
    event.preventDefault();
    if(!mousePress)return;
    var xy = pos(event);
    if(last!=null){
      board.beginPath();
      board.moveTo(last.x,last.y);
      board.lineTo(xy.x,xy.y);
      board.stroke();
    }
    last = xy;
  }

  function endDraw(event){
     mousePress = false;
     event.preventDefault();
     last = null;
  }

  function pos(event){
    var x,y;
    if(isTouch(event)){
      x = event.touches[0].pageX-20;
      y = event.touches[0].pageY-30;
    }else{
      x = event.offsetX+event.target.offsetLeft;
      y = event.offsetY+event.target.offsetTop-20;
    }
    return {x:x,y:y};
  }

  function isTouch(event){
    var type = event.type;
    if(type.indexOf('touch')>=0){
      return true;
    }else{
      return false;
    }
  }

  function submit(){
    //base64
    var dataUrl = $canvas.toDataURL();
    $img.src = dataUrl;
  }


  function clean(){
    board.clearRect(0,0,$canvas.width,$canvas.height);

  }

  board.lineWidth = 4;
  board.strokeStyle="#74D2FF";


  $canvas.onmousedown = beginDraw;
  $canvas.onmousemove = drawing;
  $canvas.onmouseup = endDraw;
  $canvas.addEventListener('touchstart',beginDraw,false);
  $canvas.addEventListener('touchmove',drawing,false);
  $canvas.addEventListener('touchend',endDraw,false);
});