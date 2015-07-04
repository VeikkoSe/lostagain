function text_process_2d_constructor(sb) {
  var shadermanager = sb.getShaderManager();
  var program = shadermanager.useShader("per-fragment-lighting");
  var text = sb.getText();
  var gl = sb.getGL();
  var t = texture_constructor(sb);
  var texture = t.loadedTexture;
  var textBuffer = null;
  var rotation = null;
  var currentString = '';
  var vertexPositionBuffer = gl.createBuffer();
  var em = sb.getEntityManager();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  var str = '';
  var characterArray = text.textToC(str);
  var textBuffer = text.buildData(characterArray, true);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);
  var update = function(deltatime, timeSinceStart) {
    currentString = '';
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
                      if (le.components.TextComponent) {
                        try {
                          throw undefined;
                        } catch (tc) {
                          {
                            tc = le.components.TextComponent;
                            for (var $key in tc.texts) {
                              try {
                                throw undefined;
                              } catch (key) {
                                {
                                  key = $key;
                                  if (tc.texts.hasOwnProperty(key)) {
                                    if (parseInt(key, 10) < timeSinceStart) {
                                      currentString = tc.texts[$traceurRuntime.toProperty(key)];
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
    if (currentString != '') {
      try {
        throw undefined;
      } catch (characterArray) {
        try {
          throw undefined;
        } catch (str) {
          {
            str = currentString;
            characterArray = text.textToC(str);
            textBuffer = text.buildData(characterArray, true);
          }
        }
      }
    }
  };
  var draw = function() {
    if (textBuffer == null && currentString != '') {
      return true;
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
                      if (le.components.TextComponent) {
                        sm.setProgram(program);
                        camera.mvPushMatrix();
                        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
                        gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);
                        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);
                        gl.activeTexture(gl.TEXTURE0);
                        gl.bindTexture(gl.TEXTURE_2D, texture);
                        gl.uniform1i(program.samplerUniform, 0);
                        gl.drawArrays(gl.TRIANGLES, 0, textBuffer.length / 5);
                        camera.mvPopMatrix();
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
    draw: draw,
    update: update,
    init: function() {}
  };
}
