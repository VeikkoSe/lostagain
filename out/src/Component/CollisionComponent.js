var CollisionComponent = function CollisionComponent() {
  "use strict";
  this.name = "CollisionComponent";
  this.xPos = null;
  this.yPos = null;
  this.zPos = null;
  this.xWidth = null;
  this.yWidth = null;
  this.zWidth = null;
};
($traceurRuntime.createClass)(CollisionComponent, {}, {}, Component);
