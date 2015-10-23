function endState(sb) {
    'use strict';

    var gl = sb.getGL();
    /*
     constructor(canvas) {
     this.background = null;
     this.shaderProgram = null;

     }
     */
    var draw = function() {

        //sm.setProgram(this.shaderProgram);

        /*
         gl.disable(gl.BLEND);
         gl.enable(gl.DEPTH_TEST);



         gl.uniform1f(this.shaderProgram.alphaUniform, 1);
         gl.uniform1i(this.shaderProgram.uDrawColors, 0);
         gl.bindFramebuffer(gl.FRAMEBUFFER, null);


         //draw background
         camera.mvPushMatrix();
         mat4.translate(camera.mvMatrix, [0, 0, -50]);
         mat4.scale(camera.mvMatrix, [0.05, 0.05, 0.05]);


         gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.vertexPositionBuffer);
         gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


         gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.normalPositionBuffer);
         gl.vertexAttribPointer(this.shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


         gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.texturePositionBuffer);
         gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, this.intro.texture);


         gl.uniform1i(this.shaderProgram.samplerUniform, 0);

         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.intro.indexPositionBuffer);

         gl.uniformMatrix4fv(this.shaderProgram.uPMatrix, false, camera.pMatrix);
         gl.uniformMatrix4fv(this.shaderProgram.uMVMatrix, false, camera.mvMatrix);

         var normalMatrix = mat3.create();
         mat4.toInverseMat3(camera.mvMatrix, normalMatrix);
         mat3.transpose(normalMatrix);
         gl.uniformMatrix3fv(this.shaderProgram.uNMatrix, false, normalMatrix);


         gl.drawElements(gl.TRIANGLES, this.intro.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);

         camera.mvPopMatrix();
         */

    };

    var init = function() {
        /*

         //global
         this.intro = mm.getOrAddMesh('end');
         actionMapper = new EndStateActionMapper();

         document.onkeydown = actionMapper.handleKeyDown;
         document.onkeyup = actionMapper.handleKeyUp;
         document.onmousemove = actionMapper.handleMouseMove;
         document.onmousedown = actionMapper.handleMouseDown;


         //simplestProgram = initSimplestShaders("simplest");
         this.shaderProgram = sm.init("per-fragment-lighting");

         //this.background = new Mesh('start');

         //gl.clearColor(1, 0, 0, 1.0);


         //gl.clearDepth(1.0);


         gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


         camera.setPerspective();


         //camera.setPos(0,0,-10,0);
         mat4.identity(camera.mvMatrix);
         mat4.translate(camera.mvMatrix, [0, 0, -10]);
         */

    };

    var cleanup = function() {
        /*

         document.onkeydown = null;
         document.onkeyup = null;
         document.onmousemove = null;
         document.onmousedown = null;
         actionMapper = null;
         currentlyPressedKeys = {};
         */
    };

    var update = function() {
        //actionMapper.handleKeys();
    };
    return Object.freeze({
        update,
        init,
        draw,
        cleanup
    });

}