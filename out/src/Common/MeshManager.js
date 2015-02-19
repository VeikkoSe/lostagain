var MeshManager = function MeshManager() {
  "use strict";
  this.meshes = [];
};
($traceurRuntime.createClass)(MeshManager, {getOrAdd: function(name, mesh) {
    "use strict";
    if (this.meshes[$traceurRuntime.toProperty(name)])
      return this.meshes[$traceurRuntime.toProperty(name)];
    var m = new Mesh(name);
    $traceurRuntime.setProperty(this.meshes, name, m);
    return m;
  }}, {});
