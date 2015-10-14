function gamestate_constructor(sb) {
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

    var subscribe = function() {
    };

    var init = function() {

        processList = [];
        fb = gl.createFramebuffer();

        sb.subscribe('movetoloadstate', function(name, wantedstate) {

            moveToLoadedStage(wantedstate);
        });

        //order matters
        processList.push(CameraControllerProcess(sb));
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
        processList.push(Text2dProcess(sb));
        processList.push(TextProcess(sb));
        processList.push(LayoutProcess(sb));

        processList.push(EntityProcess(sb));

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


        frameCount++;

        if (lastTime != 0) {

            var totalElapsed = timeNow - startTime;

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

    return {
        init,
        subscribe,
        draw,
        update,
        cleanup
    };

}