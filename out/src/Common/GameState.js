var GameState = function GameState(canvas) {
  "use strict";
  this.renderProcess = new RenderProcess();
  this.simpleRenderProcess = new SimpleRenderProcess();
  this.planeProcess = new PlaneProcess();
  this.healthProcess = new HealthProcess();
  this.shieldProcess = new ShieldProcess();
  this.textProcess = new TextProcess();
  this.linearMovementProcess = new LinearMovementProcess();
  this.momentumMovementProcess = new MomentumMovementProcess();
  this.cameraControllerProcess = new CameraControllerProcess();
  this.primitiveProcess = new PrimitiveProcess();
  this.teleportProcess = new TeleportProcess();
  this.starProcess = new StarProcess();
  this.enemyProcess = new EnemyProcess();
  this.gunProcess = new GunProcess();
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
    simplestProgram = initSimplestShaders("simplest");
    shaderProgram = initShaders("per-fragment-lighting");
    ambientProgram = initAmbientShaders('ambient');
    starProgram = initStarShaders('star');
    fontProgram = initFontShaders("font");
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    this.ef.createFuel();
    this.ef.createMotherShip();
    this.ef.createShip();
    this.ef.createEnemy();
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
  },
  animate: function() {
    "use strict";
    var timeNow = new Date().getTime();
    this.frameCount++;
    if (this.lastTime != 0) {
      var elapsed = timeNow - this.lastTime;
      this.elapsedTotal += elapsed;
      this.teleportProcess.update(elapsed);
      this.linearMovementProcess.update(elapsed);
      this.momentumMovementProcess.update(elapsed);
      this.cameraControllerProcess.update(elapsed);
      this.enemyProcess.update(elapsed);
      this.simpleRenderProcess.update(elapsed);
      this.textProcess.update(elapsed);
      this.gunProcess.update(elapsed);
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
        $traceurRuntime.setProperty(v1, g++, 0);
        $traceurRuntime.setProperty(v1, g++, 0);
        $traceurRuntime.setProperty(v1, g++, 0);
        $traceurRuntime.setProperty(v1, g++, 0);
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
    camera.move();
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(shaderProgram);
    gl.bindFramebuffer(gl.FRAMEBUFFER, picker.framebuffer);
    gl.uniform1i(shaderProgram.uDrawColors, 1);
    this.simpleRenderProcess.draw();
    gl.uniform1f(shaderProgram.alphaUniform, 1);
    gl.uniform1i(shaderProgram.uDrawColors, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.simpleRenderProcess.draw();
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(starProgram);
    this.starProcess.draw();
    gl.useProgram(simplestProgram);
    this.primitiveProcess.draw();
    gl.useProgram(particleProgram);
    this.healthProcess.draw();
    this.shieldProcess.draw();
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    this.gunProcess.draw();
    gl.useProgram(fontProgram);
    this.textProcess.draw();
  }
}, {}, StateEngine);
