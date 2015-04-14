var Layout = function Layout(xPos, yPos) {
  "use strict";
  var sprite = arguments[2] !== (void 0) ? arguments[2] : null;
  var component = arguments[3] !== (void 0) ? arguments[3] : null;
  var size = arguments[4] !== (void 0) ? arguments[4] : 64;
  this.sprite = sprite;
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
