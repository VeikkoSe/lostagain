function ExhaustComponent(sprite) {
  var length = arguments[1] !== (void 0) ? arguments[1] : 30;
  var width = arguments[2] !== (void 0) ? arguments[2] : 2;
  var offSetFromCenter = arguments[3] !== (void 0) ? arguments[3] : 0;
  var offSetSideFromCenter = arguments[4] !== (void 0) ? arguments[4] : 0;
  var name = "ExhaustComponent";
  var sprite = sprite;
  var points = [];
  var flow = [];
  var length = length;
  var width = width;
  var offSetFromCenter = offSetFromCenter;
  var texturecoordinates = [];
  var square = [];
  var offSetSideFromCenter = offSetSideFromCenter;
  return {
    name: name,
    flow: flow,
    points: points
  };
}
