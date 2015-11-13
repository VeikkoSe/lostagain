function introState(sb, processList) {
    'use strict';

    var lastTime;

    var frameCount;
    var startTime;
    var elapsedTotal = 0;

    var em = sb.getEntityManager();

    var camera = sb.getCamera();
    var gl = sb.getGL();

    var draw = function() {

        for (var i = 0; i < processList.length; i++) {
            for (var e = 0; e < em.entities.length; e++) {
                var le = em.entities[e];

                processList[i].draw(le);
            }
        }

    };

    var subscribe = function() {

    };

    var init = function() {

        for (var i = 0; i < processList.length; i++) {
            processList[i].init();
        }

        gl.viewport(0, 0, sb.getResolutionWidth(), sb.getResolutionHeight());
        camera.setPerspective();

        var mvMatrix = camera.getMVMatrix();
        mat4.lookAt([0, 0, 1200], [0, 0, 0], [0, 1, 0], mvMatrix);

        gl.clearColor(1, 0, 0, 1.0);
        gl.clearDepth(1.0);

    };

    var cleanup = function() {

    };

    var update = function() {

        var timeNow = new Date().getTime();

        frameCount++;

        if (lastTime !== 0) {

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

    return Object.freeze({
        init,
        subscribe,
        draw,
        update,
        cleanup
    });
}