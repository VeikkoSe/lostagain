var Layout = function Layout(xPos, yPos) {
  "use strict";
  var component = arguments[2] !== (void 0) ? arguments[2] : null;
  var size = arguments[3] !== (void 0) ? arguments[3] : 64;
  this.xPos = xPos;
  this.size = size;
  this.yPos = yPos;
  this.component = component;
  this.children = [];
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
    this.children.push(layout);
  }
}, {});
