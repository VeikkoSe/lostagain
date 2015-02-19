var TwoDRenderProcess = function TwoDRenderProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $TwoDRenderProcess.prototype, arguments);
};
var $TwoDRenderProcess = TwoDRenderProcess;
($traceurRuntime.createClass)(TwoDRenderProcess, {
  simpleWorldToViewX: function(x) {
    "use strict";
    return x / screenWidth;
  },
  simpleWorldToViewY: function(y) {
    "use strict";
    return y / screenHeight;
  },
  draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.SpriteComponent && le.components.Renderable) {
        var sc = le.components.SpriteComponent;
        var rc = le.components.Renderable;
        camera.mvPushMatrix();
        gl.bindBuffer(gl.ARRAY_BUFFER, sc.sprite.pointStartPositionsBuffer);
        gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, sc.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sc.sprite.texture);
        gl.uniform1i(particleProgram.samplerUniform, 0);
        gl.uniform4f(particleProgram.colorUniform, 1, 1, 1, 1);
        gl.drawArrays(gl.POINTS, 0, 1);
        camera.mvPopMatrix();
      }
    }
  }
}, {}, Processor);
