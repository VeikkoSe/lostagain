var LayoutProcess = function LayoutProcess() {
  "use strict";
  this.particleProgram = sm.init('particle');
};
($traceurRuntime.createClass)(LayoutProcess, {
  simpleWorldToViewX: function(x) {
    "use strict";
    return x / resolutionWidth;
  },
  simpleWorldToViewY: function(y) {
    "use strict";
    return y / resolutionHeight;
  },
  recursiveLayout: function(lloop) {
    "use strict";
    for (var i = 0; i < lloop.length; i++) {
      if (lloop.xPos < 1 && lloop.yPos < 1 && lloop.rootX == null && lloop.rootY == null) {
        lloop.rootX = simpleWorldToViewX(lloop.xPos);
        lloop.rootY = simpleWorldToViewX(lloop.yPos);
      } else {
        return false;
      }
      if (lloop.sprite) {}
      if (lloop[$traceurRuntime.toProperty(i)].children.length > 0) {
        this.recursiveLayout(lloop[$traceurRuntime.toProperty(i)].children);
      }
    }
  },
  draw: function() {
    "use strict";
    this.recursiveLayout(lm);
  }
}, {}, Processor);
