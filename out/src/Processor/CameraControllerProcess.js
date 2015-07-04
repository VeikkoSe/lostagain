function cameracontrollerprocess_constructor(sb) {
  var camera = sb.getCamera();
  var em = sb.getEntityManager();
  var mouseX = 0;
  var mouseY = 0;
  var init = function() {
    var mousedown = 0;
    sb.subscribe("mousedown", function(name, e) {
      mousedown = 1;
    });
    sb.subscribe("mouseup", function(name, e) {
      mousedown = 0;
    });
    sb.subscribe("mousemove", function(name, e) {
      if (mousedown === 1) {
        if (mouseX - e.clientX > 0) {
          sb.getCamera().setYRotation('5');
        } else {
          sb.getCamera().setYRotation('-5');
        }
      }
      mouseX = e.clientX;
    });
    sb.subscribe("mousewheel", function(name, e) {
      if (e === -1)
        sb.getCamera().setPos(false, '-15', '-15');
      else
        sb.getCamera().setPos(false, '15', '15');
    });
  };
  var update = function(deltatime) {
    {
      try {
        throw undefined;
      } catch ($e) {
        {
          $e = 0;
          for (; $e < em.entities.length; $e++) {
            try {
              throw undefined;
            } catch (e) {
              {
                e = $e;
                try {
                  try {
                    throw undefined;
                  } catch (le) {
                    {
                      le = em.entities[$traceurRuntime.toProperty(e)];
                      if (le.components.CameraController && le.components.RenderableComponent) {
                        try {
                          throw undefined;
                        } catch (re) {
                          {
                            re = le.components.RenderableComponent;
                            camera.x = -1 * re.getXPos();
                            camera.z = -1 * (re.getZPos() + camera.distance);
                            camera.y = -1 * (re.getYPos() + camera.distance);
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $e = e;
                }
              }
            }
          }
        }
      }
    }
  };
  return {
    update: update,
    draw: function() {},
    init: init
  };
}
