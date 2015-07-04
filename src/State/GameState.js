function gamestate_constructor(sb) {

    // constructor(canvas) {

    let elapsedTotal = 0;
    let gl = sb.getGL();
    let camera = sb.getCamera();

    let frameCount = 0;
    let lastTime = 0;

    let processList = [];
    let startTime = null;

    //let camera = camera_contructor();
    //let lm = loadmanager_costructor();


    //}

    let subscribe = function () {


    };


    let init = function () {

        processList = [];


        //processList.push(text_process_2d_constructor(sb));
        // processList.push(new AsteroidRenderProcess());
        // processList.push(new PlaneProcess());

        sb.subscribe("movetoloadstate", function (name, wantedstate) {

            moveToLoadedStage(wantedstate);
        });


        processList.push(cameracontrollerprocess_constructor(sb));
        processList.push(primitiveprocess_constructor(sb));

        processList.push(teleport_process_constructor(sb));
        processList.push(starprocess_constructor(sb));
        processList.push(enemyprocess_constructor(sb));
        processList.push(gunprocess_constructor(sb));
        // processList.push(new LaserProcess());
        processList.push(momemtummovementprocess_constructor(sb));
        processList.push(exhaustprocess_constructor(sb));
        processList.push(explosionprocess_constructor(sb));
        processList.push(layoutprocess_constructor(sb));
        processList.push(collisionprocess_constructor(sb));
        processList.push(renderprocess_constructor(sb));

        for (let i = 0; i < processList.length; i++) {
            processList[i].init();
        }


        //if (game.currentLevel == null) {

        //lm.loadLevel('first');
        //sb.publish("loadassets", 'first');
        //  game.currentLevel = 'first';

        // return;
        //}


        //actionMapper = new GameStateActionMapper();

        /*
         document.onkeydown = actionMapper.handleKeyDown;
         document.onkeyup = actionMapper.handleKeyUp;
         document.onmousemove = actionMapper.handleMouseMove;
         document.onmousedown = actionMapper.handleMouseDown;
         */
        //let event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        //window.addEventListener(event, this.handleMouseWheel);


        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();


        mat4.identity(camera.getMVMatrix());
        //mat4.translate(camera.mvMatrix, [0, 0, -300]);

        startTime = new Date().getTime();


    };


    let update = function () {


        let timeNow = new Date().getTime();


        frameCount++;

        if (lastTime != 0) {


            let totalElapsed = timeNow - startTime;

            let elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;

            for (let i = 0; i < processList.length; i++) {
                processList[i].update(elapsed, totalElapsed);
            }

            /*
             if (this.elapsedTotal >= 1000) {
             let fps = this.frameCount;
             this.frameCount = 0;
             this.elapsedTotal -= 1000;

             if (fps < 59)
             $('#fps').css('color', 'red');
             else
             $('#fps').css('color', 'green');
             $('#fps').html(fps);
             }*/
        }
        lastTime = timeNow;


    }

    let draw = function () {


        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        //gl.enable(gl.BLEND);
        //gl.disable(gl.DEPTH_TEST);
        //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        //if(this.postProcessState) {
        camera.move();
        //camera.setDistance(350);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //  gl.disable(gl.BLEND);


        for (let i = 0; i < processList.length; i++) {

            processList[i].draw();
        }
        //console.log(camera.drawCalls);
        //camera.drawCalls = 0;


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


    };

    let cleanup = function () {
        /*
         document.onkeydown = null;
         document.onkeyup = null;
         document.onmousemove = null;
         document.onmousedown = null;
         actionMapper = null;
         currentlyPressedKeys = {};
         em.clearAll();
         */
    }

    return {
        init,
        subscribe,
        draw,
        update,
        cleanup
    };


}