var weightInput = new CanvasInput({
  canvas: document.getElementById('mainCanvas'),
  fontSize: 10,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 130,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'Counterweight mass'
});
var angleInput = new CanvasInput({
  canvas: document.getElementById('mainCanvas'),
  fontSize: 10,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 130,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'Launch angle'
});

function handleProjectileAnimation() {
  if (!PROJ.fired&&weightInput._value>0){
    TREBUCHET.counterweight =weightInput._value;

  }
  if (!PROJ.fired&&angleInput._value>=0&&angleInput._value<=90){
    TREBUCHET.releaseAngle =Math.PI *angleInput._value/180;

  }
  if (!PROJ.fired && CONTROLS.treb.fire) {
    PROJ.xv = Math.sqrt(TREBUCHET.counterweight * Math.cos(TREBUCHET.releaseAngle));
    PROJ.yv = -Math.sqrt(TREBUCHET.counterweight * Math.sin(TREBUCHET.releaseAngle));
    PROJ.fired=true;
  } else if (PROJ.fired){
    GAME.t+=GAME.tv;
    GAME.tv+=GAME.ta*Math.sqrt(TREBUCHET.counterweight);
    if (GAME.t>Math.PI/2 - TREBUCHET.releaseAngle){
      GAME.tv-=GAME.ta*Math.sqrt(TREBUCHET.counterweight);
      GAME.t-=GAME.tv;

      PROJ.x += PROJ.xv;
      PROJ.yv += PROJ.ya;
      PROJ.y += PROJ.yv;
      if (PROJ.y>500-PROJ.rad){
        PROJ.y =500-PROJ.rad
        PROJ.yv = -.3*PROJ.yv;
        if (PROJ.xv>0){
          PROJ.xv-=.2;
        }
        if (PROJ.xv<0){PROJ.xv=0}
      }
    }
    else {
      PROJ.x = 70 -53.46*Math.cos(GAME.t+.1313);
      PROJ.y = 470- 53.46*Math.sin(GAME.t+.1313);
    }
  }
}

function renderProjectile(context) {
  if (!CONTROLS.zoomIn){
  context.beginPath();
  context.moveTo(PROJ.x + 10, PROJ.y + 10);
  context.arc(PROJ.x, PROJ.y, PROJ.rad, 0, Math.PI * 2, true);
  context.fill();
}
else{
  PROJ.x = 17;
  PROJ.y = 463;
  PROJ.fired = false;
}
}

function renderTreb(context, canvas){
  var plank = new Image();
  plank.src = 'plank.png';
  if (CONTROLS.zoomIn){
    GAME.t=0;
    GAME.tv=0;
    context.drawImage(plank, 110, 275, 500, 150);
    context.fillStyle = "#B5651D";
    context.fillRect(550, 350, 50, 75);
    context.beginPath();
    context.moveTo(350, 500);
    context.lineTo(450, 350);
    context.lineTo(550, 500);
    context.lineTo(350, 500);
    context.fill();
    context.fillStyle = "#000000";
    weightInput.render(canvas);
    angleInput.render (canvas);
    context.font = "30px Arial";
    context.fillText("Initial values are 45° and 100kg. Trebuchet will hold whatever the most recently ", 30, 100);
    context.fillText("inputted valid values are. Remember to click out of the text boxes before switching", 30, 140);
    context.fillText("back to the firing range. (Press e to switch)", 30, 180);


  }else{
  drawRotatedImage(context, plank, 50, 470, 100, 30, GAME.t );
  context.fillStyle = "#B5651D";
  context.fillRect(50+40*Math.cos(GAME.t), 470+20*Math.sin(GAME.t), 10, 15);
  context.beginPath();
  context.moveTo(50, 500);
  context.lineTo(70, 470);
  context.lineTo(90, 500);
  context.lineTo(50, 500);
  context.fill();
  context.fillStyle = "#000000";
}
}

function drawRotatedImage(context, image, x, y, width, height, angle) {
  context.save();
  context.translate(x+20, y);
  context.rotate(angle);
  context.drawImage(image, (-width / 2)-20, -height / 2, width, height);
  context.restore();
  //To make this function work for top left, change translate(x, y) to translate(x+width/2, y+height/2)
  //Then, make the drawImage(image, 0, 0, width, height);
}

function runGame() {


  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');

  if (GAME.started) {

    //   // 1 - Reposition the objects
    handleProjectileAnimation();

    //   // 2 - Clear the CANVAS
    context.clearRect(0, 0, 1200, 500);

    //   // 3 - Draw new items
    renderTreb(context, canvas);
    renderProjectile(context);

  }
  window.requestAnimationFrame(runGame);
}
window.requestAnimationFrame(runGame);
