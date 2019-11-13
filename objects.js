function Image (file, x, y, w, h) {
  this.file = file;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

function Vector (x, y) {
  this.x = x;
  this.y = y;
  this.magnitude = function() {
    return Math.sqrt(x*x + y*y);
  }
  this.angle = function() {
    return Math.arctan(y/x);
  }
}

function AngularVector (v, a) {
  this.magnitude = v;
  this.angle = a;
  this.x = function() {
    return this.v*Math.cos(this.a);
  }
  this.y = function() {
    return this.v*Math.sin(this.a);
  }
}

function Object (image, relX, relY) {
  this.image = image;
  this.relX = relX;
  this.relY = relY;

  this.x = function() {
    return this.image.x + (this.image.relX)/(this.image.w);
  }
  this.y = function() {
    return this.image.y + (this.image.relY)/(this.image.y)
  }

  this.rotate = function(stuff) {
    stuff
  }

}

function PhysicalBody (object, mass, center) {
  this.object = object; //Image object
  this.mass = mass;
  this.center = center;
  this.initialized = false;

  this.velocity; //velocity = [horizontalVelocity, ]

  this.initialize = function(velocity) {
  }
/*
  this.rotate = function(cx, cy, x, y, angle) {
      var radians = (Math.PI / 180) * angle,
          cos = Math.cos(radians),
          sin = Math.sin(radians),
          nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
          ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
  }*/

  this.calculateTrajectory = function() {
    when you press launch, this method is called for every body, and it calculates all the positions so that you get 30fps by putting all the positions in an array. then the program renders every body by going through the trajectory array and rendering stuff at their positions at that time.
  }

  // RotateAroundOrigin
  // x, y     :   The coordinates of point to be rotatedPoint
  // angle    :   Angle in degrees of rotation
  /*function RotateAroundOrigin(x, y, angle) {
    return Rotate(0, 0, x, y, angle);
  }

  /**  RenderSpaceship
   *
   *  Renders all spaceship points after adjusting them for the rotation and position
   *    in space
   */
   /*
    function RenderSpaceship(context) {
    if (!initialized) {
      return;
    }

    // Move to the point where drawing will start
    var rotatedPoint = RotateAroundOrigin(
      SPACE_SHIP.positions[0].x,
      SPACE_SHIP.positions[0].y,
      SPACE_SHIP.rotation
    );
    context.moveTo(SPACE_SHIP.x + rotatedPoint[0],SPACE_SHIP.y +  rotatedPoint[1]);
    SPACE_SHIP.latest.x = SPACE_SHIP.x + rotatedPoint[0];
    SPACE_SHIP.latest.y = SPACE_SHIP.y + rotatedPoint[1];
    // Begin rendering the space ship points (rotating them each time)
    context.beginPath();
    for (var i = 0; i < SPACE_SHIP.positions.length; i++) {
      var rotatedPoint = RotateAroundOrigin(
        SPACE_SHIP.positions[i].x,
        SPACE_SHIP.positions[i].y,
        SPACE_SHIP.rotation
      );
      context.lineTo(
        SPACE_SHIP.x + (rotatedPoint[0] * SPACE_SHIP.scale),
        SPACE_SHIP.y + (rotatedPoint[1] * SPACE_SHIP.scale)
      );
    }
    context.lineWidth = 1;
    context.stroke();
  }
  */
}

function Lever(body) {
}

function Projectile(body) {
}

function Block(body) {
}
