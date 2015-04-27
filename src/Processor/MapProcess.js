class MapProcess extends Processor {
    constructor() {
        this.simplestProgram = sm.init('simplest');
    }
    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.MapComponent) {
                sm.setProgram(this.simplestProgram);
                var ftc = le.components.MapComponent;


                camera.mvPushMatrix();

                mat4.translate(camera.mvMatrix, [0, 0, 0]);
                mat4.scale(camera.mvMatrix, [10, 10, 10]);

                gl.bindBuffer(gl.ARRAY_BUFFER, ftc.map.vertexPositionBuffer);
                gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ftc.map.indexPositionBuffer);

                gl.drawElements(gl.LINES, ftc.map.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
                camera.drawCalls++;

                camera.mvPopMatrix();

                // }

            }
        }
    }

}