var CollisionComponent = function CollisionComponent(group) {
  "use strict";
  this.name = "CollisionComponent";
  this.group = group;
  this.xPos = null;
  this.yPos = null;
  this.zPos = null;
  this.xWidth = null;
  this.yWidth = null;
  this.zWidth = null;
};
($traceurRuntime.createClass)(CollisionComponent, {}, {}, Component);
