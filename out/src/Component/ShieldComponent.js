var ShieldComponent = function ShieldComponent(amount) {
  "use strict";
  var sprite = arguments[1] !== (void 0) ? arguments[1] : null;
  this.name = "ShieldComponent";
  this.amount = amount;
  this.sprite = sprite;
};
($traceurRuntime.createClass)(ShieldComponent, {}, {}, Component);
