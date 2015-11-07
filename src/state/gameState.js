function gameState(sb, pubsub,helpers) {
    'use strict';

    var elapsedTotal = 0;
    var gl = sb.getGL();
    var camera = sb.getCamera();

    var frameCount = 0;
    var lastTime = 0;

    var processList = [];
    var processListNoPause = [];
    var pause = false;
    var startTime = null;
    var em = sb.getEntityManager();

    var fb = null;
    var running = true;

    var lastUsedHeap = 0;  // remember the heap size

    var subscribe = function() {

    };

    var init = function() {

        pubsub.subscribe('movetoloadstate', function(name, wantedstate) {
            moveToLoadedStage(wantedstate);
        });

        pubsub.subscribe('gameover', function() {
            running = false;
        });

        pubsub.subscribe('pause', function() {
            pause = !pause;
        });

        processList = [];
        fb = gl.createFramebuffer();

        //order matters
        processList.push(gameLogicProcess(sb, pubsub));

        processList.push(primitiveProcess(sb));
        processList.push(chaseProcess(sb));
        processList.push(faceProcess(sb));
        processList.push(pulseGunProcess(sb, pubsub,helpers));
        processList.push(movementProcess(sb, pubsub,helpers));
        processList.push(exhaustProcess(sb,helpers));
        processList.push(trailProcess(sb,helpers));
        processList.push(collisionProcess(sb, pubsub,helpers));
        processList.push(renderProcess(sb,helpers));
        processListNoPause.push(cameraControllerProcess(sb, pubsub));

        processList.push(starProcess(sb));
        processList.push(teleportProcess(sb,helpers));
        processList.push(laserProcess(sb, pubsub,helpers));
        processList.push(timedTextProcess(sb));
        processList.push(scoreProcess(sb));
        processList.push(text2dProcess(sb));
        processList.push(textProcess(sb));
        processList.push(layoutProcess(sb));
        processList.push(shieldProcess(sb));

        processListNoPause.push(explosionProcess(sb, pubsub));

        processListNoPause.push(pauseProcess(sb));

        for (var i = 0; i < processListNoPause.length; i++) {
            processListNoPause[i].init();
        }

        for (var i = 0; i < processList.length; i++) {
            processList[i].init();
        }

        gl.viewport(0, 0, sb.getResolutionWidth(), sb.getResolutionHeight());

        camera.setPerspective();

        startTime = new Date().getTime();

        sb.getAudio().startMusic(1,0,true);
        sb.getAudio().playSound(8,0,true);

        //setTimeout(checkMemory, 100); // test 10 times per second

    };


    // --- enter your code here ---
    //new Object();
    // --- end of your code ---

    //var diff = window.performance.memory.usedJSHeapSize - before;


    var  checkMemory = function() {

        //if (window.performance.memory.usedJSHeapSize < lastUsedHeap)
            //console.log('Garbage collected!');
        //lastUsedHeap = window.performance.memory.usedJSHeapSize;
    }



    var update = function() {

        checkMemory();
        // console.time('Update');

        var timeNow = new Date().getTime();

        frameCount++;

        if (lastTime !== 0) {

            var totalElapsed = timeNow - startTime;
            var elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;

            for (var i = 0; i < processListNoPause.length; i++) {
                processListNoPause[i].update(elapsed, totalElapsed);
            }

            if (running && !pause) {

                //skip lost frames
                if (elapsed < 300) {
                    for (var i = 0; i < processList.length; i++) {
                        processList[i].update(elapsed, totalElapsed);
                    }
                }
                if(elapsedTotal%100===0) {
                    checkMemory();
                }

                if (elapsedTotal >= 1000) {

                    var fps = frameCount;

                    frameCount = 0;
                    elapsedTotal -= 1000;

                    document.getElementById('fps').innerHTML = fps;

                }
            }
        }
        lastTime = timeNow;
        //console.timeEnd('Update');
    };

    var draw = function() {

        //console.time('Drawing');

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
        var plnp = processListNoPause.length;
        for (var i = 0; i < plnp; i++) {
            for (var e = 0; e < em.entities.length; e++) {
                var le = em.entities[e];
                processListNoPause[i].draw(le);
            }
        }
        var pl = processList.length;
        for (var i = 0; i < pl; i++) {
            var el = em.entities.length;
            for (var e = 0; e < el; e++) {
                var le = em.entities[e];
                processList[i].draw(le);
            }
        }
        //console.timeEnd('Drawing');
        // console.log(camera.getDrawCalls());

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