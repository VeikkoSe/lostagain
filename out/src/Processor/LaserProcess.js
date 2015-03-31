var LaserProcess = function LaserProcess() {
  "use strict";
  this.lastTime = 0;
  this.elapsedTotal = 0;
  this.x = 0;
  var points = [];
  points.push(-50, 0, 0);
  points.push(20, 0, 0);
  this.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
};
($traceurRuntime.createClass)(LaserProcess, {
  railXY: function(elapsed) {
    "use strict";
    var points = [];
    var y = 0;
    var z = 0;
    if (this.x < -150)
      this.x = 0;
    this.x = (elapsed * 0.05);
    points.push(0, y, z);
    points.push(this.x, y, z);
    return points;
  },
  draw: function() {
    "use strict";
    var points = [];
    points = this.railXY(-1500);
    camera.mvPushMatrix();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
    gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);
    gl.drawArrays(gl.LINES, 0, 2);
    camera.mvPopMatrix();
  }
}, {}, Processor);
