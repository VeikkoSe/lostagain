class RenderProcess extends Processor {
    constructor() {
        this.normalMatrix = mat3.create();


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


        for (var g = 0; g < 10000; g++) {
            var x = this.getRandomInt(-250, 200);
            var z = this.getRandomInt(-50, 50);
            var y = this.getRandomInt(-50, 50);
            //var x =0;
            //var y = 0;
            //var z = 0;
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

    draw() {


        var timeNow = new Date().getTime();

        if (this.lastTime != 0) {

            var elapsed = timeNow - this.lastTime;
            this.elapsedTotal += elapsed;
            gl.uniform1f(ambientProgram.uElapsed, this.elapsedTotal.toFixed(1));


        }
        this.lastTime = timeNow;


        gl.activeTexture(gl.TEXTURE0);

        var texture = monstermap;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(ambientProgram.uVisibility, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(ambientProgram.aVertexPosition, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(ambientProgram.aWorldCoordinates, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(ambientProgram.aCubeNumber, 3, gl.FLOAT, false, 36, 24);


        gl.drawArrays(gl.TRIANGLES, 0, this.vertexPositionBuffer.nums);


    }
}