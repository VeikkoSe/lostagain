class TeleportProcess extends Processor {
    constructor() {
        this.vertexPositionBuffer = gl.createBuffer();
        this.simplestProgram = sm.init('simplest');
    }


    update(deltatime, totalElapsed) {


        var ms = em.getEntityByName('mothership');
        var ship = em.getEntityByName('ship');

        if (ms && ship) {

            if (totalElapsed > 2000)
                ms.components.JumpArea.visible = true;

            ms.components.JumpArea.points = circleXY({
                x: ms.components.Renderable.xPos,
                y: 0,
                z: ms.components.Renderable.zPos
            }, ms.components.JumpArea.radius, ms.components.JumpArea.pointAmount);

            if (!this.isInCircle(ms.components.Renderable.xPos,
                    ms.components.Renderable.zPos,
                    ms.components.JumpArea.radius,
                    ship.components.Renderable.xPos,
                    ship.components.Renderable.zPos)
            ) {
                var dirX = ms.components.Renderable.xPos - ship.components.Renderable.xPos;
                var dirZ = ms.components.Renderable.zPos - ship.components.Renderable.zPos;

                var origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                //normalize
                var dirXnormal = dirX / origHyp;
                var dirZnormal = dirZ / origHyp;

                //we get new vector that is in same direction but always inside the circle
                dirX = (ms.components.JumpArea.radius - 1) * dirXnormal;
                dirZ = (ms.components.JumpArea.radius - 1) * dirZnormal;


                var posx = dirX + ms.components.Renderable.xPos;
                var posZ = dirZ + ms.components.Renderable.zPos;


                ship.components.Renderable.xPos = posx;
                ship.components.Renderable.zPos = posZ;

                for (var i = 0; i < ship.components.MultiExhaustComponent.exhaustComponents.length; i++) {
                    ship.components.MultiExhaustComponent.exhaustComponents[i].points = [];
                    ship.components.MultiExhaustComponent.exhaustComponents[i].flow = [];
                }
                //ship.components.ExhaustComponent.points = [];
                //ship.components.ExhaustComponent.flow = [];

            }
        }
    }


    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.JumpArea && le.components.JumpArea.visible == true) {

                sm.setProgram(this.simplestProgram);


                camera.mvPushMatrix();
                gl.uniformMatrix4fv(this.simplestProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.simplestProgram.uMVMatrix, false, camera.mvMatrix);
                var c = le.components.JumpArea.color;

                gl.uniform4f(this.simplestProgram.uColor, c[0], c[1], c[2], 1.0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.JumpArea.points), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(this.simplestProgram.aVertexPosition);
                gl.vertexAttribPointer(this.simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.drawArrays(gl.LINES, 0, le.components.JumpArea.points.length / 3);
                camera.drawCalls++;

                camera.mvPopMatrix();
            }

        }
    }


    isInCircle(centerX, centerY, radius, x, y) {
        return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
    }

    isInRectangle(centerX, centerY, radius, x, y) {
        return x >= centerX - radius && x <= centerX + radius &&
            y >= centerY - radius && y <= centerY + radius;
    }

    getOppositeAngle(angle) {
        //angle = angle * Math.PI/180;
        var ret = false;
        if (angle > 180)
            ret = angle - 180;
        else if (angle < 180)
            ret = angle + 180;


        return ret;

    }


}



