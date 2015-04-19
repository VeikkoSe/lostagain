var Renderable = function Renderable() {
  "use strict";
  var x = arguments[0] !== (void 0) ? arguments[0] : 0;
  var y = arguments[1] !== (void 0) ? arguments[1] : 0;
  var z = arguments[2] !== (void 0) ? arguments[2] : 0;
  var scale = arguments[3] !== (void 0) ? arguments[3] : 1;
  var angleX = arguments[4] !== (void 0) ? arguments[4] : 0;
  var angleY = arguments[5] !== (void 0) ? arguments[5] : 0;
  var angleZ = arguments[6] !== (void 0) ? arguments[6] : 0;
  var xWidth = arguments[7] !== (void 0) ? arguments[7] : 30;
  var yWidth = arguments[8] !== (void 0) ? arguments[8] : 30;
  var zWidth = arguments[9] !== (void 0) ? arguments[9] : 30;
  this.name = "Renderable";
  this.xPos = x;
  this.yPos = y;
  this.zPos = z;
  this.angleX = angleX;
  this.angleY = angleY;
  this.angleZ = angleZ;
  this.xWidth = xWidth;
  this.yWidth = yWidth;
  this.zWidth = zWidth;
  this.scale = scale;
};
($traceurRuntime.createClass)(Renderable, {}, {}, Component);
