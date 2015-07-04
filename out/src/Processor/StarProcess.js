function starprocess_constructor(sb) {
  var gl = sb.getGL();
  var pointStartPositionsBuffer = gl.createBuffer();
  var startPositions = [];
  var colors = [];
  var em = sb.getEntityManager();
  var camera = sb.getCamera();
  var shadermanager = sb.getShaderManager();
  var program = shadermanager.useShader("star");
  var numParticles = 10000;
  var init = function() {
    var color = [1, 1, 1, 1];
    colors.push(color);
    var color = [1, 1, 1, 2];
    colors.push(color);
    var color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    colors.push(color);
    var color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    colors.push(color);
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < numParticles; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  startPositions.push(randomBetween(-4000, 4000));
                  startPositions.push(randomBetween(-600, -500));
                  startPositions.push(randomBetween(-4000, 4000));
                  startPositions.push(randomBetween(1, 1));
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
    pointStartPositionsBuffer.numItems = numParticles;
  };
  var randomBetween = function(min, max) {
    if (min < 0) {
      return min + Math.random() * (Math.abs(min) + max);
    } else {
      return min + Math.random() * max;
    }
  };
  var draw = function() {
    var mvMatrix = camera.getMVMatrix();
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
                      if (le.components.StarComponent) {
                        shadermanager.setProgram(program);
                        gl.uniform3fv(program.uCameraPos, [camera.getX(), camera.getY(), camera.getZ()]);
                        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
                        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 16, 0);
                        gl.vertexAttribPointer(program.aPointSize, 1, gl.FLOAT, false, 16, 12);
                        gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
                        gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);
                        gl.drawArrays(gl.POINTS, 0, pointStartPositionsBuffer.numItems);
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
    update: function() {},
    init: init
  };
}
