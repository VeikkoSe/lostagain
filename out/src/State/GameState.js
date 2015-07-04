function gamestate_constructor(sb) {
  var elapsedTotal = 0;
  var gl = sb.getGL();
  var camera = sb.getCamera();
  var frameCount = 0;
  var lastTime = 0;
  var processList = [];
  var startTime = null;
  var subscribe = function() {};
  var init = function() {
    processList = [];
    sb.subscribe("movetoloadstate", function(name, wantedstate) {
      moveToLoadedStage(wantedstate);
    });
    processList.push(cameracontrollerprocess_constructor(sb));
    processList.push(primitiveprocess_constructor(sb));
    processList.push(teleport_process_constructor(sb));
    processList.push(starprocess_constructor(sb));
    processList.push(enemyprocess_constructor(sb));
    processList.push(gunprocess_constructor(sb));
    processList.push(momemtummovementprocess_constructor(sb));
    processList.push(exhaustprocess_constructor(sb));
    processList.push(explosionprocess_constructor(sb));
    processList.push(layoutprocess_constructor(sb));
    processList.push(collisionprocess_constructor(sb));
    processList.push(renderprocess_constructor(sb));
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
                  processList[$traceurRuntime.toProperty(i)].init();
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.getMVMatrix());
    startTime = new Date().getTime();
  };
  var update = function() {
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
