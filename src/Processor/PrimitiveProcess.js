function PrimitiveProcess(sb) {
    'use strict';

    //constructor() {
    var gl = sb.getGL();
    var vertexPositionBuffer = gl.createBuffer();
    var em = sb.getEntityManager();
    var shadermanager = sb.getShaderManager();
    var simplestProgram = shadermanager.useShader('simplest');

    var camera = sb.getCamera();

    //}

    var draw = function(le) {

        //for (var e = 0; e < em.entities.length; e++) {
        //  var le = em.entities[e];

        if (le.components.PrimitiveComponent && le.components.RenderableComponent) {

            sm.setProgram(this.simplestProgram);
            //var re = le.components.Renderable;
            //var p = {x: re.xPos, y: re.yPos, z: re.zPos};

            //this.points = this.circleXY(p, ;

            camera.mvPushMatrix();
            gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.getMVMatrix());
            var c = le.components.PrimitiveComponent.color;

            gl.uniform4f(simplestProgram.uColor, c[0], c[1], c[2], 1.0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(le.components.PrimitiveComponent.points), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(simplestProgram.aVertexPosition);
            gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.LINES, 0, le.components.PrimitiveComponent.points.length / 3);
            camera.addDrawCall();

            camera.mvPopMatrix();
        }

        // }
    };

    return {
        update: function() {
        }, draw, init: function() {
        }
    };

}