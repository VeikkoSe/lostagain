function MomentumComponent(params) {
  var $__0 = $traceurRuntime.assertObject(params),
      speed = $__0.speed,
      turnSpeed = $__0.turnSpeed,
      routeEndXpos = $__0.routeEndXpos,
      routeEndYpos = $__0.routeEndYpos,
      routeEndZpos = $__0.routeEndZpos;
  var name = "MomentumComponent";
  var lt = 0;
  var turnSpeed = turnSpeed;
  var speed = speed;
  var acceleration = 50;
  var accelerationOn = 0;
  var rotateLeft = 0;
  var rotateRight = 0;
  var velocityX = 0;
  var velocityZ = 0;
  return Object.freeze({
    name: name,
    lt: lt,
    turnSpeed: turnSpeed,
    speed: speed,
    acceleration: acceleration,
    accelerationOn: accelerationOn,
    rotateLeft: rotateLeft,
    rotateRight: rotateRight,
    velocityX: velocityX,
    velocityZ: velocityZ
  });
}
