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
    var map = em.getEntityByName('map');
    if (map) {
      map.components.MapComponent.movingUp = 0;
      map.components.MapComponent.movingLeft = 0;
      map.components.MapComponent.movingRight = 0;
      map.components.MapComponent.movingDown = 0;
      map.components.MapComponent.selecting = false;
      if (currentlyPressedKeys[87]) {
        map.components.MapComponent.movingUp = 1;
      }
      if (currentlyPressedKeys[65]) {
        map.components.MapComponent.movingLeft = 1;
      }
      if (currentlyPressedKeys[68]) {
        map.components.MapComponent.movingRight = 1;
      }
      if (currentlyPressedKeys[83]) {
        map.components.MapComponent.movingDown = 1;
      }
      if (currentlyPressedKeys[32]) {
        map.components.MapComponent.selecting = true;
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
