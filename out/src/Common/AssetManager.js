function asset_manager_constructor() {
  var meshes,
      textures,
      loadingAmount,
      loadingMax,
      sb;
  var init = function(sandbox) {
    sb = sandbox;
    meshes = [];
    textures = [];
    loadingAmount = 0;
    loadingMax = 0;
  };
  var start = function() {
    sb.subscribe("assetload", function(name, assetname) {
      loadingAmount--;
      if (loadingAmount === 0) {
        sb.publish("allassetsloaded", true);
      }
    });
  };
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
  var subscribe = function() {};
  return Object.freeze({
    getTexture: getTexture,
    getMesh: getMesh,
    init: init,
    subscribe: subscribe,
    start: start,
    getLoadingAmount: function() {
      return loadingAmount;
    }
  });
}
