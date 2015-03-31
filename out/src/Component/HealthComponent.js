var HealthComponent = function HealthComponent(amount) {
  "use strict";
  var sprite = arguments[1] !== (void 0) ? arguments[1] : null;
  this.name = "HealthComponent";
  this.amount = amount;
  this.sprite = sprite;
};
($traceurRuntime.createClass)(HealthComponent, {}, {}, Component);
