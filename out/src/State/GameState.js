function gamestate_constructor(sb) {
  var elapsedTotal = 0;
  var gl = sb.getGL();
  var camera = sb.getCamera();
  var frameCount = 0;
  var lastTime = 0;
  var processList = [];
  var startTime = null;
  var actionMapper = game_action_mapper(sb);
  var subscribe = function() {};
  var init = function() {
    processList = [];
    document.onkeydown = actionMapper.handleKeyDown;
    document.onkeyup = actionMapper.handleKeyUp;
    document.onmousemove = actionMapper.handleMouseMove;
    document.onmousedown = actionMapper.handleMouseDown;
    processList.push(renderprocess_constructor(sb));
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.getMVMatrix());
    startTime = new Date().getTime();
  };
  var update = function() {
    actionMapper.handleKeys();
    var timeNow = new Date().getTime();
    frameCount++;
    if (lastTime != 0) {
      try {
        throw undefined;
      } catch (elapsed) {
        try {
          throw undefined;
        } catch (totalElapsed) {
          {
            totalElapsed = timeNow - startTime;
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
                          processList[$traceurRuntime.toProperty(i)].update(elapsed, totalElapsed);
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
    }
    lastTime = timeNow;
  };
  var draw = function() {
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    camera.move();
    camera.setDistance(350);
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
  };
  var cleanup = function() {};
  return {
    init: init,
    subscribe: subscribe,
    draw: draw,
    update: update,
    cleanup: cleanup
  };
}
