function primitiveprocess_constructor() {
  var vertexPositionBuffer = gl.createBuffer();
  var simplestProgram = sm.init('simplest');
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
                      if (le.components.PrimitiveComponent && le.components.Renderable) {
                        try {
                          throw undefined;
                        } catch (c) {
                          {
                            sm.setProgram(this.simplestProgram);
                            camera.mvPushMatrix();
                            gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
                            gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
                            c = le.components.PrimitiveComponent.color;
                            gl.uniform4f(this.simplestProgram.uColor, c[0], c[1], c[2], 1.0);
                            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.PrimitiveComponent.points), gl.STATIC_DRAW);
                            gl.enableVertexAttribArray(this.simplestProgram.aVertexPosition);
                            gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
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
  return {};
}
