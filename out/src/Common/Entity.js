var Entity = function Entity(id) {
  "use strict";
  var name = arguments[1] !== (void 0) ? arguments[1] : false;
  this.id = id;
  this.name = name;
  this.components = {};
};
($traceurRuntime.createClass)(Entity, {addComponent: function(component) {
    "use strict";
    $traceurRuntime.setProperty(this.components, component.name, component);
  }}, {});
