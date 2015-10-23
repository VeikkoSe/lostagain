function gameState(sb) {
    'use strict';

    var elapsedTotal = 0;
    var gl = sb.getGL();
    var camera = sb.getCamera();

    var frameCount = 0;
    var lastTime = 0;

    var processList = [];
    var startTime = null;
    var em = sb.getEntityManager();

    var fb = null;
    var running = true;
    var pause = false;
    var pProcess;
    var cControllerProcess;

    var subscribe = function() {

    };

    var init = function() {

        sb.subscribe('movetoloadstate', function(name, wantedstate) {
            moveToLoadedStage(wantedstate);
        });

        sb.subscribe('gameover', function() {
            running = false;
        });

        sb.subscribe('pause', function() {
            pause = !pause;
        });

        processList = [];
        fb = gl.createFramebuffer();

        //order matters
        processList.push(gameLogicProcess(sb));

        processList.push(primitiveProcess(sb));
        processList.push(chaseProcess(sb));
        processList.push(faceProcess(sb));
        processList.push(pulseGunProcess(sb));
        processList.push(movementProcess(sb));
        processList.push(exhaustProcess(sb));
        processList.push(trailProcess(sb));
        processList.push(explosionProcess(sb));
        processList.push(collisionProcess(sb));
        processList.push(renderProcess(sb));
        processList.push(starProcess(sb));
        processList.push(teleportProcess(sb));
        processList.push(laserProcess(sb));
        processList.push(timedTextProcess(sb));
        processList.push(scoreProcess(sb));
        processList.push(text2dProcess(sb));
        processList.push(textProcess(sb));
        processList.push(layoutProcess(sb));

        processList.push(shieldProcess(sb));

        cControllerProcess = cameraControllerProcess(sb);
        pProcess = pauseProcess(sb);
        pProcess.init();
        cControllerProcess.init();

        for (var i = 0; i < processList.length; i++) {
            processList[i].init();
        }

        gl.viewport(0, 0, sb.getResolutionWidth(), sb.getResolutionHeight());

        camera.setPerspective();

        startTime = new Date().getTime();

    };

    var update = function() {

        var timeNow = new Date().getTime();

        frameCount++;

        if (lastTime !== 0) {

            var totalElapsed = timeNow - startTime;

            pProcess.update();
            cControllerProcess.update();

            if (!running || pause) {
                return false;
            }
            var elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;
            //skip lost frames
            if (elapsed < 300) {
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



        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        //gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        //gl.clearColor(1, 1, 0, 1); // red
        //gl.clear(gl.COLOR_BUFFER_BIT);

        //gl.enable(gl.BLEND);
        //gl.disable(gl.DEPTH_TEST);
        //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        //if(this.postProcessState) {

        //camera.setDistance(350);

        //  gl.disable(gl.BLEND);

        camera.resetDrawCalls();
        for (var i = 0; i < processList.length; i++) {
            for (var e = 0; e < em.entities.length; e++) {
                var le = em.entities[e];
                processList[i].draw(le);
            }
        }
        //console.log(camera.getDrawCalls());

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

    return Object.freeze({
        init,
        subscribe,
        draw,
        update,
        cleanup
    });

}