class GameState extends StateEngine {

    constructor(canvas) {

        this.postProcessState = true;


        this.elapsedTotal = 0;
        this.megaElapsedTotal = 0;
        this.frameCount = 0;
        this.lastTime = 0;


        //mh.addHandler(handler);

        this.processList = [];
        this.processList.push(new RenderProcess());

        //this.processList.push(new PlaneProcess());
        this.processList.push(new HealthProcess());
        this.processList.push(new ShieldProcess());
        this.processList.push(new TextProcess());
        this.processList.push(new LinearMovementProcess());
        this.processList.push(new MomentumMovementProcess());
        this.processList.push(new CameraControllerProcess());
        this.processList.push(new PrimitiveProcess());
        this.processList.push(new TeleportProcess());
        this.processList.push(new StarProcess());
        this.processList.push(new EnemyProcess());
        //this.processList.push(new GunProcess());
        //this.processList.push(new PostProcess());
        this.processList.push(new LaserProcess());


    }

    init() {


        actionMapper = new GameStateActionMapper();


        document.onkeydown = actionMapper.handleKeyDown;
        document.onkeyup = actionMapper.handleKeyUp;
        document.onmousemove = actionMapper.handleMouseMove;
        document.onmousedown = actionMapper.handleMouseDown;
        var event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        window.addEventListener(event, this.handleMouseWheel);


        //starProgram = initStarShaders('star');

        // fontProgram = initFontShaders("font");


        //Light uniforms
        //var x = $('#slider-x').slider("value");
        // var y = $('#slider-y').slider("value");
        //var z = $('#slider-z').slider("value");


        //gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        //gl.clearColor(1, 1, 1, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        //gl.clearDepth(1.0);


        //gl.depthFunc(gl.LESS);


        //gl.enable(gl.BLEND);

        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();


        //camera.move();

        //camera.setDistance(600);
        ///camera.setRotation(45);

        //mat4.identity(camera.mvMatrix);
        //mat4.translate(camera.mvMatrix, [0, 0, -50]);
        //gl.useProgram(shaderProgram);

        mat4.identity(camera.mvMatrix);
        mat4.translate(camera.mvMatrix, [0, 0, -300]);

    }


    update() {

        //actionMapper.handleKeys();





         var timeNow = new Date().getTime();

         this.frameCount++;


         if (this.lastTime != 0) {

         var elapsed = timeNow - this.lastTime;
         this.elapsedTotal += elapsed;

             for (var i = 0; i < this.processList.length; i++) {
                 this.processList[i].update(elapsed);
             }
             /*
         this.teleportProcess.update(elapsed);
         this.linearMovementProcess.update(elapsed);
         this.momentumMovementProcess.update(elapsed);
         this.cameraControllerProcess.update(elapsed);
         this.enemyProcess.update(elapsed);
         this.simpleRenderProcess.update(elapsed);
         this.textProcess.update(elapsed);
         this.gunProcess.update(elapsed);

         //this.createTexture(elapsed);*/
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

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createTexture(elapsed) {
        this.megaElapsedTotal += elapsed;
        if (this.megaElapsedTotal > 1000 || monstermap == null) {

            this.megaElapsedTotal = 0;
            var b = new ArrayBuffer(128 * 128 * 4);
            var v1 = new Uint8Array(b);
            var g = 0;
            for (var i = 0; i < 128 * 128; i++) {
                /*
                 if (this.randomIntFromInterval(0, 1) == 1) {

                 v1[g++] = 255;
                 v1[g++] = 255;
                 v1[g++] = 255;
                 v1[g++] = 255;
                 }
                 else {
                 */
                v1[g++] = 0;
                v1[g++] = 0;
                v1[g++] = 0;
                v1[g++] = 0;
                //              }
            }


            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
            //gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA,
                gl.UNSIGNED_BYTE, v1);
            gl.generateMipmap(gl.TEXTURE_2D);

            monstermap = texture;

        }


    }

    drawAll() {



        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);


        //gl.clearColor(0, 0, 0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //camera.move();
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //  gl.disable(gl.BLEND);

        //gl.useProgram(shaderProgram);


        //off-screen rendering
        //gl.bindFramebuffer(gl.FRAMEBUFFER, picker.framebuffer);
        //gl.uniform1i(shaderProgram.uDrawColors, 1);
        //this.simpleRenderProcess.draw();


        //gl.uniform1f(shaderProgram.alphaUniform, 1);
        //gl.uniform1i(shaderProgram.uDrawColors, 0);

        //this.simpleRenderProcess.draw();

        /*
         gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

         //on-screen rendering

         /*
         //asteroids
         gl.useProgram(ambientProgram);
         //console.log(camera.z);
         gl.uniform3fv(ambientProgram.uCameraPos, [camera.x, camera.y,  camera.z]);
         gl.uniformMatrix4fv(ambientProgram.uPMatrix, false, camera.pMatrix);

         this.renderProcess.draw();
         */


        //gl.useProgram(starProgram);
        //this.starProcess.draw();

        //gl.useProgram(fontProgram);
        //this.textProcess.draw();


        //gl.clearColor(1, 0, 0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT);


        //gl.useProgram(particleProgram);
        //this.healthProcess.draw();
        //this.shieldProcess.draw();


        //gl.disable(gl.DEPTH_TEST);
        //gl.enable(gl.BLEND);
        //this.gunProcess.draw();
        //gl.useProgram(simplestProgram);

        //gl.useProgram(simplestProgram);
       // this.primitiveProcess.draw();
        //this.laserProcess.draw();

    }


    draw() {


        //if(this.postProcessState) {
        camera.move();
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //  gl.disable(gl.BLEND);

        for (var i = 0; i < this.processList.length; i++) {
            this.processList[i].draw();
        }


        //gl.enable(gl.BLEND);
        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        /*
         gl.bindFramebuffer(gl.FRAMEBUFFER, this.postProcess.basebuffer);
         gl.clearColor(0,0, 0, 1.0);
         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


         //gl.bindFramebuffer(gl.FRAMEBUFFER, null);


         this.drawAll();




         gl.bindTexture(gl.TEXTURE_2D, this.postProcess.texture3);
         gl.generateMipmap(gl.TEXTURE_2D);
         gl.bindTexture(gl.TEXTURE_2D, null);





         gl.bindFramebuffer(gl.FRAMEBUFFER, this.postProcess.framebuffer);
         gl.clearColor(0,0, 0, 1.0);
         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
         gl.useProgram(simplestProgram);



         //camera.move();
         this.laserProcess.draw();

         this.postProcess.draw();


         //gl.clearColor(0,0, 0, 1.0);
         //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
         */
        //}
        //else {
        //    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //    this.drawAll();
        //}


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