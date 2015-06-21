function VisibilityComponent(params) {
  var visibility = $traceurRuntime.assertObject(params).visibility;
  var name = "VisibilityComponent";
  return Object.freeze({
    name: name,
    visibility: visibility
  });
}
