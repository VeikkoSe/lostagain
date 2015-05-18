var MapProcess = function MapProcess() {
  "use strict";
  this.vertexPositionBuffer = gl.createBuffer();
  this.simplestProgram = sm.init('simplest');
  this.hexagon = new Hexagon(1);
};
($traceurRuntime.createClass)(MapProcess, {
  update: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.MapComponent) {
        var mc = le.components.MapComponent;
        this.hexagon.updateArea(mc.holes, mc.visited, mc.xPlayerPos, mc.yPlayerPos);
      }
    }
  },
  draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.MapComponent) {
        var mc = le.components.MapComponent;
        sm.setProgram(this.simplestProgram);
        camera.mvPushMatrix();
        gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
        gl.uniform4f(this.simplestProgram.uColor, 1.0, 1.0, 1.0, 1.0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.hexagon.area), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.simplestProgram.aVertexPosition);
        gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, mc.texture);
        gl.uniform1i(this.simplestProgram.samplerUniform, 0);
        gl.drawArrays(gl.TRIANGLES, 0, this.hexagon.area.length / 3);
        camera.drawCalls++;
        camera.mvPopMatrix();
      }
    }
  }
}, {}, Processor);
