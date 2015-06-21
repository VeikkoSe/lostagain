var StarProcess = function StarProcess() {
  "use strict";
  this.pointStartPositionsBuffer = null;
  this.startPositions = [];
  this.colors = [];
  this.initBuffers();
  this.starProgram = sm.init('star');
};
($traceurRuntime.createClass)(StarProcess, {
  randomBetween: function(min, max) {
    "use strict";
    if (min < 0) {
      return min + Math.random() * (Math.abs(min) + max);
    } else {
      return min + Math.random() * max;
    }
  },
  initBuffers: function() {
    "use strict";
    var numParticles = 10000;
    var color = [1, 1, 1, 1];
    this.colors.push(color);
    var color = [1, 1, 1, 2];
    this.colors.push(color);
    var color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    this.colors.push(color);
    var color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    this.colors.push(color);
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
                  this.startPositions.push(this.randomBetween(-4000, 4000));
                  this.startPositions.push(this.randomBetween(-600, -500));
                  this.startPositions.push(this.randomBetween(-4000, 4000));
                  this.startPositions.push(this.randomBetween(1, 1));
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    this.pointStartPositionsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);
    this.pointStartPositionsBuffer.numItems = numParticles;
  },
  draw: function() {
    "use strict";
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
                        sm.setProgram(this.starProgram);
                        camera.mvPushMatrix();
                        gl.uniform3fv(this.starProgram.uCameraPos, [camera.x, camera.y, camera.z]);
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
                        gl.vertexAttribPointer(this.starProgram.aVertexPosition, 3, gl.FLOAT, false, 16, 0);
                        gl.vertexAttribPointer(this.starProgram.aPointSize, 1, gl.FLOAT, false, 16, 12);
                        gl.uniformMatrix4fv(this.starProgram.uPMatrix, false, camera.pMatrix);
                        gl.uniformMatrix4fv(this.starProgram.uMVMatrix, false, camera.mvMatrix);
                        gl.drawArrays(gl.POINTS, 0, this.pointStartPositionsBuffer.numItems);
                        camera.drawCalls++;
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
  }
}, {}, Processor);
