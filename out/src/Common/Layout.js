function layout_constructor() {
  var xPos = xPos;
  var size = size;
  var yPos = yPos;
  var component = component;
  var children = [];
  var rootX = null;
  var rootY = null;
  return {
    getChildren: function() {
      return children;
    },
    addChildren: function(layout) {
      children.push(layout);
    },
    init: function() {},
    subscribe: function() {}
  };
}
