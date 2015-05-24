var GasComponent = function GasComponent() {
  "use strict";
  var amount = arguments[0] !== (void 0) ? arguments[0] : 1;
  this.name = "GasComponent";
  this.amount = amount;
};
($traceurRuntime.createClass)(GasComponent, {}, {}, Component);
