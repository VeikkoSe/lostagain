function map_action_mapper(sb) {
  var handleKeyDown = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, true);
  };
  var handleKeyUp = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, false);
  };
  var handleKeys = function() {
    if (currentlyPressedKeys[49]) {}
    if (currentlyPressedKeys[50]) {}
    if (currentlyPressedKeys[51]) {}
    if (currentlyPressedKeys[52]) {}
    var map = em.getEntityByName('map');
    if (map) {
      map.components.MapComponent.movingUp = 0;
      map.components.MapComponent.movingLeft = 0;
      map.components.MapComponent.movingRight = 0;
      map.components.MapComponent.movingDown = 0;
      map.components.MapComponent.selecting = false;
      if (currentlyPressedKeys[87]) {
        map.components.MapComponent.movingUp = 1;
      }
      if (currentlyPressedKeys[65]) {
        map.components.MapComponent.movingLeft = 1;
      }
      if (currentlyPressedKeys[68]) {
        map.components.MapComponent.movingRight = 1;
      }
      if (currentlyPressedKeys[83]) {
        map.components.MapComponent.movingDown = 1;
      }
      if (currentlyPressedKeys[32]) {
        map.components.MapComponent.selecting = true;
      }
      if (currentlyPressedKeys[32]) {
        map.components.MapComponent.selectMap = true;
      }
    }
    if (currentlyPressedKeys[77]) {
      sb.publish("loadstate", 'gamestate');
    }
  };
  var handleMouseDown = function(event) {
    sb.publish("loadstate", 'gamestate');
  };
}
