function introState(sb) {
    'use strict';

    //var {game} = params;

    //var shadermanager = shader_manager_constuctor();
    //var shaderprogram = shadermanager.init("per-fragment-lighting");
    //var assetmanager = asset_manager_constructor();
    //var camera = game.camera;
    //var intro = assetmanager.getMesh('start');
    //  var actionMapper = intro_action_mapper(sb);
    var processList = [];
    var camera = sb.getCamera();
    var gl = sb.getGL();

    var draw = function() {

        for (var i = 0; i < processList.length; i++) {
            processList[i].draw(sb);
        }
        /*
         shadermanager.setProgram(shaderprogram);

         gl.disable(gl.BLEND);
         gl.enable(gl.DEPTH_TEST);


         gl.uniform1f(shaderprogram.alphaUniform, 1);
         gl.uniform1i(shaderprogram.uDrawColors, 0);
         gl.bindFramebuffer(gl.FRAMEBUFFER, null);


         //draw background
         camera.mvPushMatrix();
         mat4.scale(camera.getMVMatrix(), [0.05, 0.05, 0.05]);


         gl.bindBuffer(gl.ARRAY_BUFFER, intro.vertexPositionBuffer);
         gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


         gl.bindBuffer(gl.ARRAY_BUFFER, intro.normalPositionBuffer);
         gl.vertexAttribPointer(shaderprogram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


         gl.bindBuffer(gl.ARRAY_BUFFER, intro.texturePositionBuffer);
         gl.vertexAttribPointer(shaderprogram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, intro.getTexture());


         gl.uniform1i(shaderprogram.samplerUniform, 0);

         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, intro.indexPositionBuffer);

         gl.uniformMatrix4fv(shaderprogram.uPMatrix, false, camera.getPMatrix());
         gl.uniformMatrix4fv(shaderprogram.uMVMatrix, false, camera.getMVMatrix());

         var normalMatrix = mat3.create();
         mat4.toInverseMat3(camera.getMVMatrix(), normalMatrix);
         mat3.transpose(normalMatrix);
         gl.uniformMatrix3fv(shaderprogram.uNMatrix, false, normalMatrix);


         gl.drawElements(gl.TRIANGLES, intro.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);

         camera.mvPopMatrix();
         */

    };

    var subscribe = function() {

    };

    var init = function() {

        processList.push(renderProcess(sb));

        /*
         document.onkeydown = actionMapper.handleKeyDown;
         document.onkeyup = actionMapper.handleKeyUp;
         document.onmousemove = actionMapper.handleMouseMove;
         document.onmousedown = actionMapper.handleMouseDown;
         */

        gl.clearColor(1, 0, 0, 1.0);
        gl.clearDepth(1.0);

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        camera.init();
        camera.setPerspective();

        mat4.identity(camera.getMVMatrix());
        mat4.translate(camera.getMVMatrix(), [0, 0, -50]);

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
        // actionMapper.handleKeys();
    };

    return Object.freeze({
        init,
        subscribe,
        draw,
        update,
        cleanup
    });
}