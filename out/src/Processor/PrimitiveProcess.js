function primitiveprocess_constructor(sb) {
  var gl = sb.getGL();
  var vertexPositionBuffer = gl.createBuffer();
  var em = sb.getEntityManager();
  var shadermanager = sb.getShaderManager();
  var simplestProgram = shadermanager.useShader("simplest");
  var camera = sb.getCamera();
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
                      if (le.components.PrimitiveComponent && le.components.RenderableComponent) {
                        try {
                          throw undefined;
                        } catch (c) {
                          {
                            camera.mvPushMatrix();
                            gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.getPMatrix());
                            gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.getMVMatrix());
                            c = le.components.PrimitiveComponent.color;
                            gl.uniform4f(simplestProgram.uColor, c[0], c[1], c[2], 1.0);
                            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.PrimitiveComponent.points), gl.STATIC_DRAW);
                            gl.enableVertexAttribArray(simplestProgram.aVertexPosition);
                            gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
                            gl.drawArrays(gl.LINES, 0, le.components.PrimitiveComponent.points.length / 3);
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
    update: function() {},
    draw: draw,
    init: function() {}
  };
}
