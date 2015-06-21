function linearmovementprocess_construcotr(sb) {
  var em = sb.getEntityManager();
  var isClose = function(currentCoord, newCoord) {
    if (currentCoord < newCoord + 0.1 && currentCoord > newCoord - 0.1) {
      return true;
    }
    return false;
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
                      if (le.components.Selectable && le.components.Renderable && le.components.Movable) {
                        try {
                          throw undefined;
                        } catch (me) {
                          try {
                            throw undefined;
                          } catch (re) {
                            try {
                              throw undefined;
                            } catch (se) {
                              {
                                se = le.components.Selectable;
                                re = le.components.Renderable;
                                me = le.components.Movable;
                                if (me && se.selected && camera.clickPosition) {
                                  me.newXpos = camera.clickPosition[0];
                                  me.newYpos = camera.clickPosition[1];
                                  me.newZpos = camera.clickPosition[2];
                                }
                                if ((isNumeric(le.components.Movable.newXpos) && isNumeric(le.components.Movable.newZpos)) && (!isClose(re.xPos, le.components.Movable.newXpos) || !isClose(re.zPos, le.components.Movable.newZpos))) {
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
                                        } catch (dirZ) {
                                          try {
                                            throw undefined;
                                          } catch (dirX) {
                                            {
                                              dirX = me.newXpos - re.xPos;
                                              dirZ = me.newZpos - re.zPos;
                                              hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
                                              angR = Math.atan2(dirX, dirZ);
                                              deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);
                                              dirX /= hyp;
                                              dirZ /= hyp;
                                              re.xPos += dirX * me.speed * (deltatime / 1000);
                                              re.zPos += dirZ * me.speed * (deltatime / 1000);
                                              re.yPos = 0;
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
