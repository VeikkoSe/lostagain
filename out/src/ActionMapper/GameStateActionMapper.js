var GameStateActionMapper = function GameStateActionMapper() {
  "use strict";
};
($traceurRuntime.createClass)(GameStateActionMapper, {
  handleKeyDown: function(event) {
    "use strict";
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, true);
  },
  handleKeyUp: function(event) {
    "use strict";
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, false);
  },
  handleMouseWheel: function(event) {
    "use strict";
    var normalized;
    if (event.wheelDelta) {
      normalized = (event.wheelDelta % 120 - 0) == -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
    } else {
      var rawAmmount = event.deltaY ? event.deltaY : event.detail;
      normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
    }
    if (normalized == -1) {
      camera.distance += 10;
    }
    if (normalized == 1) {
      camera.distance -= 10;
    }
  },
  handleKeys: function() {
    "use strict";
    if (currentlyPressedKeys[49]) {
      levelManager.loadLevel('first');
      game.currentLevel = 'first';
    }
    if (currentlyPressedKeys[50]) {
      levelManager.loadLevel('second');
      game.currentLevel = 'second';
    }
    if (currentlyPressedKeys[51]) {
      levelManager.loadLevel('third');
      game.currentLevel = 'third';
    }
    if (currentlyPressedKeys[52]) {
      game.stateEngine.changeState("mapstate");
    }
    if (currentlyPressedKeys[77]) {
      game.stateEngine.changeState("mapstate");
    }
    var ms = em.getEntityByName('mothership');
    if (ms) {
      ms.components.MomentumMovable.rotateLeft = 0;
      ms.components.MomentumMovable.rotateRight = 0;
      ms.components.MomentumMovable.accelerationOn = 0;
      if (currentlyPressedKeys[87]) {
        ms.components.MomentumMovable.accelerationOn = 1;
      }
      if (currentlyPressedKeys[65]) {
        ms.components.MomentumMovable.rotateLeft = 1;
      }
      if (currentlyPressedKeys[68]) {
        ms.components.MomentumMovable.rotateRight = 1;
      }
    }
    var ship = em.getEntityByName('ship');
    if (ship) {
      ship.components.MomentumMovable.rotateLeft = 0;
      ship.components.MomentumMovable.rotateRight = 0;
      ship.components.MomentumMovable.accelerationOn = 0;
      ship.components.GunComponent.shooting = false;
      if (currentlyPressedKeys[38]) {
        ship.components.MomentumMovable.accelerationOn = 1;
      }
      if (currentlyPressedKeys[37]) {
        ship.components.MomentumMovable.rotateLeft = 1;
      }
      if (currentlyPressedKeys[39]) {
        ship.components.MomentumMovable.rotateRight = 1;
      }
      if (currentlyPressedKeys[32]) {
        ship.components.GunComponent.shooting = true;
      }
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
