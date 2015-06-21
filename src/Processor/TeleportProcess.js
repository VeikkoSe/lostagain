function teleport_process_constructor(sb) {
    //class TeleportProcess extends Processor {
    //}
    //constructor() {
    let vertexPositionBuffer = gl.createBuffer();
    let simplestProgram = sm.init('simplest');
    let em = sb.getEntityManager();
    let gl = sb.getGL();
    let camera = sb.getCamera();
    //}


    let update = function (deltatime, totalElapsed) {


        let ms = em.getEntityByName('mothership');
        let ship = em.getEntityByName('ship');

        if (ms && ship) {


            if (totalElapsed > 2000)
                ms.components.JumpArea.visible = true;

            ms.components.JumpArea.points = circleXY({
                x: ms.components.Renderable.xPos,
                y: 0,
                z: ms.components.Renderable.zPos
            }, ms.components.JumpArea.radius, ms.components.JumpArea.pointAmount);

            if (!isInCircle(ms.components.Renderable.xPos,
                    ms.components.Renderable.zPos,
                    ms.components.JumpArea.radius,
                    ship.components.Renderable.xPos,
                    ship.components.Renderable.zPos)
            ) {
                let dirX = ms.components.Renderable.xPos - ship.components.Renderable.xPos;
                let dirZ = ms.components.Renderable.zPos - ship.components.Renderable.zPos;

                let origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                //normalize
                let dirXnormal = dirX / origHyp;
                let dirZnormal = dirZ / origHyp;

                //we get new vector that is in same direction but always inside the circle
                dirX = (ms.components.JumpArea.radius - 1) * dirXnormal;
                dirZ = (ms.components.JumpArea.radius - 1) * dirZnormal;


                let posx = dirX + ms.components.Renderable.xPos;
                let posZ = dirZ + ms.components.Renderable.zPos;


                ship.components.Renderable.xPos = posx;
                ship.components.Renderable.zPos = posZ;

                for (let i = 0; i < ship.components.MultiExhaustComponent.exhaustComponents.length; i++) {
                    ship.components.MultiExhaustComponent.exhaustComponents[i].points = [];
                    ship.components.MultiExhaustComponent.exhaustComponents[i].flow = [];
                }
                //ship.components.ExhaustComponent.points = [];
                //ship.components.ExhaustComponent.flow = [];

            }
        }
    }


    let draw = function () {

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.JumpArea && le.components.JumpArea.visible == true) {

                sm.setProgram(simplestProgram);


                camera.mvPushMatrix();
                gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);
                let c = le.components.JumpArea.color;

                gl.uniform4f(simplestProgram.uColor, c[0], c[1], c[2], 1.0);

                gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.JumpArea.points), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(simplestProgram.aVertexPosition);
                gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.drawArrays(gl.LINES, 0, le.components.JumpArea.points.length / 3);
                camera.drawCalls++;

                camera.mvPopMatrix();
            }

        }
    }


    let isInCircle = function (centerX, centerY, radius, x, y) {
        return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
    }

    let isInRectangle = function (centerX, centerY, radius, x, y) {
        return x >= centerX - radius && x <= centerX + radius &&
            y >= centerY - radius && y <= centerY + radius;
    }

    let getOppositeAngle = function (angle) {
        //angle = angle * Math.PI/180;
        let ret = false;
        if (angle > 180)
            ret = angle - 180;
        else if (angle < 180)
            ret = angle + 180;


        return ret;

    }
    return {}

}



