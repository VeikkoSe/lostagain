function asset_manager_constructor(sb) {
  var meshes = [];
  var textures = [];
  var loadingAmount = 0;
  var loadingMax = 0;
  var getMesh = function(name) {
    if (meshes[$traceurRuntime.toProperty(name)])
      return meshes[$traceurRuntime.toProperty(name)];
    loadingAmount++;
    loadingMax++;
    var m = mesh_constructor(sb);
    m.loadMesh(name);
    $traceurRuntime.setProperty(meshes, name, m);
    return meshes[$traceurRuntime.toProperty(name)];
  };
  var getTexture = function(name) {};
  var subscribe = function() {
    sb.subscribe("assetload", function(name, assetname) {
      loadingAmount--;
      if (loadingAmount === 0) {
        sb.publish("allassetsloaded", true);
      }
    });
  };
  var init = function() {};
  return Object.freeze({
    getTexture: getTexture,
    getMesh: getMesh,
    init: init,
    subscribe: subscribe,
    getLoadingAmount: function() {
      return loadingAmount;
    }
  });
}
