function gunprocess_constructor(sb) {
  var gl = sb.getGL();
  var shadermanager = sb.getShaderManager();
  var particleProgram3d = shadermanager.useShader("particle3d");
  var bulletsAmount = 80;
  var bulletReloadSpeed = 250;
  var bullets = [];
  var bulletShot = 0;
  var lastTime = 0;
  var camera = sb.getCamera();
  var em = sb.getEntityManager();
  var collisions = [];
  var init = function() {
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < bulletsAmount; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  try {
                    throw undefined;
                  } catch (bullet) {
                    {
                      bullet = photontorpedo_constructor();
                      bullets.push(bullet);
                    }
                  }
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
  var shootBullet = function(renderable) {
    var timeNow = new Date().getTime();
    if (timeNow - bulletReloadSpeed > bulletShot) {
      {
        try {
          throw undefined;
        } catch ($i) {
          {
            $i = 0;
            for (; $i < bulletsAmount; $i++) {
              try {
                throw undefined;
              } catch (i) {
                {
                  i = $i;
                  try {
                    if (bullets[$traceurRuntime.toProperty(i)].getVisible() === 0) {
                      bulletShot = timeNow;
                      bullets[$traceurRuntime.toProperty(i)].setVisible(1);
                      bullets[$traceurRuntime.toProperty(i)].setBirthTime(timeNow);
                      bullets[$traceurRuntime.toProperty(i)].setAngle(renderable.getAngleY());
                      bullets[$traceurRuntime.toProperty(i)].setXPos(renderable.getXPos());
                      bullets[$traceurRuntime.toProperty(i)].setZPos(renderable.getZPos());
                      break;
                    }
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
  };
  var update = function(deltatime) {
    var timeNow = new Date().getTime();
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
                      if (le.components.GunComponent && le.components.GunComponent.getShooting() === 1 && le.components.GunComponent.getActiveWeapon() === 1 && le.components.HealthComponent.getAmount() > 0) {
                        shootBullet(le.components.RenderableComponent);
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
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < bulletsAmount; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  if (timeNow - bullets[$traceurRuntime.toProperty(i)].getDeathtime() > bullets[$traceurRuntime.toProperty(i)].getBirthTime()) {
                    bullets[$traceurRuntime.toProperty(i)].setVisible(0);
                  } else {
                    try {
                      throw undefined;
                    } catch (posZ) {
                      try {
                        throw undefined;
                      } catch (posX) {
                        {
                          posX = bullets[$traceurRuntime.toProperty(i)].getSpeed() * (deltatime / 1000.0) * Math.cos(degToRad(bullets[$traceurRuntime.toProperty(i)].getAngle()));
                          posZ = bullets[$traceurRuntime.toProperty(i)].getSpeed() * (deltatime / 1000.0) * Math.sin(degToRad(bullets[$traceurRuntime.toProperty(i)].getAngle()));
                          bullets[$traceurRuntime.toProperty(i)].setXPos(bullets[$traceurRuntime.toProperty(i)].getXPos() + posX);
                          bullets[$traceurRuntime.toProperty(i)].setZPos(bullets[$traceurRuntime.toProperty(i)].getZPos() - posZ);
                        }
                      }
                    }
                  }
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
  var draw = function() {
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
                      if (le.components.PhotonTorpedoComponent) {
                        try {
                          throw undefined;
                        } catch (mvMatrix) {
                          {
                            gl.disable(gl.DEPTH_TEST);
                            shadermanager.setProgram(particleProgram3d);
                            gl.enable(gl.BLEND);
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                            mvMatrix = camera.getMVMatrix();
                            {
                              try {
                                throw undefined;
                              } catch ($i) {
                                {
                                  $i = 0;
                                  for (; $i < bulletsAmount; $i++) {
                                    try {
                                      throw undefined;
                                    } catch (i) {
                                      {
                                        i = $i;
                                        try {
                                          try {
                                            throw undefined;
                                          } catch (bc) {
                                            {
                                              if (bullets[$traceurRuntime.toProperty(i)].getVisible() != 1) {
                                                continue;
                                              }
                                              bc = le.components.PhotonTorpedoComponent;
                                              gl.uniform1f(particleProgram3d.pointSize, 64.0);
                                              camera.mvPushMatrix();
                                              gl.uniform3f(particleProgram3d.positionUniform, bullets[$traceurRuntime.toProperty(i)].getXPos(), bullets[$traceurRuntime.toProperty(i)].getYPos(), bullets[$traceurRuntime.toProperty(i)].getZPos());
                                              gl.bindBuffer(gl.ARRAY_BUFFER, bc.sprite.buffer);
                                              gl.vertexAttribPointer(particleProgram3d.pointStartPositionAttribute, bc.sprite.itemSize, gl.FLOAT, false, 0, 0);
                                              gl.activeTexture(gl.TEXTURE0);
                                              gl.bindTexture(gl.TEXTURE_2D, bc.sprite.texture);
                                              gl.uniform1i(particleProgram3d.samplerUniform, 0);
                                              gl.uniform4f(particleProgram3d.colorUniform, 1, 1, 1, 1);
                                              gl.uniformMatrix4fv(particleProgram3d.uPMatrix, false, camera.getPMatrix());
                                              gl.uniformMatrix4fv(particleProgram3d.uMVMatrix, false, mvMatrix);
                                              gl.drawArrays(gl.POINTS, 0, 1);
                                              camera.drawCalls++;
                                              camera.mvPopMatrix();
                                            }
                                          }
                                        } finally {
                                          $i = i;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            gl.enable(gl.DEPTH_TEST);
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
    gl.disable(gl.BLEND);
  };
  return {
    update: update,
    draw: draw,
    init: init
  };
}
