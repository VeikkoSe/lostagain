var MapState = function MapState(canvas) {
  "use strict";
  this.wall = null;
  this.processList = [];
  this.frameCount = 0;
  this.lastTime = 0;
  this.elapsedTotal = 0;
};
($traceurRuntime.createClass)(MapState, {
  draw: function() {
    "use strict";
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    camera.move();
    for (var i = 0; i < this.processList.length; i++) {
      this.processList[$traceurRuntime.toProperty(i)].draw();
    }
    camera.drawCalls = 0;
  },
  init: function() {
    "use strict";
    actionMapper = new MapStateActionMapper();
    document.onkeydown = actionMapper.handleKeyDown;
    document.onkeyup = actionMapper.handleKeyUp;
    document.onmousemove = actionMapper.handleMouseMove;
    document.onmousedown = actionMapper.handleMouseDown;
    this.processList = [];
    this.processList.push(new RenderProcess());
    this.processList.push(new StarProcess());
    this.processList.push(new MapProcess());
    this.processList.push(new MomentumMovementProcess());
    camera.setPos(0, 0, 0, 45);
    camera.setDistance(50);
    ef.createMap();
    ef.createBareMotherShip();
    ef.createStars();
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.mvMatrix);
  },
  update: function() {
    "use strict";
    var timeNow = new Date().getTime();
    actionMapper.handleKeys();
    this.frameCount++;
    if (this.lastTime != 0) {
      var elapsed = timeNow - this.lastTime;
      this.elapsedTotal += elapsed;
      for (var i = 0; i < this.processList.length; i++) {
        this.processList[$traceurRuntime.toProperty(i)].update(elapsed, false);
      }
    }
    this.lastTime = timeNow;
  },
  cleanup: function() {
    "use strict";
    document.onkeydown = null;
    document.onkeyup = null;
    document.onmousemove = null;
    document.onmousedown = null;
    actionMapper = null;
    currentlyPressedKeys = {};
    em.clearAll();
  }
}, {}, StateEngine);
