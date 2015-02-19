var PlainComponent = function PlainComponent(terrain) {
  "use strict";
  this.name = "TerrainComponent";
  this.terrain = terrain;
};
($traceurRuntime.createClass)(PlainComponent, {}, {}, Component);
