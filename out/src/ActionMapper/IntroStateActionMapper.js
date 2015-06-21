function intro_action_mapper(sb) {
  var currentlyPressedKeys = [];
  var handleKeyDown = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, true);
  };
  var handleKeyUp = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, false);
  };
  var handleKeys = function() {
    if (currentlyPressedKeys[32]) {
      sb.publish("loadstate", 'gamestate');
    }
  };
  var handleMouseDown = function(event) {
    sb.publish("loadstate", 'gamestate');
  };
  return Object.freeze({
    handleKeyDown: handleKeyDown,
    handleKeyUp: handleKeyUp,
    handleKeys: handleKeys,
    handleMouseDown: handleMouseDown
  });
}
