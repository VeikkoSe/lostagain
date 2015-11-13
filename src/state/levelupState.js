function levelupState(sb, processList) {
    'use strict';

    //var processList = [];
    var frameCount = 0;
    var lastTime = 0;
    var elapsedTotal = 0;
    var camera = sb.getCamera();
    var gl = sb.getGL();
    var em = sb.getEntityManager();
    var startTime;

    var init = function() {

        //processList = [];

        for (var i = 0; i < processList.length; i++) {
            processList[i].init();
        }

        gl.viewport(0, 0, sb.getResolutionWidth(), sb.getResolutionHeight());
        camera.setPerspective();

        var mvMatrix = camera.getMVMatrix();

        gl.clearColor(1, 0, 0, 1.0);
        gl.clearDepth(1.0);
        //mat4.translate(camera.mvMatrix, [-50, 0, -10]);
        startTime = new Date().getTime();

        camera.setXPos(36);
        camera.setYPos(220);
        camera.setZPos(60);

        mat4.lookAt([camera.getXPos(), camera.getYPos(), camera.getZPos()], [0, 0, 0], [0, 1, 0], mvMatrix);

    };

    var draw = function() {

        gl.enable(gl.DEPTH_TEST);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        for (var i = 0; i < processList.length; i++) {
            for (var e = 0; e < em.entities.length; e++) {
                var le = em.entities[e];
                processList[i].draw(le);
            }
        }
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

    var cleanup = function() {

    };

    return Object.freeze({
        init,
        draw,
        update,
        cleanup
    });

}