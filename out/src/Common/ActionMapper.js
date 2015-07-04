function action_mapper() {
  var currentlyPressedKeys = {};
  var sb;
  var handleKeyDown = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, true);
  };
  var handleKeyUp = function(event) {
    $traceurRuntime.setProperty(currentlyPressedKeys, event.keyCode, false);
  };
  var init = function(sandbox) {
    sb = sandbox;
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    var event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    window.addEventListener(event, handleMouseWheel);
  };
  var handleMouseWheel = function(event) {
    var normalized;
    if (event.wheelDelta) {
      normalized = (event.wheelDelta % 120 - 0) == -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
    } else {
      var rawAmmount = event.deltaY ? event.deltaY : event.detail;
      normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
    }
    sb.publish("mousewheel", normalized);
  };
  var handleMouseMove = function(e) {
    sb.publish("mousemove", e);
  };
  var handleMouseDown = function(event) {
    sb.publish("mousedown", event);
  };
  var handleMouseUp = function(event) {
    sb.publish("mouseup", event);
  };
  var start = function() {};
  return {
    init: init,
    subscribe: function() {},
    start: start,
    getCurrentlyPressedKeys: function() {
      return currentlyPressedKeys;
    }
  };
}
