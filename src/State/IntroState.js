function introstate_constructor(sb) {
    //let {game} = params;

    //let shadermanager = shader_manager_constuctor();
    //let shaderprogram = shadermanager.init("per-fragment-lighting");
    //let assetmanager = asset_manager_constructor();
    //let camera = game.camera;
    //let intro = assetmanager.getMesh('start');
    let actionMapper = intro_action_mapper(sb);
    let processList = [];
    let camera = sb.getCamera();
    let gl = sb.getGL();


    let draw = function () {


        for (let i = 0; i < processList.length; i++) {
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

         let normalMatrix = mat3.create();
         mat4.toInverseMat3(camera.getMVMatrix(), normalMatrix);
         mat3.transpose(normalMatrix);
         gl.uniformMatrix3fv(shaderprogram.uNMatrix, false, normalMatrix);


         gl.drawElements(gl.TRIANGLES, intro.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);

         camera.mvPopMatrix();
         */

    };

    let subscribe = function () {

    }


    let init = function () {


        processList.push(renderprocess_constructor(sb));


        document.onkeydown = actionMapper.handleKeyDown;
        document.onkeyup = actionMapper.handleKeyUp;
        document.onmousemove = actionMapper.handleMouseMove;
        document.onmousedown = actionMapper.handleMouseDown;


        gl.clearColor(1, 0, 0, 1.0);
        gl.clearDepth(1.0);

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        camera.init();
        camera.setPerspective();

        mat4.identity(camera.getMVMatrix());
        mat4.translate(camera.getMVMatrix(), [0, 0, -50]);


    };

    let cleanup = function () {
        /*
         document.onkeydown = null;
         document.onkeyup = null;
         document.onmousemove = null;
         document.onmousedown = null;
         actionMapper = null;
         currentlyPressedKeys = {};
         */
    };


    let update = function () {
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