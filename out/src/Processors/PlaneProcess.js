var PlaneProcess = function PlaneProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $PlaneProcess.prototype, arguments);
};
var $PlaneProcess = PlaneProcess;
($traceurRuntime.createClass)(PlaneProcess, {draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.PlaneComponent) {
        var ftc = le.components.PlaneComponent;
        camera.mvPushMatrix();
        mat4.translate(camera.mvMatrix, [0, 0, 0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, ftc.plane.vertexPositionBuffer);
        gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ftc.plane.indexPositionBuffer);
        gl.drawElements(gl.LINES, ftc.plane.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        camera.mvPopMatrix();
      }
    }
  }}, {}, Processor);
