var ExhaustComponent = function ExhaustComponent(sprite) {
  "use strict";
  this.name = "ExhaustComponent";
  this.sprite = sprite;
  this.points = [];
  this.flow = [];
};
($traceurRuntime.createClass)(ExhaustComponent, {}, {}, Component);
