/*
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
}); //these two fellows are the text boxes that appear on the design screen to take in the weight and launchAngle of the trebuchet. Their positions are set in InitializeTrebuchet(); the CanvasInput.js class is copied from the internet
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
  if (!PROJ.fired&&weightInput._value>0){ //if there is a weight valid value inputted in the text boxes, replace the trebuchet's weight value
    TREBUCHET.counterweight =weightInput._value;

  }
  if (!PROJ.fired&&angleInput._value>=0&&angleInput._value<=90){//same as above but for angle
    TREBUCHET.releaseAngle =Math.PI *angleInput._value/180;

  }

  if (!PROJ.fired && CONTROLS.treb.fire) { //gives the projectile its x and y speeds when it's fired. however, they wont start affecting its movement until after it's done rotating with the trebuchet arm
    PROJ.xv = Math.sqrt(TREBUCHET.counterweight * Math.cos(TREBUCHET.releaseAngle));
    PROJ.yv = -Math.sqrt(TREBUCHET.counterweight * Math.sin(TREBUCHET.releaseAngle));
    PROJ.fired=true;}
  else if (PROJ.fired){
    //these  lines increase GAME.t at an increasing rate, provided the trebuchet hasnt already rotated to its final position. Once it has, GAME.t stops incrementing
    GAME.t+=GAME.tv;
    GAME.tv+=GAME.ta*Math.sqrt(TREBUCHET.counterweight);

    if (GAME.t>Math.PI/2 - TREBUCHET.releaseAngle){//if the trebuchet is done rotating
      GAME.tv-=GAME.ta*Math.sqrt(TREBUCHET.counterweight);//make  GAME.t stop incrementing
      GAME.t-=GAME.tv;

      PROJ.x += PROJ.xv;//move the projectile in the x direction
      PROJ.yv += PROJ.ya;//accelerate the projectile downward
      PROJ.y += PROJ.yv;//move the projectile in the y direction
      if (PROJ.y>500-PROJ.rad){ //when it hits the ground, have it bounce off.
        PROJ.y =500-PROJ.rad
        PROJ.yv = -.3*PROJ.yv;
        if (PROJ.xv>0){//and slow it down while its touching the ground. this is friction basically
          PROJ.xv-=.2;
        }
        if (PROJ.xv<0){PROJ.xv=0}//prevents the projectile from turning around and going back lol
      }
    }
    else {//this controls the movement of the projectile before it leaves the grip of the trebuchet. it just moves it in a circle following the arm basically.
      PROJ.x = 70 -53.46*Math.cos(GAME.t+.1313);
      PROJ.y = 470- 53.46*Math.sin(GAME.t+.1313);
    }
  }
}

function renderProjectile(context) {
  if (!CONTROLS.zoomIn){//draws the projectile on the launch screen
  context.beginPath();
  context.moveTo(PROJ.x + 10, PROJ.y + 10);
  context.arc(PROJ.x, PROJ.y, PROJ.rad, 0, Math.PI * 2, true);
  context.fill();
}
  else{ //puts the projectile back when you switch to the design
  PROJ.x = 17;
  PROJ.y = 463;
  PROJ.fired = false;
}
}

function renderTreb(context, canvas){
  var plank = new Image();
  plank.src = 'plank.png'; //plonk
  if (CONTROLS.zoomIn){//if you're on the design screen
    GAME.t=0;//put everyting back to normal
    GAME.tv=0;
    //this stuff all draws the big trebuchet
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
    //draws the little text boxes
    weightInput.render(canvas);
    angleInput.render (canvas);
    //writes on the screen
    context.font = "30px Arial";
    context.fillText("Initial values are 45° and 100kg. \"Trebuchet\" will hold whatever the most recently ", 30, 100);
    context.fillText("inputted valid values are. Remember to click out of the text boxes before switching", 30, 140);
    context.fillText("back to the firing range. (Press [e] to return to Launch Screen)", 30, 180);


  }else{//if youre on the launch Screen, draw all the stuff
  drawRotatedImage(context, plank, 50, 470, 100, 30, GAME.t );
  context.fillStyle = "#B5651D";
  context.fillRect(50+40*Math.cos(GAME.t), 470+20*Math.sin(GAME.t), 10, 15);//draws the counterweight. might cause problems cuz it doesnt follow the circle very precisely
  context.beginPath();
  context.moveTo(50, 500);
  context.lineTo(70, 470);
  context.lineTo(90, 500);
  context.lineTo(50, 500);
  context.fill();
  context.fillStyle = "#000000";
  //if the launch is done, write on the screen
  if (PROJ.xv==0&&GAME.t!=0){
    context.font = "30px Arial";
    context.fillText("Press [e] to go to Design Screen", 370, 150);
  }
}
}

//this is how you put the rotated plank image on the screen. its centered somewhere super weird to accomodate for dean's ridiculous rule that the base must be 3.75/4.75 of the way along the arm
function drawRotatedImage(context, image, x, y, width, height, angle) {
  context.save();
  context.translate(x+20, y);
  context.rotate(angle);
  context.drawImage(image, (-width / 2)-20, -height / 2, width, height);
  context.restore();
  //To make this function work for top left, change translate(x, y) to translate(x+width/2, y+height/2)
  //Then, make the drawImage(image, 0, 0, width, height);
}

*/

/*
function runGame() {
//no touchy the rungame loop

  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');

  if (GAME.started) {


  }
  window.requestAnimationFrame(runGame);
}
window.requestAnimationFrame(runGame);
*/
