var EndStateActionMapper = function EndStateActionMapper() {
  "use strict";
};
($traceurRuntime.createClass)(EndStateActionMapper, {
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
  },
  handleMouseDown: function(event) {
    "use strict";
  }
}, {});
