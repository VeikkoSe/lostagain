class PrimitiveProcess extends Processor {
    constructor() {
        this.vertexPositionBuffer = gl.createBuffer();

    }

    circleXY(center, radius, dots) {
        var points = [];
        var stepSize = ((2 * Math.PI) / dots);
        var y = 0;
        for (var d = 0; d <= (2 * Math.PI) - stepSize; d += stepSize) {
            points.push(((Math.sin(d) * radius) + center.x)
                , y, (Math.cos(d) * radius) + center.z);
        }
        return points;
    }


    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.JumpArea && le.components.Renderable) {

                var re = le.components.Renderable;
                var p = {x: re.xPos, y: re.yPos, z: re.zPos};

                this.points = this.circleXY(p, le.components.JumpArea.radius, 250);

                camera.mvPushMatrix();
                gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(simplestProgram.aVertexPosition);
                gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.drawArrays(gl.POINTS, 0, this.points.length / 3);


                camera.mvPopMatrix();
            }

        }
    }


}