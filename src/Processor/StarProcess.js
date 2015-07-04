function starprocess_constructor(sb) {
    let gl = sb.getGL();

    let pointStartPositionsBuffer = gl.createBuffer();
    let startPositions = [];
    let colors = [];
    let em = sb.getEntityManager();
    let camera = sb.getCamera();

    let shadermanager = sb.getShaderManager();
    let program = shadermanager.useShader("star");


    let numParticles = 10000;

    let init = function () {
        //this.vertexPositionBuffer = gl.createBuffer();


        let color = [1, 1, 1, 1];
        colors.push(color);

        let color = [1, 1, 1, 2];
        colors.push(color);

        let color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
        colors.push(color);

        let color = [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1];
        colors.push(color);

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


            startPositions.push(randomBetween(-4000, 4000));
            startPositions.push(randomBetween(-600, -500));
            startPositions.push(randomBetween(-4000, 4000));
            //pointsize
            startPositions.push(randomBetween(1, 1));
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


        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);

        pointStartPositionsBuffer.numItems = numParticles;
        //let starProgram = sm.init('star');


    }


    let randomBetween = function (min, max) {
        if (min < 0) {
            return min + Math.random() * (Math.abs(min) + max);
        } else {
            return min + Math.random() * max;
        }
    }


    let draw = function () {

        let mvMatrix = camera.getMVMatrix();
        //console.log(em);
        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.StarComponent) {


                // sm.setProgram(starProgram);
                shadermanager.setProgram(program);
                //camera.mvPushMatrix();
                gl.uniform3fv(program.uCameraPos, [camera.getX(), camera.getY(), camera.getZ()]);

                gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
                //gl.vertexAttribPointer(starProgram.pointStartPositionAttribute, 1, gl.FLOAT, false, 15, 0);
                //gl.vertexAttribPointer(starProgram.aWorldCoordinates, 3, gl.FLOAT, false, 18,3);

                gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 16, 0);
                gl.vertexAttribPointer(program.aPointSize, 1, gl.FLOAT, false, 16, 12);

                // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);

                gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());

                gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);
                //console.log(pointStartPositionsBuffer.numItems);

                gl.drawArrays(gl.POINTS, 0, pointStartPositionsBuffer.numItems);
                //camera.drawCalls++;
                //camera.mvPopMatrix();
            }
        }

    }

    return {
        draw, update: function () {
        }, init
    }
}