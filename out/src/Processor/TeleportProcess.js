function teleport_process_constructor(sb) {
  var vertexPositionBuffer = gl.createBuffer();
  var simplestProgram = sm.init('simplest');
  var em = sb.getEntityManager();
  var gl = sb.getGL();
  var camera = sb.getCamera();
  var update = function(deltatime, totalElapsed) {
    var ms = em.getEntityByName('mothership');
    var ship = em.getEntityByName('ship');
    if (ms && ship) {
      if (totalElapsed > 2000)
        ms.components.JumpArea.visible = true;
      ms.components.JumpArea.points = circleXY({
        x: ms.components.Renderable.xPos,
        y: 0,
        z: ms.components.Renderable.zPos
      }, ms.components.JumpArea.radius, ms.components.JumpArea.pointAmount);
      if (!isInCircle(ms.components.Renderable.xPos, ms.components.Renderable.zPos, ms.components.JumpArea.radius, ship.components.Renderable.xPos, ship.components.Renderable.zPos)) {
        try {
          throw undefined;
        } catch (posZ) {
          try {
            throw undefined;
          } catch (posx) {
            try {
              throw undefined;
            } catch (dirZnormal) {
              try {
                throw undefined;
              } catch (dirXnormal) {
                try {
                  throw undefined;
                } catch (origHyp) {
                  try {
                    throw undefined;
                  } catch (dirZ) {
                    try {
                      throw undefined;
                    } catch (dirX) {
                      {
                        dirX = ms.components.Renderable.xPos - ship.components.Renderable.xPos;
                        dirZ = ms.components.Renderable.zPos - ship.components.Renderable.zPos;
                        origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
                        dirXnormal = dirX / origHyp;
                        dirZnormal = dirZ / origHyp;
                        dirX = (ms.components.JumpArea.radius - 1) * dirXnormal;
                        dirZ = (ms.components.JumpArea.radius - 1) * dirZnormal;
                        posx = dirX + ms.components.Renderable.xPos;
                        posZ = dirZ + ms.components.Renderable.zPos;
                        ship.components.Renderable.xPos = posx;
                        ship.components.Renderable.zPos = posZ;
                        {
                          try {
                            throw undefined;
                          } catch ($i) {
                            {
                              $i = 0;
                              for (; $i < ship.components.MultiExhaustComponent.exhaustComponents.length; $i++) {
                                try {
                                  throw undefined;
                                } catch (i) {
                                  {
                                    i = $i;
                                    try {
                                      ship.components.MultiExhaustComponent.exhaustComponents[$traceurRuntime.toProperty(i)].points = [];
                                      ship.components.MultiExhaustComponent.exhaustComponents[$traceurRuntime.toProperty(i)].flow = [];
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
                      if (le.components.JumpArea && le.components.JumpArea.visible == true) {
                        try {
                          throw undefined;
                        } catch (c) {
                          {
                            sm.setProgram(simplestProgram);
                            camera.mvPushMatrix();
                            gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
                            gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);
                            c = le.components.JumpArea.color;
                            gl.uniform4f(simplestProgram.uColor, c[0], c[1], c[2], 1.0);
                            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.JumpArea.points), gl.STATIC_DRAW);
                            gl.enableVertexAttribArray(simplestProgram.aVertexPosition);
                            gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
                            gl.drawArrays(gl.LINES, 0, le.components.JumpArea.points.length / 3);
                            camera.drawCalls++;
                            camera.mvPopMatrix();
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
  var isInCircle = function(centerX, centerY, radius, x, y) {
    return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
  };
  var isInRectangle = function(centerX, centerY, radius, x, y) {
    return x >= centerX - radius && x <= centerX + radius && y >= centerY - radius && y <= centerY + radius;
  };
  var getOppositeAngle = function(angle) {
    var ret = false;
    if (angle > 180)
      ret = angle - 180;
    else if (angle < 180)
      ret = angle + 180;
    return ret;
  };
  return {};
}
