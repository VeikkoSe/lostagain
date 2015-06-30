function renderprocess_constructor(sb) {
  var gl = sb.getGL();
  var camera = sb.getCamera();
  var shadermanager = sb.getShaderManager();
  var shaderprogram = shadermanager.init("per-fragment-lighting");
  var em = sb.getEntityManager();
  var deltatime = null;
  var rotation = 0;
  var update = function(deltatime, timeFromStart) {
    if (timeFromStart > 2000) {
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
                        if (le.components.Visibility && le.components.Visibility.visibility == false) {
                          le.components.Visibility.visibility = true;
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
    }
    if (rotation > 360)
      rotation = 0;
    rotation += (90 * deltatime) / 1000.0;
  };
  var rotate = function(rc) {
    if (rc.angleY) {
      mat4.rotate(camera.getMVMatrix(), degToRad(rc.angleY), [0, 1, 0]);
    }
    if (rc.angleZ) {
      mat4.rotate(camera.getMVMatrix(), degToRad(rc.angleZ), [0, 0, 1]);
    }
    if (rc.angleX) {
      mat4.rotate(camera.getMVMatrix(), degToRad(rc.angleX), [1, 0, 0]);
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
                      if (le.components.RenderableComponent && le.components.MeshComponent) {
                        try {
                          throw undefined;
                        } catch (normalMatrix) {
                          try {
                            throw undefined;
                          } catch (zRot) {
                            try {
                              throw undefined;
                            } catch (yRot) {
                              try {
                                throw undefined;
                              } catch (xRot) {
                                try {
                                  throw undefined;
                                } catch (mvMatrix) {
                                  try {
                                    throw undefined;
                                  } catch (rc) {
                                    try {
                                      throw undefined;
                                    } catch (mc) {
                                      {
                                        mc = le.components.MeshComponent;
                                        rc = le.components.RenderableComponent;
                                        shadermanager.setProgram(shaderprogram);
                                        gl.uniform1f(shaderprogram.alphaUniform, 1);
                                        gl.uniform1i(shaderprogram.uDrawColors, 0);
                                        gl.uniform1i(shaderprogram.uUseLighting, true);
                                        gl.uniform3f(shaderprogram.uLightPosition, camera.getX(), -1 * camera.getY(), -1 * camera.getZ());
                                        gl.uniform3f(shaderprogram.uLightAmbient, 0, 0, 0);
                                        gl.uniform3f(shaderprogram.uLightDiffuse, 0.8, 0.8, 0.8);
                                        gl.uniform3f(shaderprogram.uLightSpecular, 0.8, 0.8, 0.8);
                                        gl.uniform1f(shaderprogram.uMaterialShininess, 200.0);
                                        mvMatrix = camera.getMVMatrix();
                                        if (le.components.Selectable) {
                                          gl.uniform3fv(shaderprogram.uDrawColor, le.components.Selectable.color);
                                        } else {
                                          gl.uniform3fv(shaderprogram.uDrawColor, [0.5, 0.5, 0.5]);
                                        }
                                        mat4.translate(mvMatrix, [rc.xPos, rc.yPos, rc.zPos]);
                                        rotate(rc);
                                        if (rc.scale) {
                                          mat4.scale(mvMatrix, [rc.scale, rc.scale, rc.scale]);
                                        }
                                        xRot = 0;
                                        yRot = 0;
                                        zRot = 0;
                                        if (le.components.ConstantRotation && rotation) {
                                          if (le.components.ConstantRotation.x > 0) {
                                            xRot = 1;
                                          }
                                          if (le.components.ConstantRotation.y > 0) {
                                            yRot = 1;
                                          }
                                          if (le.components.ConstantRotation.z > 0) {
                                            zRot = 1;
                                          }
                                          mat4.rotate(camera.getMVMatrix(), degToRad(rotation), [xRot, yRot, zRot]);
                                        }
                                        gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.vertexPositionBuffer);
                                        gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
                                        gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.normalPositionBuffer);
                                        gl.vertexAttribPointer(shaderprogram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
                                        gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.texturePositionBuffer);
                                        gl.vertexAttribPointer(shaderprogram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                                        gl.activeTexture(gl.TEXTURE0);
                                        gl.bindTexture(gl.TEXTURE_2D, mc.mesh.getTexture());
                                        gl.uniform1i(shaderprogram.samplerUniform, 0);
                                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mc.mesh.indexPositionBuffer);
                                        gl.uniformMatrix4fv(shaderprogram.uPMatrix, false, camera.getPMatrix());
                                        gl.uniformMatrix4fv(shaderprogram.uMVMatrix, false, mvMatrix);
                                        normalMatrix = mat3.create();
                                        mat4.toInverseMat3(mvMatrix, normalMatrix);
                                        mat3.transpose(normalMatrix);
                                        gl.uniformMatrix3fv(shaderprogram.uNMatrix, false, normalMatrix);
                                        gl.drawElements(gl.TRIANGLES, mc.mesh.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
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
  return Object.freeze({
    update: update,
    draw: draw,
    init: function() {}
  });
}
