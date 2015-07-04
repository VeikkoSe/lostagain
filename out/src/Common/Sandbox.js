function sandbox_constructor(CORE) {
  var core = CORE;
  var publish = function(topic, args) {
    core.publish(topic, args);
  };
  var subscribe = function(topic, func) {
    core.subscribe(topic, func);
  };
  var unsubscribe = function(token) {
    core.unsubscribe(token);
  };
  var find = function(element) {
    return core.find(element);
  };
  return {
    unsubscribe: unsubscribe,
    subscribe: subscribe,
    publish: publish,
    find: find,
    getGL: function() {
      return core.getGL();
    },
    getCamera: function() {
      return core.getCamera();
    },
    getEntityManager: function() {
      var cm = core.getEntityManager();
      return cm;
    },
    getAssetManager: function() {
      return core.getAssetManager();
    },
    getShaderManager: function() {
      return core.getShaderManager();
    },
    getText: function() {
      return core.getText();
    },
    getResolutionWidth: function() {
      return core.getResolutionWidth();
    },
    getResolutionHeight: function() {
      return core.getResolutionHeight();
    },
    getActionMapper: function() {
      return core.getActionMapper();
    },
    getCurrentlyPressedKeys: function() {
      return core.getCurrentlyPressedKeys();
    }
  };
}
