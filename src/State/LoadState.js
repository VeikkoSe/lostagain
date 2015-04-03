class LoadState extends StateEngine {

    constructor(canvas) {


        this.elapsedTotal = 0;
        this.lastTime = 0;
        this.loadPercent = 0;
        this.rotationSpeed = 50;
        this.rotationAngle = 0;


        this.points = [];
        this.points.push(-0.5, 0, 0);
        this.points.push(0.5, 0, 0);


        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);

        //this.currentLevel = 0;


    }

    init(wantedState) {


        //this.intro = mm.getOrAddMesh('start');
        this.elapsedTotal = 0;
        this.lastTime = 0;
        this.loadPercent = 0;
        this.rotationSpeed = 50;
        this.rotationAngle = 0;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        //camera.setPerspective();

        simplestProgram = sm.init('simplest');
        //  this.currentLevel += 1;
        // if (this.currentLevel > 2) {
        //     this.currentLevel = 1;
        // }
//

        levelManager.loadAllAssets(wantedState);

        //gl.useProgram(simplestProgram);


        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        camera.setPerspective();

        //gl.useProgram(shaderProgram);
        mat4.identity(camera.mvMatrix);
        mat4.translate(camera.mvMatrix, [0, 0, -10]);

    }

    draw() {
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);

        /*
         //mat4.translate(camera.mvMatrix, [0, 0, -10]);


         gl.uniform1f(shaderProgram.alphaUniform, 1);
         gl.uniform1i(shaderProgram.uDrawColors, 0);
         gl.bindFramebuffer(gl.FRAMEBUFFER, null);
         //this.simpleRenderProcess.draw();

         //draw background
         camera.mvPushMatrix();
         mat4.translate(camera.mvMatrix, [0, 0, -50]);
         mat4.scale(camera.mvMatrix, [0.05, 0.05, 0.05]);

         //gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);


         gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.vertexPositionBuffer);
         gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


         gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.normalPositionBuffer);
         gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


         gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.texturePositionBuffer);
         gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, this.intro.texture);


         gl.uniform1i(shaderProgram.samplerUniform, 0);

         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.intro.indexPositionBuffer);

         helpers.setMatrixUniforms();


         gl.drawElements(gl.TRIANGLES, this.intro.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);

         camera.mvPopMatrix();
         */


        gl.useProgram(simplestProgram);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        this.points.push(-0.5, 0, 0);
        this.points.push(0.5, 0, 0);


        camera.mvPushMatrix();


        mat4.rotate(camera.mvMatrix, helpers.degToRad(this.rotationAngle), [0, 0, 1]);


        gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(simplestProgram.aVertexPosition);

        gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


        var attribLocation = 1;


        gl.drawArrays(gl.LINES, 0, 2);

        camera.mvPopMatrix();


    }

    update() {


        var timeNow = new Date().getTime();


        if (this.lastTime != 0) {

            var elapsed = timeNow - this.lastTime;
            this.elapsedTotal += elapsed;
            //console.log(levelManager.loadTotal + '/' + levelManager.maxLoad);
            this.rotationAngle += (this.rotationSpeed * (elapsed / 1000));
            if (this.rotationAngle >= 360)
                this.rotationAngle = 0;

            if (this.elapsedTotal >= 200) {


                if (levelManager.loading == false && levelManager.loadTotal == 0) {

                    game.stateEngine.changeState('gamestate');
                }
                else {
                    this.loadPercent = 100 - ( levelManager.loadTotal / levelManager.maxLoad * 100);
                    this.rotationSpeed += this.loadPercent;


                }


                this.elapsedTotal -= 200;

            }
        }
        this.lastTime = timeNow;


    }


}