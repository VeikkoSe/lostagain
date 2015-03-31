var StarProcess = function StarProcess() {
  "use strict";
  this.pointStartPositionsBuffer = null;
  this.startPositions = [];
  this.colors = [];
  this.initBuffers();
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
      this.startPositions.push(this.randomBetween(1, 2));
    }
    this.pointStartPositionsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);
    this.pointStartPositionsBuffer.numItems = numParticles;
  },
  draw: function() {
    "use strict";
    camera.mvPushMatrix();
    gl.uniform3fv(starProgram.uCameraPos, [camera.x, camera.y, camera.z]);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
    gl.vertexAttribPointer(starProgram.aVertexPosition, 3, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(starProgram.aPointSize, 1, gl.FLOAT, false, 16, 12);
    gl.uniformMatrix4fv(starProgram.uPMatrix, false, camera.pMatrix);
    gl.drawArrays(gl.POINTS, 0, this.pointStartPositionsBuffer.numItems);
    camera.mvPopMatrix();
  }
}, {}, Processor);
