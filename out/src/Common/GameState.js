var GameState = function GameState(canvas) {
  "use strict";
  this.renderProcess = new RenderProcess();
  this.simpleRenderProcess = new SimpleRenderProcess();
  this.planeProcess = new PlaneProcess();
  this.healthProcess = new HealthProcess();
  this.shieldProcess = new ShieldProcess();
  this.linearMovementProcess = new LinearMovementProcess();
  this.momentumMovementProcess = new MomentumMovementProcess();
  this.cameraControllerProcess = new CameraControllerProcess();
  this.primitiveProcess = new PrimitiveProcess();
  this.ef = new EntityFactory();
  this.elapsedTotal = 0;
  this.megaElapsedTotal = 0;
  this.frameCount = 0;
  this.lastTime = 0;
};
($traceurRuntime.createClass)(GameState, {
  init: function() {
    "use strict";
    particleProgram = initParticleShaders("particle");
    shaderProgram = initShaders("per-fragment-lighting");
    ambientProgram = initAmbientShaders('ambient');
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    this.ef.createMotherShip();
    this.ef.createShip();
    this.ef.createBox();
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 5000.0, camera.pMatrix);
    mat4.identity(camera.mvMatrix);
    mat4.translate(camera.mvMatrix, [camera.x, camera.y, camera.z]);
  },
  animate: function() {
    "use strict";
    var timeNow = new Date().getTime();
    this.frameCount++;
    if (this.lastTime != 0) {
      var elapsed = timeNow - this.lastTime;
      this.elapsedTotal += elapsed;
      this.linearMovementProcess.update(elapsed);
      this.momentumMovementProcess.update(elapsed);
      this.cameraControllerProcess.update(elapsed);
      this.createTexture(elapsed);
      actionMapper.handleKeys();
      if (this.elapsedTotal >= 1000) {
        var fps = this.frameCount;
        this.frameCount = 0;
        this.elapsedTotal -= 1000;
        if (fps < 59)
          document.getElementById('fps').style.color = 'red';
        else
          document.getElementById('fps').style.color = 'green';
        document.getElementById('fps').innerHTML = fps;
      }
    }
    this.lastTime = timeNow;
  },
  randomIntFromInterval: function(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  createTexture: function(elapsed) {
    "use strict";
    this.megaElapsedTotal += elapsed;
    if (this.megaElapsedTotal > 1000 || monstermap == null) {
      this.megaElapsedTotal = 0;
      var b = new ArrayBuffer(128 * 128 * 4);
      var v1 = new Uint8Array(b);
      var g = 0;
      for (var i = 0; i < 128 * 128; i++) {
        if (this.randomIntFromInterval(0, 1) == 1) {
          $traceurRuntime.setProperty(v1, g++, 255);
          $traceurRuntime.setProperty(v1, g++, 255);
          $traceurRuntime.setProperty(v1, g++, 255);
          $traceurRuntime.setProperty(v1, g++, 255);
        } else {
          $traceurRuntime.setProperty(v1, g++, 0);
          $traceurRuntime.setProperty(v1, g++, 0);
          $traceurRuntime.setProperty(v1, g++, 0);
          $traceurRuntime.setProperty(v1, g++, 0);
        }
      }
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA, gl.UNSIGNED_BYTE, v1);
      gl.generateMipmap(gl.TEXTURE_2D);
      monstermap = texture;
    }
  },
  render: function() {
    "use strict";
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.identity(camera.mvMatrix);
    mat4.translate(camera.mvMatrix, [camera.x, camera.y, camera.z]);
    gl.useProgram(shaderProgram);
    gl.uniform1i(shaderProgram.uDrawColors, 0);
    this.simpleRenderProcess.draw();
    gl.useProgram(ambientProgram);
    gl.uniformMatrix4fv(ambientProgram.uPMatrix, false, camera.pMatrix);
    gl.uniform3fv(ambientProgram.uCameraPos, [camera.x, camera.y, camera.z]);
    this.renderProcess.draw();
    gl.useProgram(particleProgram);
    this.healthProcess.draw();
    this.shieldProcess.draw();
  },
  drawScene: function() {
    "use strict";
  }
}, {}, StateEngine);
