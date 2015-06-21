function cameracontrollerprocess_constructor(sb) {
  var camera = sb.getCamera();
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
                      if (le.components.CameraController && le.components.Renderable) {
                        try {
                          throw undefined;
                        } catch (re) {
                          {
                            re = le.components.Renderable;
                            camera.x = -1 * re.xPos;
                            camera.z = -1 * (re.zPos + camera.distance);
                            camera.y = -1 * (re.yPos + camera.distance);
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
  return {};
}
