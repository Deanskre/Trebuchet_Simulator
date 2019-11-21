//look, none of us know how config files work. im pretty sure all this stuff gets overwritten in Initializetrebuchet anyway


var GAME = {
  canvas : {
    width : 1200,
    height : 500
  },
  started : true,
  level : 1,
  t : 0,//this and the next two affect the rotation of the catapult
  tv: .05,
  ta: .001
};

var TREBUCHET = {
  counterweight: 10, //affects size of force on projectile
  releaseAngle: (Math.PI)/2.7 //affects angle that force makes with the horizontal
}

var PROJ ={
  x: 17,
  y: 463,
  rad: 5, //radius of projectile
  xv:0, //xspeed
  yv: 0, //yspeed
  ya: .2, //gravity
  fired : false
}
