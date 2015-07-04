function JumpAreaComponent(buffer, pts, x, y, z, color) {
  var name = "JumpAreaComponent";
  var radius = 300;
  var pointAmount = 200;
  var xPos = x;
  var yPos = y;
  var zPos = z;
  var points = pts;
  var color = color;
  var visible = true;
  var vertexPositionBuffer = buffer;
  return {
    name: name,
    radius: radius,
    xPos: xPos,
    zPos: zPos,
    yPos: yPos,
    visible: visible,
    pointAmount: pointAmount,
    color: color,
    points: points,
    vertexPositionBuffer: vertexPositionBuffer
  };
}
