var AssetManager = function AssetManager() {
  "use strict";
  this.meshes = [];
  this.textures = [];
};
($traceurRuntime.createClass)(AssetManager, {
  getOrAddMesh: function(name, mesh) {
    "use strict";
    if (this.meshes[$traceurRuntime.toProperty(name)])
      return this.meshes[$traceurRuntime.toProperty(name)];
    var m = new Mesh(name);
    $traceurRuntime.setProperty(this.meshes, name, m);
    return m;
  },
  getOrAddTexture: function(name) {
    "use strict";
    if (this.textures[$traceurRuntime.toProperty(name)])
      return this.textures[$traceurRuntime.toProperty(name)];
    var m = new Texture(name);
    $traceurRuntime.setProperty(this.textures, name, m);
    return m;
  },
  handleLoaded: function() {
    "use strict";
  }
}, {});
