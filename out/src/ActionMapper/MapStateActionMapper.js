var MapStateActionMapper = function MapStateActionMapper() {
  "use strict";
};
($traceurRuntime.createClass)(MapStateActionMapper, {
  handleKeyDown: function(event) {
    "use strict";
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, true);
  },
  handleKeyUp: function(event) {
    "use strict";
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, false);
  },
  handleKeys: function() {
    "use strict";
    if (currentlyPressedKeys[49]) {
      loadManager.loadLevel('first');
      game.currentLevel = 'first';
    }
    if (currentlyPressedKeys[50]) {
      loadManager.loadLevel('second');
      game.currentLevel = 'second';
    }
    if (currentlyPressedKeys[51]) {
      loadManager.loadLevel('third');
      game.currentLevel = 'third';
    }
    if (currentlyPressedKeys[52]) {
      game.stateEngine.changeState("mapstate");
    }
    var ms = em.getEntityByName('baremothership');
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
    if (currentlyPressedKeys[77]) {
      game.stateEngine.changeState("gamestate");
    }
  },
  handleMouseDown: function(event) {
    "use strict";
  }
}, {});
