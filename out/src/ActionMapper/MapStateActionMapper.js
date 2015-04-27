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
      game.stateEngine.changeState("gamestate");
    }
  },
  handleMouseDown: function(event) {
    "use strict";
  }
}, {});
