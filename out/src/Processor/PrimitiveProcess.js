var PrimitiveProcess = function PrimitiveProcess() {
  "use strict";
  this.vertexPositionBuffer = gl.createBuffer();
  this.simplestProgram = sm.init('simplest');
};
($traceurRuntime.createClass)(PrimitiveProcess, {
  circleXY: function(center, radius, dots) {
    "use strict";
    var points = [];
    var stepSize = ((2 * Math.PI) / dots);
    var y = 0;
    for (var d = 0; d <= (2 * Math.PI) - stepSize; d += stepSize) {
      points.push(((Math.sin(d) * radius) + center.x), y, (Math.cos(d) * radius) + center.z);
    }
    return points;
  },
  draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.JumpArea && le.components.Renderable) {
        sm.setProgram(this.simplestProgram);
        var re = le.components.Renderable;
        var p = {
          x: re.xPos,
          y: re.yPos,
          z: re.zPos
        };
        this.points = this.circleXY(p, le.components.JumpArea.radius, 200);
        camera.mvPushMatrix();
        gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.simplestProgram.aVertexPosition);
        gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINES, 0, this.points.length / 3);
        camera.drawCalls++;
        camera.mvPopMatrix();
      }
    }
  }
}, {}, Processor);
