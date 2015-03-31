var GameState = function GameState(canvas) {
  "use strict";
  this.postProcessState = true;
  this.elapsedTotal = 0;
  this.megaElapsedTotal = 0;
  this.frameCount = 0;
  this.lastTime = 0;
};
($traceurRuntime.createClass)(GameState, {
  init: function() {
    "use strict";
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
  },
  update: function() {
    "use strict";
    actionMapper.handleKeys();
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
    camera.move();
    gl.useProgram(shaderProgram);
    gl.uniform1f(shaderProgram.alphaUniform, 1);
    gl.uniform1i(shaderProgram.uDrawColors, 0);
    this.simpleRenderProcess.draw();
    gl.useProgram(simplestProgram);
    this.primitiveProcess.draw();
    this.laserProcess.draw();
  },
  draw: function() {
    "use strict";
    camera.move();
    gl.useProgram(shaderProgram);
    gl.uniform1f(shaderProgram.alphaUniform, 1);
    gl.uniform1i(shaderProgram.uDrawColors, 0);
    for (var i = 0; i < es.length; es++) {
      es[$traceurRuntime.toProperty(i)].draw();
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
