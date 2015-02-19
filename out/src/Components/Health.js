var Health = function Health(amount, sprite) {
  "use strict";
  this.name = "Health";
  this.amount = amount;
  this.sprite = sprite;
};
($traceurRuntime.createClass)(Health, {}, {}, Component);
