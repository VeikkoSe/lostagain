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

        this.currentLevel = 0;


    }

    init() {


        this.elapsedTotal = 0;
        this.lastTime = 0;
        this.loadPercent = 0;
        this.rotationSpeed = 50;
        this.rotationAngle = 0;


        //fontProgram = initFontShaders('font');
        //simplestProgram = initSimplestShaders('simplest');
        this.currentLevel += 1;
        if (this.currentLevel > 2) {
            this.currentLevel = 1;
        }

        levelManager.loadLevel(this.currentLevel);

        gl.useProgram(simplestProgram);

        mat4.identity(camera.mvMatrix);
        mat4.translate(camera.mvMatrix, [0, 0, -10]);

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

                    game.stateEngine.changeState(levelManager.nextState);
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

    draw() {

        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //this.textProcess.draw();


        //gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);


        //gl.clearColor(0, 0, 0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        //gl.clearColor(1, 1, 0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        camera.mvPushMatrix();


        mat4.rotate(camera.mvMatrix, helpers.degToRad(this.rotationAngle), [0, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);


        gl.vertexAttribPointer(simplestProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(simplestProgram.uPMatrix, false, camera.pMatrix);

        gl.uniformMatrix4fv(simplestProgram.uMVMatrix, false, camera.mvMatrix);
        gl.drawArrays(gl.LINES, 0, 2);


        camera.mvPopMatrix();


    }


}