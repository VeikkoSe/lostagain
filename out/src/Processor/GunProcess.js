function gunprocess_constructor(sb) {
  var gl = sb.getGL();
  var shadermanager = sb.getShaderManager();
  var particleProgram3d = shadermanager.init("particle3d");
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
                    if (bullets[$traceurRuntime.toProperty(i)].visible == 0) {
                      bulletShot = timeNow;
                      bullets[$traceurRuntime.toProperty(i)].visible = 1;
                      bullets[$traceurRuntime.toProperty(i)].birthTime = timeNow;
                      bullets[$traceurRuntime.toProperty(i)].angle = renderable.angleY;
                      bullets[$traceurRuntime.toProperty(i)].xPos = renderable.xPos;
                      bullets[$traceurRuntime.toProperty(i)].zPos = renderable.zPos;
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
    collisions = [];
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
                      if (le.components.CollisionComponent) {
                        try {
                          throw undefined;
                        } catch (r) {
                          try {
                            throw undefined;
                          } catch (c) {
                            {
                              if (le.components.HealthComponent && le.components.HealthComponent.amount < 1) {
                                continue;
                              }
                              c = le.components.CollisionComponent;
                              r = le.components.RenderableComponent;
                              c.entity = le;
                              collisions.push(c);
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
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < bullets.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  {
                    try {
                      throw undefined;
                    } catch ($j) {
                      {
                        $j = 0;
                        for (; $j < collisions.length; $j++) {
                          try {
                            throw undefined;
                          } catch (j) {
                            {
                              j = $j;
                              try {
                                if (j != i && bullets[$traceurRuntime.toProperty(i)].xPos > collisions[$traceurRuntime.toProperty(j)].xPos - collisions[$traceurRuntime.toProperty(j)].xWidth && bullets[$traceurRuntime.toProperty(i)].xPos < collisions[$traceurRuntime.toProperty(j)].xPos + collisions[$traceurRuntime.toProperty(j)].xWidth && bullets[$traceurRuntime.toProperty(i)].zPos > collisions[$traceurRuntime.toProperty(j)].zPos - collisions[$traceurRuntime.toProperty(j)].zWidth && bullets[$traceurRuntime.toProperty(i)].zPos < collisions[$traceurRuntime.toProperty(j)].zPos + collisions[$traceurRuntime.toProperty(j)].zWidth && collisions[$traceurRuntime.toProperty(j)].group == 'enemy' && bullets[$traceurRuntime.toProperty(i)].visible == 1) {
                                  sb.publish("bulletcollision", collisions[$traceurRuntime.toProperty(j)]);
                                }
                              } finally {
                                $j = j;
                              }
                            }
                          }
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
                      if (le.components.GunComponent && le.components.GunComponent.shooting && le.components.GunComponent.activeWeapon == 1 && le.components.HealthComponent.amount > 0) {
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
                  if (timeNow - bullets[$traceurRuntime.toProperty(i)].deathtime > bullets[$traceurRuntime.toProperty(i)].birthTime) {
                    bullets[$traceurRuntime.toProperty(i)].visible = 0;
                  } else {
                    try {
                      throw undefined;
                    } catch (posZ) {
                      try {
                        throw undefined;
                      } catch (posX) {
                        {
                          posX = bullets[$traceurRuntime.toProperty(i)].speed * (deltatime / 1000.0) * Math.cos(degToRad(bullets[$traceurRuntime.toProperty(i)].angle));
                          posZ = bullets[$traceurRuntime.toProperty(i)].speed * (deltatime / 1000.0) * Math.sin(degToRad(bullets[$traceurRuntime.toProperty(i)].angle));
                          bullets[$traceurRuntime.toProperty(i)].xPos += posX;
                          bullets[$traceurRuntime.toProperty(i)].zPos -= posZ;
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
                        gl.disable(gl.DEPTH_TEST);
                        shadermanager.setProgram(particleProgram3d);
                        gl.enable(gl.BLEND);
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
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
                                          if (bullets[$traceurRuntime.toProperty(i)].visible != 1) {
                                            continue;
                                          }
                                          bc = le.components.PhotonTorpedoComponent;
                                          gl.uniform1f(particleProgram3d.pointSize, 64.0);
                                          camera.mvPushMatrix();
                                          gl.uniform3f(particleProgram3d.positionUniform, bullets[$traceurRuntime.toProperty(i)].xPos, 0, bullets[$traceurRuntime.toProperty(i)].zPos);
                                          gl.bindBuffer(gl.ARRAY_BUFFER, bc.sprite.pointStartPositionsBuffer);
                                          gl.vertexAttribPointer(particleProgram3d.pointStartPositionAttribute, bc.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
                                          gl.activeTexture(gl.TEXTURE0);
                                          gl.bindTexture(gl.TEXTURE_2D, bc.sprite.texture);
                                          gl.uniform1i(particleProgram3d.samplerUniform, 0);
                                          gl.uniform4f(particleProgram3d.colorUniform, 1, 1, 1, 1);
                                          gl.uniformMatrix4fv(particleProgram3d.uPMatrix, false, camera.getPMatrix());
                                          gl.uniformMatrix4fv(particleProgram3d.uMVMatrix, false, camera.getMVMatrix());
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
  var checkHit = function() {
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
                  {
                    try {
                      throw undefined;
                    } catch ($j) {
                      {
                        $j = 0;
                        for (; $j < game.stateEngine.gameState.asteroids.asteroids.length; $j++) {
                          try {
                            throw undefined;
                          } catch (j) {
                            {
                              j = $j;
                              try {
                                if (bullets[$traceurRuntime.toProperty(i)].visible == 1 && game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].visible == 1 && bullets[$traceurRuntime.toProperty(i)].xPos > game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].xPos - 4 && bullets[$traceurRuntime.toProperty(i)].xPos < game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].xPos + 4 && bullets[$traceurRuntime.toProperty(i)].yPos > game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].yPos - 4 && bullets[$traceurRuntime.toProperty(i)].yPos < game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].yPos + 4) {
                                  game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].visible = 0;
                                  game.stateEngine.gameState.asteroids.amountshot++;
                                  bullets[$traceurRuntime.toProperty(i)].visible = 0;
                                  game.shotAsteroids++;
                                  game.stateEngine.gameState.particles.newAsteroidExplosion(bullets[$traceurRuntime.toProperty(i)].yPos, bullets[$traceurRuntime.toProperty(i)].xPos);
                                }
                              } finally {
                                $j = j;
                              }
                            }
                          }
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
    if (game.stateEngine.gameState.asteroids.asteroids.length == game.stateEngine.gameState.asteroids.amountshot) {
      {
        try {
          throw undefined;
        } catch ($j) {
          {
            $j = 0;
            for (; $j < game.stateEngine.gameState.asteroids.asteroids.length; $j++) {
              try {
                throw undefined;
              } catch (j) {
                {
                  j = $j;
                  try {
                    game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].visible = 1;
                  } finally {
                    $j = j;
                  }
                }
              }
            }
          }
        }
      }
      game.stateEngine.gameState.asteroids.amountshot = 0;
      game.stateEngine.gameState.asteroids.addnew(2);
    }
  };
  return {
    update: update,
    draw: draw,
    init: init
  };
}
