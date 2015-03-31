var ConstantRotation = function ConstantRotation() {
  "use strict";
  var x = arguments[0] !== (void 0) ? arguments[0] : null;
  var y = arguments[1] !== (void 0) ? arguments[1] : null;
  var z = arguments[2] !== (void 0) ? arguments[2] : null;
  this.x = x;
  this.y = y;
  this.z = z;
  this.name = "ConstantRotation";
};
($traceurRuntime.createClass)(ConstantRotation, {}, {}, Component);
