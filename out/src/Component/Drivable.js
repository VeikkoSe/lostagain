var Drivable = function Drivable() {
  "use strict";
  this.name = "Drivable";
  this.accelerationOn = 0;
  this.acceleration = 20;
  this.velocityX = 0;
  this.velocityZ = 0;
  this.rotateRight = false;
  this.rotateLeft = false;
};
($traceurRuntime.createClass)(Drivable, {}, {}, Component);
