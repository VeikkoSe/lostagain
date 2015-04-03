var GameState = function GameState(canvas) {
  "use strict";
  this.postProcessState = true;
  this.elapsedTotal = 0;
  this.megaElapsedTotal = 0;
  this.frameCount = 0;
  this.lastTime = 0;
  this.currentLevel = null;
  this.processList = [];
  this.processList.push(new RenderProcess());
  this.processList.push(new HealthProcess());
  this.processList.push(new ShieldProcess());
  this.processList.push(new TextProcess());
  this.processList.push(new LinearMovementProcess());
  this.processList.push(new MomentumMovementProcess());
  this.processList.push(new CameraControllerProcess());
  this.processList.push(new PrimitiveProcess());
  this.processList.push(new TeleportProcess());
  this.processList.push(new StarProcess());
  this.processList.push(new EnemyProcess());
  this.processList.push(new LaserProcess());
  this.shaderProgram = null;
};
($traceurRuntime.createClass)(GameState, {
  init: function() {
    "use strict";
    if (game.currentLevel == null) {
      levelManager.loadLevel('first');
      game.currentLevel = 'first';
      return;
    }
    actionMapper = new GameStateActionMapper();
    document.onkeydown = actionMapper.handleKeyDown;
    document.onkeyup = actionMapper.handleKeyUp;
    document.onmousemove = actionMapper.handleMouseMove;
    document.onmousedown = actionMapper.handleMouseDown;
    var event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    window.addEventListener(event, this.handleMouseWheel);
    gl.enable(gl.CULL_FACE);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.mvMatrix);
    mat4.translate(camera.mvMatrix, [0, 0, -300]);
  },
  update: function() {
    "use strict";
    var timeNow = new Date().getTime();
    this.frameCount++;
    if (this.lastTime != 0) {
      var elapsed = timeNow - this.lastTime;
      this.elapsedTotal += elapsed;
      for (var i = 0; i < this.processList.length; i++) {
        this.processList[$traceurRuntime.toProperty(i)].update(elapsed);
      }
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
  drawAll: function() {
    "use strict";
  },
  draw: function() {
    "use strict";
    camera.move();
    for (var i = 0; i < this.processList.length; i++) {
      this.processList[$traceurRuntime.toProperty(i)].draw();
    }
  },
  cleanup: function() {
    "use strict";
    document.onkeydown = null;
    document.onkeyup = null;
    document.onmousemove = null;
    document.onmousedown = null;
    actionMapper = null;
    currentlyPressedKeys = {};
  }
}, {}, StateEngine);
