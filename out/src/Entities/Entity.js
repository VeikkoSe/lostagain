var Entity = function Entity(id) {
  "use strict";
  this.id = id;
  this.components = {};
};
($traceurRuntime.createClass)(Entity, {addComponent: function(component) {
    "use strict";
    $traceurRuntime.setProperty(this.components, component.name, component);
  }}, {});
