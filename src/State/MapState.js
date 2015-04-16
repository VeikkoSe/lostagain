class MapState extends StateEngine {

    constructor(canvas) {

        this.wall = null;

        this.starProcess = new StarProcess();
        this.wall = mm.getOrAddMesh('maps');

    }

    draw() {

        //gl.useProgram(starProgram);
        //this.starProcess.draw();


        sm.setProgram(shaderProgram);


        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);


        gl.uniform1f(shaderProgram.alphaUniform, 1);
        gl.uniform1i(shaderProgram.uDrawColors, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);


        camera.mvPushMatrix();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.wall.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.wall.normalPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.wall.texturePositionBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.wall.texture);


        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wall.indexPositionBuffer);

        helpers.setMatrixUniforms();


        gl.drawElements(gl.TRIANGLES, this.wall.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        camera.mvPopMatrix();


    }


    init() {



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


        //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        //camera.setPerspective();


        mat4.identity(camera.mvMatrix);
        mat4.translate(camera.mvMatrix, [0, 0, -90]);


    }


    update() {

        actionMapper.handleKeys();
    }

    cleanup() {

        document.onkeydown = null;
        document.onkeyup = null;
        document.onmousemove = null;
        document.onmousedown = null;
        actionMapper = null;
        currentlyPressedKeys = {};
    }


}