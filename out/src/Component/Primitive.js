var PrimitiveComponent = function PrimitiveComponent(points) {
  "use strict";
  this.name = "PrimitiveComponent";
  this.points = points;
};
($traceurRuntime.createClass)(PrimitiveComponent, {}, {}, Component);
