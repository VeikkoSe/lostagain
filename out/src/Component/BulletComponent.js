var BulletComponent = function BulletComponent(sprite) {
  "use strict";
  this.name = 'BulletComponent';
  this.birthTime = null;
  this.angle = 0;
  this.xPos = 0;
  this.yPos = 0;
  this.visible = 0;
  this.bulletModel = null;
  this.speed = 150;
  this.deathtime = 1500;
  this.sprite = sprite;
};
($traceurRuntime.createClass)(BulletComponent, {}, {}, Component);
