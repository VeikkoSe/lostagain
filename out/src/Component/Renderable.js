var Renderable = function Renderable() {
  "use strict";
  var x = arguments[0] !== (void 0) ? arguments[0] : 0;
  var y = arguments[1] !== (void 0) ? arguments[1] : 0;
  var z = arguments[2] !== (void 0) ? arguments[2] : 0;
  var scale = arguments[3] !== (void 0) ? arguments[3] : 1;
  var angleX = arguments[4] !== (void 0) ? arguments[4] : 0;
  var angleY = arguments[5] !== (void 0) ? arguments[5] : 0;
  var angleZ = arguments[6] !== (void 0) ? arguments[6] : 0;
  this.name = "Renderable";
  this.xPos = x;
  this.yPos = y;
  this.zPos = z;
  this.angleX = angleX;
  this.angleY = angleY;
  this.angleZ = angleZ;
  this.scale = scale;
};
($traceurRuntime.createClass)(Renderable, {}, {}, Component);
