var MenuStateActionMapper = function MenuStateActionMapper() {
  "use strict";
};
($traceurRuntime.createClass)(MenuStateActionMapper, {
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
    if (currentlyPressedKeys[32]) {
      game.stateEngine.changeState("loadtate");
    }
  },
  handleMouseDown: function(event) {
    "use strict";
  }
}, {});
