var PrimitiveComponent = function PrimitiveComponent(points) {
  "use strict";
  var color = arguments[1] !== (void 0) ? arguments[1] : [0.0, 1.0, 0.0];
  this.name = "PrimitiveComponent";
  this.points = points;
  this.color = color;
};
($traceurRuntime.createClass)(PrimitiveComponent, {}, {}, Component);
