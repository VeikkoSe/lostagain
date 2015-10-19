function GameState(sb) {
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
    var pauseProcess;
    var cameraControllerProcess;

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
            if (pause == false)
                pause = true;
            else {
                pause = false;
            }
        });

        processList = [];
        fb = gl.createFramebuffer();

        //order matters
        processList.push(GameLogicProcess(sb));

        processList.push(PrimitiveProcess(sb));
        processList.push(ChaseProcess(sb));
        processList.push(FaceProcess(sb));
        processList.push(GunProcess(sb));
        processList.push(MovementProcess(sb));
        processList.push(ExhaustProcess(sb));
        processList.push(TrailProcess(sb));
        processList.push(ExplosionProcess(sb));
        processList.push(CollisionProcess(sb));
        processList.push(RenderProcess(sb));
        processList.push(StarProcess(sb));
        processList.push(TeleportProcess(sb));
        processList.push(LaserProcess(sb));
        processList.push(TimedTextProcess(sb));
        processList.push(ScoreProcess(sb));
        processList.push(Text2dProcess(sb));
        processList.push(TextProcess(sb));
        processList.push(LayoutProcess(sb));

        processList.push(ShieldProcess(sb));

        cameraControllerProcess = CameraControllerProcess(sb);
        pauseProcess = PauseProcess(sb);
        pauseProcess.init();
        cameraControllerProcess.init();

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

        if (lastTime != 0) {

            var totalElapsed = timeNow - startTime;

            pauseProcess.update();
            cameraControllerProcess.update();

            if (!running || pause)
                return false;

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