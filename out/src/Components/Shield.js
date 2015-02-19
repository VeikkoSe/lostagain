var Shield = function Shield(amount, sprite) {
  "use strict";
  this.name = "Shield";
  this.amount = amount;
  this.sprite = sprite;
};
($traceurRuntime.createClass)(Shield, {}, {}, Component);
