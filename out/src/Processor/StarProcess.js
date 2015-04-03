var StarProcess = function StarProcess() {
  "use strict";
  this.pointStartPositionsBuffer = null;
  this.startPositions = [];
  this.colors = [];
  this.initBuffers();
  this.starProgram = sm.init('star');
};
($traceurRuntime.createClass)(StarProcess, {
  randomBetween: function(min, max) {
    "use strict";
    if (min < 0) {
      return min + Math.random() * (Math.abs(min) + max);
    } else {
      return min + Math.random() * max;
    }
  },
  initBuffers: function() {
    "use strict";
    var numParticles = 10000;
    var color = [1, 1, 1, 1];
    this.colors.push(color);
    var color = [1, 1, 1, 2];
    this.colors.push(color);
    var color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    this.colors.push(color);
    var color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    this.colors.push(color);
    for (var i = 0; i < numParticles; i++) {
      this.startPositions.push(this.randomBetween(-5000, 5000));
      this.startPositions.push(this.randomBetween(-5000, 5000));
      this.startPositions.push(this.randomBetween(-5000, 5000));
      this.startPositions.push(this.randomBetween(1, 1));
    }
    this.pointStartPositionsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);
    this.pointStartPositionsBuffer.numItems = numParticles;
  },
  draw: function() {
    "use strict";
    gl.useProgram(this.starProgram);
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.StarComponent) {
        camera.mvPushMatrix();
        gl.uniform3fv(this.starProgram.uCameraPos, [camera.x, camera.y, camera.z]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
        gl.vertexAttribPointer(this.starProgram.aVertexPosition, 3, gl.FLOAT, false, 16, 0);
        gl.vertexAttribPointer(this.starProgram.aPointSize, 1, gl.FLOAT, false, 16, 12);
        gl.uniformMatrix4fv(this.starProgram.uPMatrix, false, camera.pMatrix);
        gl.drawArrays(gl.POINTS, 0, this.pointStartPositionsBuffer.numItems);
        camera.mvPopMatrix();
      }
    }
  }
}, {}, Processor);
