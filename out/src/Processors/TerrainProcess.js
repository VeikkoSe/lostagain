var TerrainProcess = function TerrainProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $TerrainProcess.prototype, arguments);
};
var $TerrainProcess = TerrainProcess;
($traceurRuntime.createClass)(TerrainProcess, {draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.TerrainComponent) {
        var ftc = le.components.TerrainComponent;
        camera.mvPushMatrix();
        mat4.translate(camera.mvMatrix, [0, 0, 0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, ftc.terrain.vertexPositionBuffer);
        gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ftc.terrain.indexPositionBuffer);
        gl.drawElements(gl.TRIANGLES, ftc.terrain.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        camera.mvPopMatrix();
      }
    }
  }}, {}, Processor);
