var ExhaustComponent = function ExhaustComponent(sprite) {
  "use strict";
  this.name = "ExhaustComponent";
  this.sprite = sprite;
  this.points = [];
  this.flow = [];
  this.square = [];
};
($traceurRuntime.createClass)(ExhaustComponent, {}, {}, Component);
