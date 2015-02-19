var ActionMapper = function ActionMapper() {
  "use strict";
  this.shooting = 0;
  this.shipmode = 0;
};
($traceurRuntime.createClass)(ActionMapper, {
  handleKeyDown: function(event) {
    "use strict";
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, true);
  },
  handleKeyUp: function(event) {
    "use strict";
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, false);
  },
  handleKeys: function(elapsed) {
    "use strict";
    if (currentlyPressedKeys[38]) {
      game.stateEngine.gameState.ship.setAccelerationOn(elapsed);
    }
    if (currentlyPressedKeys[40]) {}
    if (currentlyPressedKeys[37]) {
      game.stateEngine.gameState.ship.rotateShipLeft(elapsed);
    }
    if (currentlyPressedKeys[39]) {
      game.stateEngine.gameState.ship.rotateShipRight(elapsed);
    }
    if (currentlyPressedKeys[32]) {
      game.stateEngine.gameState.gun.shootBullet(elapsed);
    }
  },
  getMousePos: function(canvas, evt) {
    "use strict";
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  },
  handleMouseDown: function(event) {
    "use strict";
    if (!actionMapper.setPicking(event))
      actionMapper.setClickPosition(event);
  },
  setPicking: function(event) {
    "use strict";
    var x = helpers.mouseX(event);
    var y = resolutionHeight - helpers.mouseY(event);
    if (x < 0)
      x = 0;
    if (x > resolutionWidth)
      x = resolutionWidth;
    if (y < 0)
      y = 0;
    if (y > resolutionHeight)
      y = resolutionHeight;
    if (picker.findAndSet([x, y]))
      return true;
    return false;
  },
  setClickPosition: function(event) {
    "use strict";
    var x = (helpers.mouseX(event) - resolutionWidth / 2) / (resolutionWidth / 2);
    var y = -(helpers.mouseY(event) - resolutionHeight / 2) / (resolutionHeight / 2);
    var viewportArray = [0, 0, resolutionWidth, resolutionHeight];
    var modelPointArrayResultsNear = [];
    var success = GLU.unProject(x, y, 0, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsNear);
    var modelPointArrayResultsFar = [];
    var success = GLU.unProject(x, y, 1, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsFar);
    camera.clickPosition = intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);
  },
  getCenterPosition: function() {
    "use strict";
    var x = 0;
    var y = 0;
    var viewportArray = [0, 0, resolutionWidth, resolutionHeight];
    var modelPointArrayResultsNear = [];
    var success = GLU.unProject(x, y, 0, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsNear);
    var modelPointArrayResultsFar = [];
    var success = GLU.unProject(x, y, 1, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsFar);
    return intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);
  },
  handleMouseMove: function(e) {
    "use strict";
    var x = helpers.mouseX(e);
    var y = helpers.mouseY(e);
    camera.slideLeft = false;
    camera.slideRight = false;
    camera.slideUp = false;
    camera.slideDown = false;
    if ($('#controlEdgeMovement').prop('checked')) {
      if (x < 20) {
        camera.slideLeft = true;
      }
      if (x > (resolutionWidth - 20)) {
        camera.slideRight = true;
      }
      if (y < 20) {
        camera.slideUp = true;
      }
      if (y > (resolutionHeight - 20)) {
        camera.slideDown = true;
      }
    }
  }
}, {});
