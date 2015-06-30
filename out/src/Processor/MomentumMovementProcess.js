function momemtummovementprocess_constructor(sb) {
  var em = sb.getEntityManager();
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
                      if (le.components.HealthComponent && le.components.HealthComponent.amount < 1)
                        continue;
                      if (le.components.MomentumMovable && le.components.RenderableComponent) {
                        try {
                          throw undefined;
                        } catch (re) {
                          try {
                            throw undefined;
                          } catch (mm) {
                            {
                              mm = le.components.MomentumMovable;
                              re = le.components.RenderableComponent;
                              if (mm.accelerationOn) {
                                try {
                                  throw undefined;
                                } catch (posZ) {
                                  try {
                                    throw undefined;
                                  } catch (posX) {
                                    try {
                                      throw undefined;
                                    } catch (tz) {
                                      try {
                                        throw undefined;
                                      } catch (tx) {
                                        try {
                                          throw undefined;
                                        } catch (dirVectorZ) {
                                          try {
                                            throw undefined;
                                          } catch (dirVectorX) {
                                            {
                                              dirVectorX = Math.cos(degToRad(re.angleY));
                                              dirVectorZ = Math.sin(degToRad(re.angleY));
                                              tx = mm.velocityX;
                                              tz = mm.velocityZ;
                                              tx += mm.acceleration * dirVectorX * (deltatime / 1000);
                                              tz += mm.acceleration * dirVectorZ * (deltatime / 1000);
                                              posX = (tx < 0) ? tx * -1 : tx;
                                              posZ = (tz < 0) ? tz * -1 : tz;
                                              if (posX < mm.speed && posZ < mm.speed) {
                                                mm.velocityX = tx;
                                                mm.velocityZ = tz;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              if (mm.rotateRight) {
                                if (re.angleY >= 360)
                                  re.angleY = 0;
                                if (re.angleY < 0)
                                  re.angleY = 360;
                                re.angleY -= mm.turnSpeed * (deltatime / 1000);
                              }
                              if (mm.rotateLeft) {
                                if (re.angleY >= 360)
                                  re.angleY = 0;
                                if (re.angleY < 0)
                                  re.angleY = 360;
                                re.angleY += mm.turnSpeed * (deltatime / 1000);
                              }
                              re.xPos += mm.velocityX * (deltatime / 1000);
                              re.zPos -= mm.velocityZ * (deltatime / 1000);
                            }
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
    init: function() {}
  };
}
