function momemtummovementprocess_constructor(sb) {
  var sb = sb;
  var em = sb.getEntityManager();
  var update = function(deltatime) {
    var ms = em.getEntityByName('mothership');
    if (ms) {
      ms.components.MomentumComponent.setRotatingLeft(0);
      ms.components.MomentumComponent.setRotatingRight(0);
      ms.components.MomentumComponent.setCurrentlyAccelerating(0);
      if (sb.getActionMapper().getCurrentlyPressedKeys()[87]) {
        ms.components.MomentumComponent.setCurrentlyAccelerating(1);
      }
      if (sb.getActionMapper().getCurrentlyPressedKeys()[65]) {
        ms.components.MomentumComponent.setRotatingLeft(1);
      }
      if (sb.getActionMapper().getCurrentlyPressedKeys()[68]) {
        ms.components.MomentumComponent.setRotatingRight(1);
      }
    }
    var ship = em.getEntityByName('ship');
    if (ship) {
      ship.components.MomentumComponent.setRotatingLeft(0);
      ship.components.MomentumComponent.setRotatingRight(0);
      ship.components.MomentumComponent.setCurrentlyAccelerating(0);
      ship.components.GunComponent.setShooting(0);
      if (sb.getActionMapper().getCurrentlyPressedKeys()[38]) {
        ship.components.MomentumComponent.setCurrentlyAccelerating(1);
      }
      if (sb.getActionMapper().getCurrentlyPressedKeys()[37]) {
        ship.components.MomentumComponent.setRotatingLeft(1);
      }
      if (sb.getActionMapper().getCurrentlyPressedKeys()[39]) {
        ship.components.MomentumComponent.setRotatingRight(1);
      }
      if (sb.getActionMapper().getCurrentlyPressedKeys()[32]) {
        ship.components.GunComponent.setShooting(1);
      }
    }
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
                      if (le.components.MomentumComponent && le.components.RenderableComponent) {
                        try {
                          throw undefined;
                        } catch (re) {
                          try {
                            throw undefined;
                          } catch (mm) {
                            {
                              mm = le.components.MomentumComponent;
                              re = le.components.RenderableComponent;
                              if (mm.getCurrentlyAccelerating() === 1) {
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
                                              dirVectorX = Math.cos(degToRad(re.getAngleY()));
                                              dirVectorZ = Math.sin(degToRad(re.getAngleY()));
                                              tx = mm.getVelocityX();
                                              tz = mm.getVelocityZ();
                                              tx += mm.getAccelerationAmount() * dirVectorX * (deltatime / 1000);
                                              tz += mm.getAccelerationAmount() * dirVectorZ * (deltatime / 1000);
                                              posX = (tx < 0) ? tx * -1 : tx;
                                              posZ = (tz < 0) ? tz * -1 : tz;
                                              if (posX < mm.getSpeed() && posZ < mm.getSpeed()) {
                                                mm.setVelocityX(tx);
                                                mm.setVelocityZ(tz);
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              if (mm.getRotatingRight() === 1) {
                                if (re.getAngleY() >= 360)
                                  re.setAngleY(0);
                                if (re.getAngleY() < 0)
                                  re.setAngleY(360);
                                re.setAngleY(re.getAngleY() - mm.getTurnSpeed() * (deltatime / 1000));
                              }
                              if (mm.getRotatingLeft() === 1) {
                                if (re.getAngleY() >= 360)
                                  re.setAngleY(0);
                                if (re.getAngleY() < 0)
                                  re.setAngleY(360);
                                re.setAngleY(re.getAngleY() + mm.getTurnSpeed() * (deltatime / 1000));
                              }
                              re.setXPos(re.getXPos() + mm.getVelocityX() * (deltatime / 1000));
                              re.setZPos(re.getZPos() - mm.getVelocityZ() * (deltatime / 1000));
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
  var init = function() {};
  return {
    update: update,
    draw: function() {},
    init: init
  };
}
