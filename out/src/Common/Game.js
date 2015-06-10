var Game = function Game(canvas) {
  "use strict";
  this.running = true;
  this.currentLevel = null;
  this.stateEngine = null;
  this.camera = new Camera();
  this.stateEngine = new StateEngine();
  this.stateEngine.changeState("introstate");
  pub.subscribe("gameover", function(val) {
    game.stateEngine.changeState("endstate");
  });
  this.map = new Hexagon(4);
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
