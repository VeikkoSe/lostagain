var Game = function Game(canvas) {
  "use strict";
  this.map = new Hexagon(4);
  this.running = true;
  this.currentLevel = null;
  this.stateEngine = null;
  this.camera = new Camera();
  this.stateEngine = new StateEngine();
  this.stateEngine.changeState("introstate");
  this.tick();
};
($traceurRuntime.createClass)(Game, {tick: function() {
    "use strict";
    var that = this;
    requestAnimFrame(function() {
      that.tick();
    });
    if (loadManager.loadTotal == 0) {
      this.stateEngine.currentState.update();
      this.stateEngine.currentState.draw();
    }
  }}, {});
