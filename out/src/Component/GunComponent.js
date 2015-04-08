var GunComponent = function GunComponent() {
  "use strict";
  this.name = "GunComponent";
  this.shooting = false;
  this.activeWeapon = 1;
};
($traceurRuntime.createClass)(GunComponent, {}, {}, Component);
