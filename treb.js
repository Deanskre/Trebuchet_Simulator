function InitializeTrebuchet(){
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);

  TREBUCHET = {
    counterweight: 100,
    releaseAngle: Math.PI/2.7
  }

  GAME = {
    canvas : {
      width : 1200,
      height : 500
    },
    started : true,
    level : 1,
    t : 0,
    tv: .05,
    ta: .001
  }

  //sets the positions of the text input boxes
  weightInput._x =520;
  weightInput._y = 380;
  angleInput._x =140;
  angleInput._y = 340;
}
