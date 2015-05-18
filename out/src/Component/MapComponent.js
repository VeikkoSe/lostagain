var MapComponent = function MapComponent(texture) {
  "use strict";
  this.name = "MapComponent";
  this.xGridWorldPos = 0;
  this.yGridWorldPos = 0;
  this.xPlayerPos = 0;
  this.yPlayerPos = 0;
  this.width = 0;
  this.height = 0;
  this.visited = {};
  this.holes = {};
  this.xEndBoss = 5;
  this.yEndBoss = 5;
  this.texture = texture;
};
($traceurRuntime.createClass)(MapComponent, {}, {}, Component);
