function RenderableComponent(params) {
  var angleX = 0;
  var angleY = 0;
  var angleZ = 0;
  var $__0 = $traceurRuntime.assertObject(params),
      x = $__0.x,
      y = $__0.y,
      z = $__0.z,
      scale = $__0.scale,
      xWidth = $__0.xWidth,
      yWidth = $__0.yWidth,
      zWidth = $__0.zWidth;
  var name = "RenderableComponent";
  return Object.freeze({
    name: name,
    x: x,
    y: y,
    z: z,
    scale: scale,
    angleX: angleX,
    angleY: angleY,
    angleZ: angleZ,
    xWidth: xWidth,
    yWidth: yWidth,
    zWidth: zWidth
  });
}
