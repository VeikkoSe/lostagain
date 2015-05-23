class GameState extends StateEngine {

    constructor(canvas) {

        this.elapsedTotal = 0;

        this.frameCount = 0;
        this.lastTime = 0;

        this.processList = [];

    }

    testi(topic, data) {
        console.log(topic);
        console.log(data);
    }

    init() {


        this.processList = [];

        this.processList.push(new TextProcess());
        this.processList.push(new AsteroidRenderProcess());
        this.processList.push(new PlaneProcess());
        //this.processList.push(new PostProcess());

        //this.processList.push(new HealthProcess());
        //this.processList.push(new ShieldProcess());
        //this.processList.push(new LinearMovementProcess());
        //this.processList.push(new DrivingMovementProcess());
        this.processList.push(new CameraControllerProcess());
        this.processList.push(new PrimitiveProcess());
        this.processList.push(new TeleportProcess());
        this.processList.push(new StarProcess());
        this.processList.push(new EnemyProcess());
        this.processList.push(new GunProcess());
        this.processList.push(new LaserProcess());
        this.processList.push(new MomentumMovementProcess());
        this.processList.push(new ExhaustProcess());
        this.processList.push(new ExplosionProcess());
        this.processList.push(new LayoutProcess());
        this.processList.push(new CollisionProcess());
        this.processList.push(new RenderProcess());


        if (game.currentLevel == null) {

            loadManager.loadLevel('first');
            game.currentLevel = 'first';

            return;
        }


        actionMapper = new GameStateActionMapper();


        document.onkeydown = actionMapper.handleKeyDown;
        document.onkeyup = actionMapper.handleKeyUp;
        document.onmousemove = actionMapper.handleMouseMove;
        document.onmousedown = actionMapper.handleMouseDown;
        var event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        window.addEventListener(event, this.handleMouseWheel);


        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();


        mat4.identity(camera.mvMatrix);
        //mat4.translate(camera.mvMatrix, [0, 0, -300]);

    }


    update() {


        var timeNow = new Date().getTime();

        this.frameCount++;

        if (this.lastTime != 0) {

            var elapsed = timeNow - this.lastTime;
            this.elapsedTotal += elapsed;

            for (var i = 0; i < this.processList.length; i++) {
                this.processList[i].update(elapsed);
            }

            actionMapper.handleKeys();

            if (this.elapsedTotal >= 1000) {
                var fps = this.frameCount;
                this.frameCount = 0;
                this.elapsedTotal -= 1000;

                if (fps < 59)
                    $('#fps').css('color', 'red');
                else
                    $('#fps').css('color', 'green');
                $('#fps').html(fps);
            }
        }
        this.lastTime = timeNow;


    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
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


        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        //gl.enable(gl.BLEND);
        //gl.disable(gl.DEPTH_TEST);
        //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        //if(this.postProcessState) {
        camera.move();
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //  gl.disable(gl.BLEND);

        for (var i = 0; i < this.processList.length; i++) {
            this.processList[i].draw();
        }
        //console.log(camera.drawCalls);
        camera.drawCalls = 0;


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
        em.clearAll();

    }


}