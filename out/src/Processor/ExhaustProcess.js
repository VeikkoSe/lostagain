function exhaustprocess_constructor(sb) {
  var shadermanager = sb.getShaderManager();
  var exhaustProgram = shadermanager.init("exhaust");
  var em = sb.getEntityManager();
  var lastTime = 0;
  var elapsedTotal = 0;
  var gl = sb.getGL();
  var vertexPositionBuffer = gl.createBuffer();
  var texturePositionBuffer = gl.createBuffer();
  var camera = sb.getCamera();
  var init = function() {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
  };
  var pushArray = function(arr, arr2) {
    arr.push.apply(arr, arr2);
  };
  var updateTail = function(exhaustComponent, renderableComponent) {
    var re = renderableComponent;
    var ec = exhaustComponent;
    var posX = re.xPos;
    var posZ = re.zPos;
    var unitX = Math.cos(degToRad(re.angleY));
    var unitZ = Math.sin(degToRad(re.angleY));
    var rendX = (posX - (unitX * ec.offSetSideFromCenter)) - ((-1 * unitZ) * ec.offSetFromCenter);
    var rendZ = (posZ + (unitZ * ec.offSetSideFromCenter)) + (unitX * ec.offSetFromCenter);
    if ((ec.flow.length / 3) >= ec.length) {
      ec.flow.shift();
      ec.flow.shift();
      ec.flow.shift();
      {
        try {
          throw undefined;
        } catch ($i) {
          {
            $i = 0;
            for (; $i < 18; $i++) {
              try {
                throw undefined;
              } catch (i) {
                {
                  i = $i;
                  try {
                    ec.points.shift();
                  } finally {
                    $i = i;
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
            for (; $i < 12; $i++) {
              try {
                throw undefined;
              } catch (i) {
                {
                  i = $i;
                  try {
                    ec.texturecoordinates.shift();
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
    if (ec.flow.length == 0) {
      ec.flow.push(rendX);
      ec.flow.push(0);
      ec.flow.push(rendZ);
    }
    var xd = rendX - ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)];
    var zd = rendZ - ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)];
    var xdh = xd / 2;
    var zdh = zd / 2;
    var distance = Math.sqrt(xd * xd + zd * zd);
    if (distance > ec.width) {
      if (ec.flow.length > 3) {
        try {
          throw undefined;
        } catch (i) {
          {
            i = 0;
            $traceurRuntime.setProperty(ec.square, i++, ec.points[$traceurRuntime.toProperty(ec.points.length - 6)]);
            $traceurRuntime.setProperty(ec.square, i++, 0);
            $traceurRuntime.setProperty(ec.square, i++, ec.points[$traceurRuntime.toProperty(ec.points.length - 4)]);
            $traceurRuntime.setProperty(ec.square, i++, zdh + rendX);
            $traceurRuntime.setProperty(ec.square, i++, 0);
            $traceurRuntime.setProperty(ec.square, i++, -1 * xdh + rendZ);
            $traceurRuntime.setProperty(ec.square, i++, ec.points[$traceurRuntime.toProperty(ec.points.length - 3)]);
            $traceurRuntime.setProperty(ec.square, i++, 0);
            $traceurRuntime.setProperty(ec.square, i++, ec.points[$traceurRuntime.toProperty(ec.points.length - 1)]);
            $traceurRuntime.setProperty(ec.square, i++, ec.points[$traceurRuntime.toProperty(ec.points.length - 6)]);
            $traceurRuntime.setProperty(ec.square, i++, 0);
            $traceurRuntime.setProperty(ec.square, i++, ec.points[$traceurRuntime.toProperty(ec.points.length - 4)]);
            $traceurRuntime.setProperty(ec.square, i++, -1 * zdh + rendX);
            $traceurRuntime.setProperty(ec.square, i++, 0);
            $traceurRuntime.setProperty(ec.square, i++, xdh + rendZ);
            $traceurRuntime.setProperty(ec.square, i++, zdh + rendX);
            $traceurRuntime.setProperty(ec.square, i++, 0);
            $traceurRuntime.setProperty(ec.square, i++, -1 * xdh + rendZ);
            {
              try {
                throw undefined;
              } catch ($i) {
                {
                  $i = 0;
                  for (; $i < 18; $i++) {
                    try {
                      throw undefined;
                    } catch (i) {
                      {
                        i = $i;
                        try {
                          ec.points.push(ec.square[$traceurRuntime.toProperty(i)]);
                        } finally {
                          $i = i;
                        }
                      }
                    }
                  }
                }
              }
            }
            ec.flow.push(rendX);
            ec.flow.push(0);
            ec.flow.push(rendZ);
          }
        }
      } else {
        ec.points.push(-1 * zdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)]);
        ec.points.push(0);
        ec.points.push(xdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)]);
        ec.points.push(zdh + rendX);
        ec.points.push(0);
        ec.points.push(-1 * xdh + rendZ);
        ec.points.push(zdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)]);
        ec.points.push(0);
        ec.points.push(-1 * xdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)]);
        ec.points.push(-1 * zdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 3)]);
        ec.points.push(0);
        ec.points.push(xdh + ec.flow[$traceurRuntime.toProperty(ec.flow.length - 1)]);
        ec.points.push(-1 * zdh + rendX);
        ec.points.push(0);
        ec.points.push(xdh + rendZ);
        ec.points.push(zdh + rendX);
        ec.points.push(0);
        ec.points.push(-1 * xdh + rendZ);
        ec.flow.push(rendX);
        ec.flow.push(0);
        ec.flow.push(rendZ);
      }
      ec.texturecoordinates.push(1);
      ec.texturecoordinates.push(0);
      ec.texturecoordinates.push(0);
      ec.texturecoordinates.push(1);
      ec.texturecoordinates.push(0);
      ec.texturecoordinates.push(0);
      ec.texturecoordinates.push(1);
      ec.texturecoordinates.push(0);
      ec.texturecoordinates.push(1);
      ec.texturecoordinates.push(1);
      ec.texturecoordinates.push(0);
      ec.texturecoordinates.push(1);
    }
  };
  var update = function(deltatime) {
    var timeNow = new Date().getTime();
    var elapsed = timeNow - lastTime;
    elapsedTotal += elapsed;
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
                      if (le.components.ExhaustComponent) {
                        updateTail(le.components.ExhaustComponent, le.components.RenderableComponent);
                      }
                      if (le.components.MultiExhaustComponent) {
                        {
                          try {
                            throw undefined;
                          } catch ($i) {
                            {
                              $i = 0;
                              for (; $i < le.components.MultiExhaustComponent.exhaustComponents.length; $i++) {
                                try {
                                  throw undefined;
                                } catch (i) {
                                  {
                                    i = $i;
                                    try {
                                      updateTail(le.components.MultiExhaustComponent.exhaustComponents[$traceurRuntime.toProperty(i)], le.components.RenderableComponent);
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
  var drawTail = function(exhaustComponent) {
    var ec = exhaustComponent;
    if (ec.points.length > 8) {
      sm.setProgram(exhaustProgram);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.disable(gl.DEPTH_TEST);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, ec.sprite);
      gl.uniform1i(exhaustProgram.samplerUniform, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
      gl.vertexAttribPointer(exhaustProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.texturecoordinates), gl.STATIC_DRAW);
      camera.mvPushMatrix();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ec.points), gl.STATIC_DRAW);
      gl.vertexAttribPointer(exhaustProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      gl.uniformMatrix4fv(exhaustProgram.uPMatrix, false, camera.getPMatrix());
      gl.uniformMatrix4fv(exhaustProgram.uMVMatrix, false, camera.getMVMatrix());
      gl.drawArrays(gl.TRIANGLES, 0, ec.points.length / 3);
      camera.drawCalls++;
      camera.mvPopMatrix();
      gl.enable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
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
                      if ((le.components.ExhaustComponent || le.components.MultiExhaustComponent) && le.components.HealthComponent.amount > 0) {
                        if (le.components.ExhaustComponent) {
                          drawTail(le.components.ExhaustComponent);
                        }
                        if (le.components.MultiExhaustComponent) {
                          {
                            try {
                              throw undefined;
                            } catch ($i) {
                              {
                                $i = 0;
                                for (; $i < le.components.MultiExhaustComponent.exhaustComponents.length; $i++) {
                                  try {
                                    throw undefined;
                                  } catch (i) {
                                    {
                                      i = $i;
                                      try {
                                        drawTail(le.components.MultiExhaustComponent.exhaustComponents[$traceurRuntime.toProperty(i)]);
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
    draw: draw,
    init: function() {}
  };
}
