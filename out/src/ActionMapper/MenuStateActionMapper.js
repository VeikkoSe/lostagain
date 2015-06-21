function menu_action_mapper(sb) {
  var handleKeyDown = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, true);
  };
  var handleKeyUp = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, false);
  };
  var handleKeys = function() {
    if (currentlyPressedKeys[32]) {}
  };
  var handleMouseDown = function(event) {};
  return Object.freeze({
    handleKeyDown: handleKeyDown,
    handleKeyUp: handleKeyUp,
    handleKeys: handleKeys,
    handleMouseDown: handleMouseDown
  });
}
