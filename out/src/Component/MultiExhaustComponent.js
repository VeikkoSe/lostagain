var MultiExhaustComponent = function MultiExhaustComponent() {
  "use strict";
  this.name = "MultiExhaustComponent";
  this.exhaustComponents = [];
};
($traceurRuntime.createClass)(MultiExhaustComponent, {addExhaust: function(exhaustComponent) {
    "use strict";
    this.exhaustComponents.push(exhaustComponent);
  }}, {}, Component);
