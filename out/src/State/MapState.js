function mapstate_constructor(sb) {
  var wall = null;
  var processList = [];
  var frameCount = 0;
  var lastTime = 0;
  var elapsedTotal = 0;
  var camera = sb.getCamera();
  var gl = sb.getGL();
  var actionMapper = map_action_mapper(sb);
  var draw = function() {
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    camera.move();
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
                  processList[$traceurRuntime.toProperty(i)].draw();
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    camera.drawCalls = 0;
  };
  var init = function() {
    actionMapper = map_action_mapper(sb);
    document.onkeydown = actionMapper.handleKeyDown;
    document.onkeyup = actionMapper.handleKeyUp;
    document.onmousemove = actionMapper.handleMouseMove;
    document.onmousedown = actionMapper.handleMouseDown;
    processList = [];
    processList.push(RenderProcess());
    camera.setPos(0, 0, 0, 45);
    camera.setDistance(50);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.getMVMatrix());
  };
  var update = function() {
    var timeNow = new Date().getTime();
    actionMapper.handleKeys();
    frameCount++;
    if (lastTime != 0) {
      try {
        throw undefined;
      } catch (elapsed) {
        {
          elapsed = timeNow - lastTime;
          elapsedTotal += elapsed;
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
                        processList[$traceurRuntime.toProperty(i)].update(elapsed, false);
                      } finally {
                        $i = i;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    lastTime = timeNow;
  };
  var subscribe = function() {};
  var cleanup = function() {};
  return {
    init: init,
    subscribe: subscribe,
    draw: draw,
    update: update,
    cleanup: cleanup
  };
}
