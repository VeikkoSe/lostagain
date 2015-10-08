function gamestate_constructor(sb) {
    'use strict';

    var elapsedTotal = 0;
    var gl = sb.getGL();
    var camera = sb.getCamera();

    var frameCount = 0;
    var lastTime = 0;

    var processList = [];
    var startTime = null;

    var fb = null;

    var subscribe = function() {
    };

    var init = function() {

        processList = [];
        fb = gl.createFramebuffer();

        sb.subscribe('movetoloadstate', function(name, wantedstate) {

            moveToLoadedStage(wantedstate);
        });

        //order matters
        processList.push(cameracontrollerprocess_constructor(sb));
        processList.push(primitiveprocess_constructor(sb));
        processList.push(enemyprocess_constructor(sb));
        processList.push(gunprocess_constructor(sb));
        processList.push(momemtummovementprocess_constructor(sb));
        processList.push(exhaustprocess_constructor(sb));
        processList.push(trailprocess_constructor(sb));
        processList.push(explosionprocess_constructor(sb));

        processList.push(collisionprocess_constructor(sb));
        processList.push(renderprocess_constructor(sb));
        processList.push(starprocess_constructor(sb));
        processList.push(teleport_process_constructor(sb));
        processList.push(laserprocess_constructor(sb));
        processList.push(text_process_2d_constructor(sb));
        processList.push(text_process_constructor(sb));
        processList.push(layoutprocess_constructor(sb));
        processList.push(railsmovementprocess_constructor(sb));
        processList.push(entityprocess_constructor(sb));

        //processList.push(postprocess_constructor(sb));

        for (var i = 0; i < processList.length; i++) {
            processList[i].init();
        }

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

        camera.setPerspective();

        startTime = new Date().getTime();

    };

    var update = function() {

        var timeNow = new Date().getTime();

        //camera.move();

        frameCount++;
        console.log(lastTime);

        if (lastTime != 0) {

            var totalElapsed = timeNow - startTime;

            var elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;
            //skip lost frames
            if(elapsed<300) {
                for (var i = 0; i < processList.length; i++) {
                    processList[i].update(elapsed, totalElapsed);
                }
            }

            if (elapsedTotal >= 1000) {

                var fps = frameCount;

                frameCount = 0;
                elapsedTotal -= 1000;

                document.getElementById('fps').innerHTML = fps;

            }
        }
        lastTime = timeNow;

    };

    var draw = function() {

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);

        //gl.clearColor(1, 1, 0, 1); // red
        //gl.clear(gl.COLOR_BUFFER_BIT);

        //gl.enable(gl.BLEND);
        //gl.disable(gl.DEPTH_TEST);
        //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        //if(this.postProcessState) {

        //camera.setDistance(350);

        //  gl.disable(gl.BLEND);

        for (var i = 0; i < processList.length; i++) {

            processList[i].draw();
        }

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

    var cleanup = function() {
        /*
         document.onkeydown = null;
         document.onkeyup = null;
         document.onmousemove = null;
         document.onmousedown = null;
         actionMapper = null;
         currentlyPressedKeys = {};
         em.clearAll();
         */
    };

    return {
        init,
        subscribe,
        draw,
        update,
        cleanup
    };

}