function endstate_constructor(sb) {
  var gl = sb.getGL();
  var draw = function() {};
  var init = function() {};
  var cleanup = function() {};
  var update = function() {};
  return {
    update: update,
    init: init,
    draw: draw,
    cleanup: cleanup
  };
}
