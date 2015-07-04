function teleport_process_constructor(sb) {
    //class TeleportProcess extends Processor {
    //}
    //constructor() {

    let shadermanager = sb.getShaderManager();
    let simplestProgram = shadermanager.useShader("simplest");

    let em = sb.getEntityManager();
    let gl = sb.getGL();
    let camera = sb.getCamera();

    //}


    let update = function (deltatime, totalElapsed) {

        return false;
        let ms = em.getEntityByName('mothership');
        let ship = em.getEntityByName('ship');

        if (ms && ship) {


            if (totalElapsed > 2000)
                ms.components.JumpAreaComponent.visible = true;

            ms.components.JumpAreaComponent.points = circleXY({
                x: ms.components.RenderableComponent.xPos,
                y: 0,
                z: ms.components.RenderableComponent.zPos
            }, ms.components.JumpAreaComponent.radius, ms.components.JumpAreaComponent.pointAmount);

            if (!isInCircle(ms.components.RenderableComponent.xPos,
                    ms.components.RenderableComponent.zPos,
                    ms.components.JumpAreaComponent.radius,
                    ship.components.RenderableComponent.xPos,
                    ship.components.RenderableComponent.zPos)
            ) {
                let dirX = ms.components.RenderableComponent.xPos - ship.components.RenderableComponent.xPos;
                let dirZ = ms.components.RenderableComponent.zPos - ship.components.RenderableComponent.zPos;

                let origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                //normalize
                let dirXnormal = dirX / origHyp;
                let dirZnormal = dirZ / origHyp;

                //we get new vector that is in same direction but always inside the circle
                dirX = (ms.components.JumpAreaComponent.radius - 1) * dirXnormal;
                dirZ = (ms.components.JumpAreaComponent.radius - 1) * dirZnormal;


                let posx = dirX + ms.components.RenderableComponent.xPos;
                let posZ = dirZ + ms.components.RenderableComponent.zPos;


                ship.components.RenderableComponent.xPos = posx;
                ship.components.RenderableComponent.zPos = posZ;

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

            if (le.components.JumpAreaComponent && le.components.JumpAreaComponent.visible === true) {

                shadermanager.setProgram(simplestProgram);


                let mvMatrix = camera.getMVMatrix();

                //camera.mvPushMatrix();
                gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.getPMatrix());
                gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, mvMatrix);
                let c = le.components.JumpAreaComponent.color;

                gl.uniform4f(simplestProgram.uColor, c[0], c[1], c[2], 1.0);

                gl.bindBuffer(gl.ARRAY_BUFFER, le.components.JumpAreaComponent.vertexPositionBuffer);

                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.JumpAreaComponent.points), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(simplestProgram.aVertexPosition);
                gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.drawArrays(gl.LINES, 0, le.components.JumpAreaComponent.points.length / 3);
                //camera.drawCalls++;

                //camera.mvPopMatrix();
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
    return {
        draw, update, init: function () {
        }
    }

}



