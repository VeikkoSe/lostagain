class MapProcess extends Processor {
    constructor() {

        this.vertexPositionBuffer = gl.createBuffer();
        this.texturePositionBuffer = gl.createBuffer();

        this.mapProgram = sm.init('maps');





        this.hexagon = new Hexagon(4);




    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    update() {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MapComponent) {
                var mc = le.components.MapComponent;

                this.hexagon.updateArea(mc.movingUp,mc.movingDown,mc.movingLeft,mc.movingRight,mc.selecting);

            }
        }
    }

    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MapComponent) {
                var mc = le.components.MapComponent;

                sm.setProgram(this.mapProgram);


                camera.mvPushMatrix();
                gl.uniformMatrix4fv(this.mapProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.mapProgram.uMVMatrix, false, camera.mvMatrix);


                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.hexagon.area), gl.STATIC_DRAW);
                gl.vertexAttribPointer(this.mapProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.hexagon.textureCoordinates), gl.STATIC_DRAW);

                gl.vertexAttribPointer(this.mapProgram.aTextureCoord, 2, gl.FLOAT, false, 0, 0);


                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.hexagon.texture);
                gl.uniform1i(this.mapProgram.samplerUniform, 0);


                gl.drawArrays(gl.TRIANGLES, 0, (this.hexagon.hexsizeX * (this.hexagon.hexsizeY)) * 12);
                //gl.drawArrays(gl.TRIANGLES, 0,12);
                camera.drawCalls++;

                camera.mvPopMatrix();
            }

        }
    }

}
