var GAME = {
  canvas : {
    width : 1200,
    height : 400
  },
  started : true,
  level : 1,
  t : 0,
  tv: .05,
  ta: .001
};

var TREBUCHET = {
  counterweight: 10,
  releaseAngle: (Math.PI)/2.7
}

var PROJ ={
  x: 17,
  y: 463,
  rad: 5,
  xv:0,
  yv: 0,
  ya: .2,
  fired : false
}
