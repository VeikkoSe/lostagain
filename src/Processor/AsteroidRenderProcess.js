function asteroidrenderprocess_constructor(sb) {

    let normalMatrix = mat3.create();

    let megaElapsedTotal = 0;

    let ambientProgram = sm.init('ambient');

    let monstermap = null;
    let lastTime = 0;
    let vertexPositionBuffer = gl.createBuffer();

    let cube = cube_constructor();

    let camera = sb.getCamera();
    let gl = sb.getGL();

    let elapsedTotal = 0;


    let lastTime = 0;


    let combinedMeshes = {};


    let verts = cube.vertices();

    let init = function () {


        vertexPositionBuffer.nums = 0;
        combinedMeshes.vertices = [];
        vertexPositionBuffer.nums = 0;


        for (let g = 0; g < 5000; g++) {
            let x = getRandomInt(-100, 100);
            let y = getRandomInt(0, 0);
            let z = getRandomInt(-100, 100);

            for (let i = 0; i < verts.length; i += 3) {

                let newVerts = [];

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

                combinedMeshes.vertices.push.apply(combinedMeshes.vertices, newVerts);
            }


            vertexPositionBuffer.nums += verts.length / 3;


        }


        //console.log(this.combinedMeshes);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(combinedMeshes.vertices), gl.STATIC_DRAW);
    }


    let textureFromPixelArray = function (dataArray, type, width, height) {
        let dataTypedArray = new Uint8Array(dataArray); // Don't need to do this if the data is already in a typed array
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
        // Other texture setup here, like filter modes and mipmap generation
        return texture;
    }

    /*
     let randomIntFromInterval(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
     }
     */
    /*
     getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
     }

     */
    let createTexture = function (elapsed) {

        megaElapsedTotal += elapsed;
        if (megaElapsedTotal > 100 || monstermap == null) {

            megaElapsedTotal = 0;
            let b = new ArrayBuffer(128 * 128 * 4);
            let v1 = new Uint8Array(b);
            let g = 0;
            for (let i = 0; i < 128 * 128; i++) {

                if (randomIntFromInterval(0, 1) == 1) {
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


            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA,
                gl.UNSIGNED_BYTE, v1);
            gl.generateMipmap(gl.TEXTURE_2D);

            monstermap = texture;

        }


    }


    let update = function (deltatime, timeSinceBeginning) {
        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];


            if (le.components.AsteroidComponent) {

                createTexture(deltatime);
            }
        }
    }

    let draw = function () {

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];


            if (le.components.AsteroidComponent) {


                sm.setProgram(this.ambientProgram);

                gl.uniform3fv(ambientProgram.uCameraPos, [camera.getX(), camera.getY(), camera.getZ()]);
                //gl.uniform3fv(this.ambientProgram.uCameraPos, [0, 20, -20]);
                gl.uniformMatrix4fv(ambientProgram.uPMatrix, false, camera.getPMatrix());

                let timeNow = new Date().getTime();

                if (this.lastTime != 0) {

                    let elapsed = timeNow - this.lastTime;
                    this.elapsedTotal += elapsed;
                    gl.uniform1f(ambientProgram.uElapsed, elapsedTotal.toFixed(1));


                }

                gl.uniform1f(ambientProgram.uElapsed, 0);
                this.lastTime = timeNow;


                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.monstermap);
                gl.uniform1i(ambientProgram.uVisibility, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.vertexAttribPointer(ambientProgram.aVertexPosition, 3, gl.FLOAT, false, 36, 0);
                gl.vertexAttribPointer(ambientProgram.aWorldCoordinates, 3, gl.FLOAT, false, 36, 12);
                gl.vertexAttribPointer(ambientProgram.aCubeNumber, 3, gl.FLOAT, false, 36, 24);


                gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.nums);
                camera.drawCalls++;
            }
        }
    }
    return {}
}