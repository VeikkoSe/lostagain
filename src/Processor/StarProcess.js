class StarProcess extends Processor {
    constructor() {
        //this.vertexPositionBuffer = gl.createBuffer();
        this.pointStartPositionsBuffer = null;
        this.startPositions = [];
        this.colors = [];
        this.initBuffers();
        this.starProgram = sm.init('star');


    }


    randomBetween(min, max) {
        if (min < 0) {
            return min + Math.random() * (Math.abs(min) + max);
        } else {
            return min + Math.random() * max;
        }
    }


    initBuffers() {
        let numParticles = 10000;

        let color = [1, 1, 1, 1];
        this.colors.push(color);

        let color = [1, 1, 1, 2];
        this.colors.push(color);

        let color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
        this.colors.push(color);

        let color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
        this.colors.push(color);

        /*

         for (let i = 0; i < numParticles; i++) {

         //vcoord (screen coords)
         this.startPositions.push(i*100);
         //vcoord (screen coords)
         this.startPositions.push(i*100);
         //vcoord (screen coords)
         this.startPositions.push(i*100);
         //worldcoordinates
         this.startPositions.push(10);
         this.startPositions.push(10);
         this.startPositions.push(0);

         }
         */

        for (let i = 0; i < numParticles; i++) {


            this.startPositions.push(this.randomBetween(-4000, 4000));
            this.startPositions.push(this.randomBetween(-600, -500));
            this.startPositions.push(this.randomBetween(-4000, 4000));
            //pointsize
            this.startPositions.push(this.randomBetween(1, 1));
        }


        /*
         //vcoord (screen coords)
         this.startPositions.push(2);
         this.startPositions.push(2);
         this.startPositions.push(2);

         //worldcoordinates
         this.startPositions.push(2);
         this.startPositions.push(2);
         this.startPositions.push(1);

         */


        /*
         //vcoord (screen coords)
         this.startPositions.push(-1);
         this.startPositions.push(-1);
         this.startPositions.push(0);

         //worldcoordinates
         this.startPositions.push(1);
         this.startPositions.push(1);
         this.startPositions.push(1);




         //vcoord (screen coords)
         this.startPositions.push(1);
         this.startPositions.push(-1);
         this.startPositions.push(0);

         //worldcoordinates
         this.startPositions.push(1);
         this.startPositions.push(1);
         this.startPositions.push(1);





         //vcoord (screen coords)
         this.startPositions.push(3);
         this.startPositions.push(-2);
         this.startPositions.push(0);

         //worldcoordinates
         this.startPositions.push(1);
         this.startPositions.push(1);
         this.startPositions.push(1);

         */


        this.pointStartPositionsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);

        this.pointStartPositionsBuffer.numItems = numParticles;


    }


    draw() {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.StarComponent) {
                sm.setProgram(this.starProgram);
                camera.mvPushMatrix();
                gl.uniform3fv(this.starProgram.uCameraPos, [camera.x, camera.y, camera.z]);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
                //gl.vertexAttribPointer(starProgram.pointStartPositionAttribute, 1, gl.FLOAT, false, 15, 0);
                //gl.vertexAttribPointer(starProgram.aWorldCoordinates, 3, gl.FLOAT, false, 18,3);

                gl.vertexAttribPointer(this.starProgram.aVertexPosition, 3, gl.FLOAT, false, 16, 0);
                gl.vertexAttribPointer(this.starProgram.aPointSize, 1, gl.FLOAT, false, 16, 12);

                // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);

                gl.uniformMatrix4fv(this.starProgram.uPMatrix, false, camera.pMatrix);

                gl.uniformMatrix4fv(this.starProgram.uMVMatrix, false, camera.mvMatrix);
                //console.log(this.pointStartPositionsBuffer.numItems);

                gl.drawArrays(gl.POINTS, 0, this.pointStartPositionsBuffer.numItems);
                camera.drawCalls++;
                camera.mvPopMatrix();
            }
        }

    }

    /**
     *
     * ar StarProcess = function StarProcess() {
  "use strict";
  this.pointStartPositionsBuffer = null;
  this.startPositions = [];
  this.colors = [];
  this.initBuffers();
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
    let numParticles = 50000;
    let color = [1, 1, 1, 1];
    this.colors.push(color);
    let color = [1, 1, 1, 2];
    this.colors.push(color);
    let color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    this.colors.push(color);
    let color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
    this.colors.push(color);
    for (let i = 0; i < numParticles; i++) {
      this.startPositions.push(this.randomBetween(-25000, 25000));
      this.startPositions.push(this.randomBetween(-5000, -5000));
      this.startPositions.push(this.randomBetween(-25000, 25000));
    }
    this.pointStartPositionsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);
    this.pointStartPositionsBuffer.itemSize = 3;
    this.pointStartPositionsBuffer.numItems = numParticles;
  },
  draw: function() {
    "use strict";
    camera.mvPushMatrix();
    gl.uniformMatrix4fv(starProgram.uPMatrix, false, camera.pMatrix);
    gl.uniformMatrix4fv(starProgram.uMVMatrix, false, camera.mvMatrix);
    for (let i = 0; i < 3; i++) {
      let color = this.colors[$traceurRuntime.toProperty(i)];
      gl.uniform1f(starProgram.pointSize, color[3]);
      gl.uniform3f(starProgram.colorUniform, color[0], color[1], color[2]);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(starProgram.pointStartPositionAttribute);
      gl.vertexAttribPointer(starProgram.pointStartPositionAttribute, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, i * this.pointStartPositionsBuffer.numItems / 3, this.pointStartPositionsBuffer.numItems / 3 / 3);
    }
    camera.mvPopMatrix();
  }
}, {}, Processor);
     */

}