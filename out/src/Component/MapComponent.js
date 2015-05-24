var MapComponent = function MapComponent() {
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
  this.movingUp = 0;
  this.movingDown = 0;
  this.movingLeft = 0;
  this.movingRight = 0;
};
($traceurRuntime.createClass)(MapComponent, {}, {}, Component);
