function mapprocess_constructor(sb) {
  var vertexPositionBuffer = gl.createBuffer();
  var texturePositionBuffer = gl.createBuffer();
  var mapProgram = sm.init('maps');
  var hexagon = game.map;
  var camera = sb.getCamera();
  var randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var update = function() {
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
                      if (le.components.MapComponent) {
                        try {
                          throw undefined;
                        } catch (mc) {
                          {
                            mc = le.components.MapComponent;
                            hexagon.updateArea(mc.movingUp, mc.movingDown, mc.movingLeft, mc.movingRight, mc.selecting);
                          }
                        }
                      }
                      if (le.components.HexItem && le.components.RenderableComponent) {
                        try {
                          throw undefined;
                        } catch (re) {
                          {
                            re = le.components.RenderableComponent;
                            re.xPos = hexagon.getPlayerPosXInWC();
                            re.zPos = hexagon.getPlayerPosZInWC();
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
                      if (le.components.MapComponent) {
                        try {
                          throw undefined;
                        } catch (mc) {
                          {
                            mc = le.components.MapComponent;
                            sm.setProgram(mapProgram);
                            camera.mvPushMatrix();
                            gl.uniformMatrix4fv(mapProgram.uPMatrix, false, camera.getPMatrix());
                            gl.uniformMatrix4fv(mapProgram.uMVMatrix, false, camera.getMVMatrix());
                            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hexagon.area), gl.STATIC_DRAW);
                            gl.vertexAttribPointer(mapProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
                            gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hexagon.textureCoordinates), gl.STATIC_DRAW);
                            gl.vertexAttribPointer(mapProgram.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
                            gl.activeTexture(gl.TEXTURE0);
                            gl.bindTexture(gl.TEXTURE_2D, hexagon.texture);
                            gl.uniform1i(mapProgram.samplerUniform, 0);
                            gl.drawArrays(gl.TRIANGLES, 0, (hexagon.hexsizeX * (hexagon.hexsizeY)) * 12);
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
  return {
    update: update,
    draw: draw,
    init: function() {}
  };
}
