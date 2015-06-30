function layoutprocess_constructor(sb) {
  var gl = sb.getGL();
  var resolutionWidth = sb.getResolutionWidth();
  var resolutionHeight = sb.getResolutionHeight();
  var shadermanager = sb.getShaderManager();
  var program = shadermanager.init("gui");
  var points = [];
  var vertexPositionBuffer = gl.createBuffer();
  var texCoordBuffer = gl.createBuffer();
  var vertBuffer = gl.createBuffer();
  var em = sb.getEntityManager();
  var camera = sb.getCamera();
  var init = function() {
    points.push(-50, 0, 0);
    points.push(20, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    var pd = setRectangle(0, 0, 1, 1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);
  };
  var simpleWorldToViewX = function(x) {
    return x / resolutionWidth;
  };
  var simpleWorldToViewY = function(y) {
    return y / resolutionHeight;
  };
  var calculatePd = function(x, y, xminus, yminus, layout) {
    var rh = resolutionHeight / 256;
    var y2 = y + (simpleWorldToViewY(1) * layout.size * rh);
    var x2 = x + (simpleWorldToViewX(1) * layout.size * rh);
    if (yminus) {
      try {
        throw undefined;
      } catch (tmp) {
        try {
          throw undefined;
        } catch (y2) {
          {
            y2 = y - (simpleWorldToViewY(1) * layout.size * rh);
            tmp = y;
            y = y2;
            y2 = tmp;
          }
        }
      }
    }
    if (xminus) {
      try {
        throw undefined;
      } catch (tmp) {
        try {
          throw undefined;
        } catch (x2) {
          {
            x2 = x - (simpleWorldToViewX(1) * layout.size * rh);
            tmp = x;
            x = x2;
            x2 = tmp;
          }
        }
      }
    }
    return setRectangle(x, y, x2, y2);
  };
  var recursiveLayout = function(lloop, parent) {
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < lloop.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  if (lloop[$traceurRuntime.toProperty(i)].component) {
                    try {
                      throw undefined;
                    } catch (loop) {
                      try {
                        throw undefined;
                      } catch (yminus) {
                        try {
                          throw undefined;
                        } catch (xminus) {
                          try {
                            throw undefined;
                          } catch (y) {
                            try {
                              throw undefined;
                            } catch (x) {
                              try {
                                throw undefined;
                              } catch (rh) {
                                {
                                  rh = resolutionHeight / 256;
                                  x = (parent.xPos) + ((simpleWorldToViewX(1) * lloop[$traceurRuntime.toProperty(i)].xPos) * rh);
                                  y = (parent.yPos) + ((simpleWorldToViewY(1) * lloop[$traceurRuntime.toProperty(i)].yPos) * rh);
                                  xminus = false;
                                  yminus = false;
                                  if (parent.xPos == 1) {
                                    try {
                                      throw undefined;
                                    } catch (x) {
                                      {
                                        x = (parent.xPos) - ((simpleWorldToViewX(1) * lloop[$traceurRuntime.toProperty(i)].xPos) * rh);
                                        xminus = true;
                                      }
                                    }
                                  }
                                  if (parent.yPos == 1) {
                                    try {
                                      throw undefined;
                                    } catch (y) {
                                      {
                                        y = (parent.yPos) - ((simpleWorldToViewY(1) * lloop[$traceurRuntime.toProperty(i)].yPos) * rh);
                                        yminus = true;
                                      }
                                    }
                                  }
                                  loop = 1;
                                  if (lloop[$traceurRuntime.toProperty(i)].component.amount && lloop[$traceurRuntime.toProperty(i)].component.amount > 0) {
                                    loop = lloop[$traceurRuntime.toProperty(i)].component.amount;
                                  } else {
                                    loop = 0;
                                  }
                                  if (loop > 0) {
                                    {
                                      try {
                                        throw undefined;
                                      } catch ($h) {
                                        {
                                          $h = 0;
                                          for (; $h < loop; $h++) {
                                            try {
                                              throw undefined;
                                            } catch (h) {
                                              {
                                                h = $h;
                                                try {
                                                  try {
                                                    throw undefined;
                                                  } catch (pd) {
                                                    try {
                                                      throw undefined;
                                                    } catch (add) {
                                                      {
                                                        add = h * (simpleWorldToViewY(1) * lloop[$traceurRuntime.toProperty(i)].size * rh);
                                                        pd = calculatePd(x + add, y, xminus, yminus, lloop[$traceurRuntime.toProperty(i)]);
                                                        render(lloop[$traceurRuntime.toProperty(i)], pd);
                                                      }
                                                    }
                                                  }
                                                } finally {
                                                  $h = h;
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
                  if (lloop[$traceurRuntime.toProperty(i)].getChildren().length > 0) {
                    recursiveLayout(lloop[$traceurRuntime.toProperty(i)].getChildren(), lloop[$traceurRuntime.toProperty(i)]);
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
  var setRectangle = function(x, y, x2, y2) {
    var x1 = x;
    var x2 = x2;
    var y1 = y;
    var y2 = y2;
    var ret = [x2, y1, x1, y1, x1, y2, x2, y1, x1, y2, x2, y2];
    return ret;
  };
  var render = function(layout, pd) {
    camera.mvPushMatrix();
    vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pd), gl.STATIC_DRAW);
    gl.vertexAttribPointer(program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, layout.component.sprite.texture);
    gl.uniform1i(program.samplerUniform, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    camera.drawCalls++;
    camera.mvPopMatrix();
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
                      if (le.components.LayoutComponent) {
                        shadermanager.setProgram(program);
                        recursiveLayout(le.components.LayoutComponent.layout, false);
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
    update: function() {},
    draw: draw,
    init: function() {}
  };
}
