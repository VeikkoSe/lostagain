var ExhaustComponent = function ExhaustComponent(sprite) {
  "use strict";
  var length = arguments[1] !== (void 0) ? arguments[1] : 30;
  var width = arguments[2] !== (void 0) ? arguments[2] : 2;
  var offSetFromCenter = arguments[3] !== (void 0) ? arguments[3] : 0;
  var offSetSideFromCenter = arguments[4] !== (void 0) ? arguments[4] : 0;
  this.name = "ExhaustComponent";
  this.sprite = sprite;
  this.points = [];
  this.flow = [];
  this.length = length;
  this.width = width;
  this.offSetFromCenter = offSetFromCenter;
  this.texturecoordinates = [];
  this.square = [];
  this.offSetSideFromCenter = offSetSideFromCenter;
};
($traceurRuntime.createClass)(ExhaustComponent, {}, {}, Component);
