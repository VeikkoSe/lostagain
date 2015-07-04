function introstate_constructor(sb) {
  var processList = [];
  var camera = sb.getCamera();
  var gl = sb.getGL();
  var draw = function() {
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < processList.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  processList[$traceurRuntime.toProperty(i)].draw(sb);
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
  };
  var subscribe = function() {};
  var init = function() {
    processList.push(renderprocess_constructor(sb));
    gl.clearColor(1, 0, 0, 1.0);
    gl.clearDepth(1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.init();
    camera.setPerspective();
    mat4.identity(camera.getMVMatrix());
    mat4.translate(camera.getMVMatrix(), [0, 0, -50]);
  };
  var cleanup = function() {};
  var update = function() {};
  return Object.freeze({
    init: init,
    subscribe: subscribe,
    draw: draw,
    update: update,
    cleanup: cleanup
  });
}
