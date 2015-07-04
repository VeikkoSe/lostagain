function menustate_constructor(sb) {

    //constructor(canvas) {

    let wall = null;
    let gl = sb.getGL();

    let shadermanager = sb.getShaderManager();
    let shaderprogram = shadermanager.useShader("simplest");
    let camera = sb.getCamera();

    //}

    let draw = function () {


        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);


        gl.uniform1f(shaderprogram.alphaUniform, 1);
        gl.uniform1i(shaderprogram.uDrawColors, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);


        camera.mvPushMatrix();

        //mat4.translate(camera.mvMatrix, [0, 0, -50]);
        //mat4.scale(camera.mvMatrix, [0.05, 0.05, 0.05]);


        gl.bindBuffer(gl.ARRAY_BUFFER, wall.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, wall.normalPositionBuffer);
        gl.vertexAttribPointer(shaderprogram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, wall.texturePositionBuffer);
        gl.vertexAttribPointer(shaderprogram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, wall.texture);


        gl.uniform1i(shaderprogram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wall.indexPositionBuffer);

        setMatrixUniforms();


        gl.drawElements(gl.TRIANGLES, wall.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        camera.mvPopMatrix();


    }


    let init = function () {
        //global

        wall = mm.getOrAdd('menu');

        //console.log('init');

        actionMapper = new MapStateActionMapper();

        document.onkeydown = actionMapper.handleKeyDown;
        document.onkeyup = actionMapper.handleKeyUp;
        document.onmousemove = actionMapper.handleMouseMove;
        document.onmousedown = actionMapper.handleMouseDown;


        //simplestProgram = initSimplestShaders("simplest");
        //shaderProgram = initShaders("per-fragment-lighting");


        //gl.clearColor(1, 0, 0, 1.0);


        //gl.clearDepth(1.0);


        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();


        mat4.identity(camera.getMVMatrix());
        mat4.translate(camera.getMVMatrix(), [0, 0, -90]);
        //mat4.rotate(camera.mvMatrix, helpers.degToRad(-45),[0, 1, 0]);
        //mat4.rotate(camera.mvMatrix, helpers.degToRad(-70),[1, 0, 0]);
        //


        sm.setProgram(shaderProgram);


    }


    let update = function () {

        actionMapper.handleKeys();


    }

    let cleanup = function () {
        /*
         document.onkeydown = null;
         document.onkeyup = null;
         document.onmousemove = null;
         document.onmousedown = null;
         actionMapper = null;
         currentlyPressedKeys = {};
         */
    }
    return {};


}