function MovableComponent() {
  var speed = arguments[0] !== (void 0) ? arguments[0] : 0.1;
  var name = "MovableComponent";
  var newXpos = false;
  var newYpos = false;
  var newZpos = false;
  var path = {};
  var angle = 90;
  var lt = 0;
  var speed = speed;
  var acceleration = 5;
  return {
    name: name,
    newXpos: newXpos,
    newYpos: newYpos,
    newZpos: newZpos,
    path: path,
    angle: angle,
    lt: lt,
    speed: speed,
    acceleration: acceleration
  };
}
