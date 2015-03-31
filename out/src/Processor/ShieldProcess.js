var ShieldProcess = function ShieldProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $ShieldProcess.prototype, arguments);
};
var $ShieldProcess = ShieldProcess;
($traceurRuntime.createClass)(ShieldProcess, {
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
      if (le.components.ShieldComponent) {
        var shield = le.components.ShieldComponent;
        for (var g = 0; g < shield.amount; g++) {
          camera.mvPushMatrix();
          gl.uniform3f(particleProgram.positionUniform, g / 30, 0, 0);
          gl.bindBuffer(gl.ARRAY_BUFFER, shield.sprite.pointStartPositionsBuffer);
          gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, shield.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, shield.sprite.texture);
          gl.uniform1i(particleProgram.samplerUniform, 0);
          gl.uniform1f(particleProgram.pointSize, 16.0);
          gl.uniform4f(particleProgram.colorUniform, 1, 1, 1, 1);
          gl.drawArrays(gl.POINTS, 0, 1);
          camera.mvPopMatrix();
        }
      }
    }
  }
}, {}, Processor);
