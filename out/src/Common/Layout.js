var Layout = function Layout(xPos, yPos) {
  "use strict";
  var parent = arguments[2] !== (void 0) ? arguments[2] : null;
  var component = arguments[3] !== (void 0) ? arguments[3] : null;
  this.parent = parent;
  this.xPos = xPos;
  this.yPos = yPos;
  this.component = component;
  this.children = null;
  this.rootX = null;
  this.rootY = null;
};
($traceurRuntime.createClass)(Layout, {
  getChildren: function() {
    "use strict";
    return this.children;
  },
  addChildren: function(layout) {
    "use strict";
    this.children = layout;
  }
}, {});
