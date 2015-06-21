function MeshComponent(params) {
  var $__0 = $traceurRuntime.assertObject(params),
      mesh = $__0.mesh,
      width = $__0.width;
  var name = "MeshComponent";
  return Object.freeze({
    name: name,
    mesh: mesh,
    width: width
  });
}
