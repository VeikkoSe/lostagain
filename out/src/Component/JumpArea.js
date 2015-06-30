function JumpAreaController(x, y, z, color) {
  var name = "JumpAreaController";
  var radius = 300;
  var pointAmount = 200;
  var xPos = x;
  var yPos = y;
  var zPos = z;
  var points = circleXY({
    x: xPos,
    y: yPos,
    z: zPos
  }, radius, pointAmount);
  var color = color;
  var visible = false;
  return {};
}
