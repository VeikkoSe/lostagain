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
    if (currentlyPressedKeys[77]) {
      game.stateEngine.changeState("loadstate");
    }
  },
  handleMouseDown: function(event) {
    "use strict";
  }
}, {});
