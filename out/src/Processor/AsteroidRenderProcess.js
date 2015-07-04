function asteroidrenderprocess_constructor(sb) {
  var normalMatrix = mat3.create();
  var megaElapsedTotal = 0;
  var ambientProgram = sm.init('ambient');
  var monstermap = null;
  var lastTime = 0;
  var vertexPositionBuffer = gl.createBuffer();
  var cube = cube_constructor();
  var camera = sb.getCamera();
  var gl = sb.getGL();
  var elapsedTotal = 0;
  var lastTime = 0;
  var combinedMeshes = {};
  var verts = cube.vertices();
  var init = function() {
    vertexPositionBuffer.nums = 0;
    combinedMeshes.vertices = [];
    vertexPositionBuffer.nums = 0;
    {
      try {
        throw undefined;
      } catch ($g) {
        {
          $g = 0;
          for (; $g < 5000; $g++) {
            try {
              throw undefined;
            } catch (g) {
              {
                g = $g;
                try {
                  try {
                    throw undefined;
                  } catch (z) {
                    try {
                      throw undefined;
                    } catch (y) {
                      try {
                        throw undefined;
                      } catch (x) {
                        {
                          x = getRandomInt(-100, 100);
                          y = getRandomInt(0, 0);
                          z = getRandomInt(-100, 100);
                          {
                            try {
                              throw undefined;
                            } catch ($i) {
                              {
                                $i = 0;
                                for (; $i < verts.length; $i += 3) {
                                  try {
                                    throw undefined;
                                  } catch (i) {
                                    {
                                      i = $i;
                                      try {
                                        try {
                                          throw undefined;
                                        } catch (newVerts) {
                                          {
                                            newVerts = [];
                                            newVerts.push(verts[$traceurRuntime.toProperty(i)]);
                                            newVerts.push(verts[$traceurRuntime.toProperty(i + 1)]);
                                            newVerts.push(verts[$traceurRuntime.toProperty(i + 2)]);
                                            newVerts.push(x);
                                            newVerts.push(y);
                                            newVerts.push(z);
                                            newVerts.push(g);
                                            newVerts.push(g);
                                            newVerts.push(g);
                                            combinedMeshes.vertices.push.apply(combinedMeshes.vertices, newVerts);
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
                          vertexPositionBuffer.nums += verts.length / 3;
                        }
                      }
                    }
                  }
                } finally {
                  $g = g;
                }
              }
            }
          }
        }
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(combinedMeshes.vertices), gl.STATIC_DRAW);
  };
  var textureFromPixelArray = function(dataArray, type, width, height) {
    var dataTypedArray = new Uint8Array(dataArray);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
    return texture;
  };
  var createTexture = function(elapsed) {
    megaElapsedTotal += elapsed;
    if (megaElapsedTotal > 100 || monstermap == null) {
      try {
        throw undefined;
      } catch (texture) {
        try {
          throw undefined;
        } catch (g) {
          try {
            throw undefined;
          } catch (v1) {
            try {
              throw undefined;
            } catch (b) {
              {
                megaElapsedTotal = 0;
                b = new ArrayBuffer(128 * 128 * 4);
                v1 = new Uint8Array(b);
                g = 0;
                {
                  try {
                    throw undefined;
                  } catch ($i) {
                    {
                      $i = 0;
                      for (; $i < 128 * 128; $i++) {
                        try {
                          throw undefined;
                        } catch (i) {
                          {
                            i = $i;
                            try {
                              if (randomIntFromInterval(0, 1) == 1) {
                                $traceurRuntime.setProperty(v1, g++, 255);
                                $traceurRuntime.setProperty(v1, g++, 255);
                                $traceurRuntime.setProperty(v1, g++, 255);
                                $traceurRuntime.setProperty(v1, g++, 255);
                              } else {
                                $traceurRuntime.setProperty(v1, g++, 0);
                                $traceurRuntime.setProperty(v1, g++, 0);
                                $traceurRuntime.setProperty(v1, g++, 0);
                                $traceurRuntime.setProperty(v1, g++, 0);
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
                texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA, gl.UNSIGNED_BYTE, v1);
                gl.generateMipmap(gl.TEXTURE_2D);
                monstermap = texture;
              }
            }
          }
        }
      }
    }
  };
  var update = function(deltatime, timeSinceBeginning) {
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
                      if (le.components.AsteroidComponent) {
                        createTexture(deltatime);
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
                      if (le.components.AsteroidComponent) {
                        try {
                          throw undefined;
                        } catch (timeNow) {
                          {
                            gl.uniform3fv(ambientProgram.uCameraPos, [camera.getX(), camera.getY(), camera.getZ()]);
                            gl.uniformMatrix4fv(ambientProgram.uPMatrix, false, camera.getPMatrix());
                            timeNow = new Date().getTime();
                            if (lastTime != 0) {
                              try {
                                throw undefined;
                              } catch (elapsed) {
                                {
                                  elapsed = timeNow - lastTime;
                                  elapsedTotal += elapsed;
                                  gl.uniform1f(ambientProgram.uElapsed, elapsedTotal.toFixed(1));
                                }
                              }
                            }
                            gl.uniform1f(ambientProgram.uElapsed, 0);
                            lastTime = timeNow;
                            gl.activeTexture(gl.TEXTURE0);
                            gl.bindTexture(gl.TEXTURE_2D, monstermap);
                            gl.uniform1i(ambientProgram.uVisibility, 0);
                            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                            gl.vertexAttribPointer(ambientProgram.aVertexPosition, 3, gl.FLOAT, false, 36, 0);
                            gl.vertexAttribPointer(ambientProgram.aWorldCoordinates, 3, gl.FLOAT, false, 36, 12);
                            gl.vertexAttribPointer(ambientProgram.aCubeNumber, 3, gl.FLOAT, false, 36, 24);
                            gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.nums);
                            camera.drawCalls++;
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
    init: init
  };
}
