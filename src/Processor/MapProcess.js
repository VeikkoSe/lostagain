class MapProcess extends Processor {
    constructor() {
        this.vertexPositionBuffer = gl.createBuffer();
        this.simplestProgram = sm.init('simplest');
        this.hexagon = new Hexagon(5);
    }


    update() {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MapComponent) {
                var mc = le.components.MapComponent;

                this.hexagon.updateArea(mc.holes,mc.visited,mc.xPlayerPos,mc.yPlayerPos);

            }
        }
    }

    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MapComponent) {

                sm.setProgram(this.simplestProgram);
                //var re = le.components.Renderable;
                //var p = {x: re.xPos, y: re.yPos, z: re.zPos};

                //this.points = this.circleXY(p, ;


                //var hg = this.hexagon.

                camera.mvPushMatrix();
                gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
                //var c= le.components.PrimitiveComponent.color;

                gl.uniform4f(this.simplestProgram.uColor, 1.0, 1.0, 1.0,1.0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.hexagon.area), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(this.simplestProgram.aVertexPosition);
                gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.drawArrays(gl.TRIANGLES, 0, this.hexagon.area.length / 3);
                camera.drawCalls++;

                camera.mvPopMatrix();
            }

        }
    }

}
