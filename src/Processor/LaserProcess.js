class LaserProcess extends Processor {
    constructor() {


        this.lastTime = 0;
        this.elapsedTotal = 0;
        this.x = 0;
        // this.framebuffer = null;
        //this.renderbuffer = null;


        //this.texture = null;
        // this.framebuffer = gl.createFramebuffer();

        var points = [];

        points.push(-50, 0, 0);
        points.push(20, 0, 0);

        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);


    }


    railXY(elapsed) {
        var points = [];
        //var stepSize = (end-start)/dots;
        //var stepSize = 1;
        var y = 0;
        var z = 0;

        if (this.x < -150)
            this.x = 0;

        this.x = (elapsed * 0.05);

        //this.x = 20;

        points.push(0, y, z);
        points.push(this.x, y, z);
        return points;
    }


    draw() {




        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.LaserComponent) {
                gl.useProgram(simplestProgram);
                // gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
                /*
                 gl.bindTexture(gl.TEXTURE_2D, this.texture);
                 gl.generateMipmap(gl.TEXTURE_2D);
                 gl.bindTexture(gl.TEXTURE_2D, null);
                 */


                var points = [];

                // var timeNow = new Date().getTime();


                //if (this.lastTime != 0) {


                //var elapsed = timeNow - this.lastTime;
                //this.elapsedTotal += elapsed;

                points = this.railXY(-1500);


                //gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);


                //gl.clearColor(0, 0, 0, 1.0);
                //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


                //gl.clearColor(1, 1, 0, 1.0);
                //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


                camera.mvPushMatrix();


                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);


                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);


                gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);
                gl.drawArrays(gl.LINES, 0, 2);
                camera.drawCalls++;

                camera.mvPopMatrix();


                //}
                //this.lastTime = timeNow;


            }

        }
    }
}