class GameState extends StateEngine {

    constructor(canvas) {

        this.renderProcess = new RenderProcess();
        this.simpleRenderProcess = new SimpleRenderProcess();

        this.planeProcess = new PlaneProcess();
        this.healthProcess = new HealthProcess();
        this.shieldProcess = new ShieldProcess();
        this.linearMovementProcess = new LinearMovementProcess();
        this.momentumMovementProcess = new MomentumMovementProcess();
        this.cameraControllerProcess = new CameraControllerProcess();
        this.primitiveProcess = new PrimitiveProcess();

        this.ef = new EntityFactory();

        this.elapsedTotal = 0;
        this.megaElapsedTotal = 0;
        this.frameCount = 0;
        this.lastTime = 0;

    }

    init() {

        particleProgram = initParticleShaders("particle");

        //simplestProgram = initSimplestShaders("simplest");
        shaderProgram = initShaders("per-fragment-lighting");
        ambientProgram = initAmbientShaders('ambient');

        //Light uniforms
        //var x = $('#slider-x').slider("value");
       // var y = $('#slider-y').slider("value");
        //var z = $('#slider-z').slider("value");





        //shaderProgram = initShaders("per-fragment-lighting");

        gl.enable(gl.CULL_FACE);

        gl.clearColor(0, 0, 0, 1.0);
        gl.clearDepth(1.0);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);

        //gl.enable(gl.BLEND);
        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        //this.ef.createPlane();
        this.ef.createMotherShip();
        this.ef.createShip();
        //for(var i=0;i<500;i++)
        this.ef.createBox();


        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);





        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 5000.0, camera.pMatrix);
        mat4.identity(camera.mvMatrix);
        mat4.rotate(camera.mvMatrix, camera.rotation, [1, 0, 0]);
        mat4.translate(camera.mvMatrix, [camera.x, camera.y, camera.z]);
        //mat4.multiply(camera.pMatrix, camera.mvMatrix, camera.pvMatrix);





    }


    animate() {

        var timeNow = new Date().getTime();

        this.frameCount++;

        //if(this.frameCount>200)
        //    this.frameCount = 200;

        if (this.lastTime != 0) {
            var elapsed = timeNow - this.lastTime;
            this.elapsedTotal += elapsed;
            //this.characterProcess.update(elapsed);
            this.linearMovementProcess.update(elapsed);
            this.momentumMovementProcess.update(elapsed);
            this.cameraControllerProcess.update(elapsed);
            //this.createTexture(elapsed);
            actionMapper.handleKeys();


            if (this.elapsedTotal >= 1000) {
                var fps = this.frameCount;
                this.frameCount = 0;
                this.elapsedTotal -= 1000;

                if (fps < 59)
                    document.getElementById('fps').style.color = 'red';
                else
                    document.getElementById('fps').style.color = 'green';
                document.getElementById('fps').innerHTML = fps;
            }
        }
        this.lastTime = timeNow;




    }
    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    createTexture(elapsed) {
        this.megaElapsedTotal += elapsed;
        if(this.megaElapsedTotal>1000 || monstermap == null)
        {

            this.megaElapsedTotal = 0;
        var b = new ArrayBuffer(128*128*4);
        var v1 = new Uint8Array(b);
        var g = 0;
        for ( var i=0; i<128*128; i++ )
        {
            if(this.randomIntFromInterval(0,1)==1)
            {

            v1[g++] = 255;
            v1[g++] = 255;
            v1[g++] = 255;
            v1[g++] = 255;
            }
            else
            {

            v1[g++] = 0;
            v1[g++] = 0;
            v1[g++] = 0;
            v1[g++] = 0;
            }
        }


        var texture = gl.createTexture () ;
        gl.bindTexture  ( gl.TEXTURE_2D, texture ) ;
        //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR ) ;
        //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR ) ;
        //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
        //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;
        gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA,
            gl.UNSIGNED_BYTE, v1);
        gl.generateMipmap ( gl.TEXTURE_2D ) ;

            monstermap = texture;

        }


    }


    render() {



        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.identity(camera.mvMatrix);

        //mat4.translate(camera.mvMatrix, [camera.x, camera.y, camera.z]);

        camera.move();

        gl.useProgram(shaderProgram);


        gl.uniform1i(shaderProgram.uUseLighting, 0);
        gl.uniform1f(shaderProgram.alphaUniform, 1);




        gl.uniform1i(shaderProgram.uDrawColors, 0);
        this.simpleRenderProcess.draw();

        /* asteroids  */
        gl.useProgram(ambientProgram);
        gl.uniformMatrix4fv(ambientProgram.uPMatrix, false, camera.pMatrix);
        gl.uniform3fv(ambientProgram.uCameraPos,  [0,0,-400]);
        this.renderProcess.draw();





        //off-screen rendering
        //gl.bindFramebuffer(gl.FRAMEBUFFER, picker.framebuffer);
        //gl.uniform1i(shaderProgram.uDrawColors, 1);
        //this.drawScene();


        //on-screen rendering

        //this.drawScene();

        gl.useProgram(particleProgram);
        this.healthProcess.draw();
        this.shieldProcess.draw();


       // gl.useProgram(simplestProgram);
        //this.planeProcess.draw();
        //this.primitiveProcess.draw();
    }

    drawScene() {





        // this.twodrenderProcess.draw();
        //this.terrainProcess.draw();


    }


}