var IntroStateActionMapper = function IntroStateActionMapper() {
  "use strict";
};
($traceurRuntime.createClass)(IntroStateActionMapper, {
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
      game.stateEngine.changeState("gamestate");
    }
  },
  handleMouseDown: function(event) {
    "use strict";
    game.stateEngine.changeState("gamestate");
  }
}, {});
