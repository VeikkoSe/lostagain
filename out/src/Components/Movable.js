var Movable = function Movable() {
  "use strict";
  var speed = arguments[0] !== (void 0) ? arguments[0] : 0.1;
  this.name = "Movable";
  this.newXpos = false;
  this.newYpos = false;
  this.newZpos = false;
  this.path = {};
  this.angle = 90;
  this.lt = 0;
  this.speed = speed;
  this.acceleration = 5;
};
($traceurRuntime.createClass)(Movable, {}, {}, Component);
