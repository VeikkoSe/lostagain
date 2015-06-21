function PrimitiveComponent(points) {
  var color = arguments[1] !== (void 0) ? arguments[1] : [0.0, 1.0, 0.0];
  var name = "PrimitiveComponent";
  var points = points;
  var color = color;
  return {
    name: name,
    points: points,
    color: color
  };
}
