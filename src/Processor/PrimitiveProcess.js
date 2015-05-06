class PrimitiveProcess extends Processor {
    constructor() {
        this.vertexPositionBuffer = gl.createBuffer();
        this.simplestProgram = sm.init('simplest');

    }


    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.PrimitiveComponent && le.components.Renderable) {

                sm.setProgram(this.simplestProgram);
                //var re = le.components.Renderable;
                //var p = {x: re.xPos, y: re.yPos, z: re.zPos};

                //this.points = this.circleXY(p, ;

                camera.mvPushMatrix();
                gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
                var c= le.components.PrimitiveComponent.color;

                gl.uniform4f(this.simplestProgram.uColor, c[0], c[1], c[2],1.0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.PrimitiveComponent.points), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(this.simplestProgram.aVertexPosition);
                gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.drawArrays(gl.TRIANGLES, 0, le.components.PrimitiveComponent.points.length / 3);
                camera.drawCalls++;

                camera.mvPopMatrix();
            }

        }
    }


}