class AsteroidRenderProcess extends Processor {
    constructor() {
        this.normalMatrix = mat3.create();

        this.megaElapsedTotal = 0;

        this.ambientProgram = sm.init('ambient');

        this.monstermap = null;
        this.lastTime = 0;
        this.vertexPositionBuffer = gl.createBuffer();
        this.vertexPositionBuffer.nums = 0;
        this.cube = new Cube();


        this.elapsedTotal = 0;


        this.lastTime = 0;


        this.combinedMeshes = {};
        this.combinedMeshes.vertices = [];
        this.vertexPositionBuffer.nums = 0;


        var verts = this.cube.vertices();


        for (var g = 0; g < 5000; g++) {
            var x = this.getRandomInt(-100, 100);
            var y = this.getRandomInt(0, 0);
            var z = this.getRandomInt(-100, 100);

            for (var i = 0; i < verts.length; i += 3) {

                var newVerts = [];

                //object coordinates
                newVerts.push(verts[i]);
                newVerts.push(verts[i + 1]);
                newVerts.push(verts[i + 2]);
                //world xyx
                newVerts.push(x);
                newVerts.push(y);
                newVerts.push(z);
                //number of the object
                newVerts.push(g);
                newVerts.push(g);
                newVerts.push(g);

                this.combinedMeshes.vertices.push.apply(this.combinedMeshes.vertices, newVerts);
            }


            this.vertexPositionBuffer.nums += verts.length / 3;


        }
        //console.log(this.combinedMeshes);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.combinedMeshes.vertices), gl.STATIC_DRAW);

    }

    textureFromPixelArray(dataArray, type, width, height) {
        var dataTypedArray = new Uint8Array(dataArray); // Don't need to do this if the data is already in a typed array
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
        // Other texture setup here, like filter modes and mipmap generation
        return texture;
    }


    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    createTexture(elapsed) {

        this.megaElapsedTotal += elapsed;
        if (this.megaElapsedTotal > 100 || this.monstermap == null) {

            this.megaElapsedTotal = 0;
            var b = new ArrayBuffer(128 * 128 * 4);
            var v1 = new Uint8Array(b);
            var g = 0;
            for (var i = 0; i < 128 * 128; i++) {

                if (this.randomIntFromInterval(0, 1) == 1) {
                 v1[g++] = 255;
                 v1[g++] = 255;
                 v1[g++] = 255;
                 v1[g++] = 255;

                  }
                   else {

                v1[g++] = 0;
                v1[g++] = 0;
                v1[g++] = 0;
                v1[g++] = 0;
                  }
            }


            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA,
                gl.UNSIGNED_BYTE, v1);
            gl.generateMipmap(gl.TEXTURE_2D);

            this.monstermap = texture;

        }


    }


    update(deltatime,timeSinceBeginning) {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];


            if (le.components.AsteroidComponent) {

                this.createTexture(deltatime);
            }
        }
    }

    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];


            if (le.components.AsteroidComponent) {


                sm.setProgram(this.ambientProgram);

                gl.uniform3fv(this.ambientProgram.uCameraPos, [camera.x, camera.y, camera.z]);
                //gl.uniform3fv(this.ambientProgram.uCameraPos, [0, 20, -20]);
                gl.uniformMatrix4fv(this.ambientProgram.uPMatrix, false, camera.pMatrix);

                var timeNow = new Date().getTime();

                if (this.lastTime != 0) {

                    var elapsed = timeNow - this.lastTime;
                    this.elapsedTotal += elapsed;
                    gl.uniform1f(this.ambientProgram.uElapsed, this.elapsedTotal.toFixed(1));


                }

                gl.uniform1f(this.ambientProgram.uElapsed, 0);
                this.lastTime = timeNow;


                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.monstermap);
                gl.uniform1i(this.ambientProgram.uVisibility, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.vertexAttribPointer(this.ambientProgram.aVertexPosition, 3, gl.FLOAT, false, 36, 0);
                gl.vertexAttribPointer(this.ambientProgram.aWorldCoordinates, 3, gl.FLOAT, false, 36, 12);
                gl.vertexAttribPointer(this.ambientProgram.aCubeNumber, 3, gl.FLOAT, false, 36, 24);


                gl.drawArrays(gl.TRIANGLES, 0, this.vertexPositionBuffer.nums);
                camera.drawCalls++;
            }
        }
    }
}