var PhotonTorpedo = function PhotonTorpedo() {
  "use strict";
  this.birthTime = null;
  this.angle = 0;
  this.yPos = 0;
  this.zPos = 0;
  this.visible = 0;
  this.speed = 100;
  this.deathtime = 1500;
};
($traceurRuntime.createClass)(PhotonTorpedo, {}, {});
