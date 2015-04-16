var LoadState = function LoadState(canvas) {
  "use strict";
  this.elapsedTotal = 0;
  this.lastTime = 0;
  this.loadPercent = 0;
  this.rotationSpeed = 50;
  this.rotationAngle = 0;
  this.points = [];
  this.points.push(-0.5, 0, 0);
  this.points.push(0.5, 0, 0);
  this.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);
};
($traceurRuntime.createClass)(LoadState, {
  init: function(wantedState) {
    "use strict";
    this.sp = sm.init('simplest');
    this.elapsedTotal = 0;
    this.lastTime = 0;
    this.loadPercent = 0;
    this.rotationSpeed = 50;
    this.rotationAngle = 0;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    levelManager.loadAllAssets(wantedState);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.mvMatrix);
    mat4.translate(camera.mvMatrix, [0, 0, -10]);
  },
  draw: function() {
    "use strict";
    sm.setProgram(this.sp);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.points.push(-0.5, 0, 0);
    this.points.push(0.5, 0, 0);
    camera.mvPushMatrix();
    mat4.rotate(camera.mvMatrix, helpers.degToRad(this.rotationAngle), [0, 0, 1]);
    gl.uniformMatrix4fv(this.sp.uPMatrix, false, camera.pMatrix);
    gl.uniformMatrix4fv(this.sp.uMVMatrix, false, camera.mvMatrix);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.sp.aVertexPosition);
    gl.vertexAttribPointer(this.sp.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    var attribLocation = 1;
    gl.drawArrays(gl.LINES, 0, 2);
    camera.mvPopMatrix();
  },
  update: function() {
    "use strict";
    var timeNow = new Date().getTime();
    if (this.lastTime != 0) {
      var elapsed = timeNow - this.lastTime;
      this.elapsedTotal += elapsed;
      this.rotationAngle += (this.rotationSpeed * (elapsed / 1000));
      if (this.rotationAngle >= 360)
        this.rotationAngle = 0;
      if (this.elapsedTotal >= 200) {
        if (levelManager.loading == false && levelManager.loadTotal == 0) {
          game.stateEngine.changeState('gamestate');
        } else {
          this.loadPercent = 100 - (levelManager.loadTotal / levelManager.maxLoad * 100);
          this.rotationSpeed += this.loadPercent;
        }
        this.elapsedTotal -= 200;
      }
    }
    this.lastTime = timeNow;
  }
}, {}, StateEngine);
