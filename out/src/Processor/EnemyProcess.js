function enemyprocess_constructor(sb) {
  var routeDone = false;
  var camera = sb.getCamera();
  var em = sb.getEntityManager();
  var update = function(deltatime, timeFromStart) {
    if (timeFromStart < 30000) {
      return false;
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
                      if (le.components.Renderable && le.components.MeshComponent && le.components.EnemyComponent) {
                        try {
                          throw undefined;
                        } catch (re) {
                          try {
                            throw undefined;
                          } catch (ship) {
                            {
                              ship = em.getEntityByName('ship');
                              if (ship.components.HealthComponent.amount < 1) {
                                ship = em.getEntityByName('mothership');
                              }
                              re = le.components.Renderable;
                              if (!routeDone) {
                                try {
                                  throw undefined;
                                } catch (deg) {
                                  try {
                                    throw undefined;
                                  } catch (angR) {
                                    try {
                                      throw undefined;
                                    } catch (hyp) {
                                      try {
                                        throw undefined;
                                      } catch (dirX) {
                                        try {
                                          throw undefined;
                                        } catch (dirZ) {
                                          {
                                            dirZ = ship.components.Renderable.xPos - re.xPos;
                                            dirX = ship.components.Renderable.zPos - re.zPos;
                                            hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
                                            angR = Math.atan2(dirX, dirZ);
                                            deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);
                                            dirX /= hyp;
                                            dirZ /= hyp;
                                            re.zPos += dirX * le.components.EnemyComponent.speed * (deltatime / 1000);
                                            re.xPos += dirZ * le.components.EnemyComponent.speed * (deltatime / 1000);
                                            re.angleY = deg;
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
