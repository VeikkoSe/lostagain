function RenderableComponent(params) {
  var angleX = 0;
  var angleY = 0;
  var angleZ = 0;
  var $__0 = $traceurRuntime.assertObject(params),
      xPos = $__0.xPos,
      yPos = $__0.yPos,
      zPos = $__0.zPos,
      scale = $__0.scale,
      xWidth = $__0.xWidth,
      yWidth = $__0.yWidth,
      zWidth = $__0.zWidth;
  var name = "RenderableComponent";
  return {
    name: name,
    xPos: xPos,
    yPos: yPos,
    zPos: zPos,
    scale: scale,
    angleX: angleX,
    angleY: angleY,
    angleZ: angleZ,
    xWidth: xWidth,
    yWidth: yWidth,
    zWidth: zWidth
  };
}
