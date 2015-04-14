var ShieldProcess = function ShieldProcess() {
  "use strict";
  this.particleProgram = sm.init('particle');
};
($traceurRuntime.createClass)(ShieldProcess, {
  simpleWorldToViewX: function(x) {
    "use strict";
    return x / screenWidth;
  },
  simpleWorldToViewY: function(y) {
    "use strict";
    return y / screenHeight;
  },
  draw: function() {
    "use strict";
  }
}, {}, Processor);
