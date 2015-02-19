var MeshComponent = function MeshComponent(mesh) {
  "use strict";
  var width = arguments[1] !== (void 0) ? arguments[1] : 1;
  this.name = "MeshComponent";
  this.mesh = mesh;
  this.width = width;
};
($traceurRuntime.createClass)(MeshComponent, {}, {}, Component);
