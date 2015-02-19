var TeleportProcess = function TeleportProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $TeleportProcess.prototype, arguments);
};
var $TeleportProcess = TeleportProcess;
($traceurRuntime.createClass)(TeleportProcess, {
  update: function(deltatime) {
    "use strict";
  },
  isInRectangle: function(centerX, centerY, radius, x, y) {
    "use strict";
    return x >= centerX - radius && x <= centerX + radius && y >= centerY - radius && y <= centerY + radius;
  }
}, {}, Processor);
