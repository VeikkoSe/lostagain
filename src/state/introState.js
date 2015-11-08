function introState(sb, pubsub, helpers) {
    'use strict';

    var lastTime;

    var frameCount;
    var startTime;
    var elapsedTotal = 0;
    // var elapsedTotal = 0;
    // var gl = sb.getGL();
    //var camera = sb.getCamera();

    // var frameCount = 0;
    //var lastTime = 0;

    //var processList = [];
    //var processListNoPause = [];
    //var pause = false;
    //var startTime = null;
    var em = sb.getEntityManager();

    // var fb = null;
    // var running = true;

    //var {game} = params;

    //var shadermanager = shader_manager_constuctor();
    //var shaderprogram = shadermanager.init("per-fragment-lighting");
    //var assetmanager = asset_manager_constructor();
    //var camera = game.camera;
    //var intro = assetmanager.getMesh('start');
    //  var actionMapper = intro_action_mapper(sb);
    var processList = [];
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

        processList.push(renderProcess(sb, helpers));
        processList.push(menuProcess(sb, pubsub));

        /*
         document.onkeydown = actionMapper.handleKeyDown;
         document.onkeyup = actionMapper.handleKeyUp;
         document.onmousemove = actionMapper.handleMouseMove;
         document.onmousedown = actionMapper.handleMouseDown;
         */

        for (var i = 0; i < processList.length; i++) {
            processList[i].init();
        }

        gl.viewport(0, 0, sb.getResolutionWidth(), sb.getResolutionHeight());
        camera.setPerspective();

        var mvMatrix = camera.getMVMatrix();
        mat4.lookAt([0, 0, 1200], [0, 0, 0], [0, 1, 0], mvMatrix);
        //mat4.identity(mvMatrix);
        //mat4.translate(mvMatrix, [0, 0, -300]);

        gl.clearColor(1, 0, 0, 1.0);
        gl.clearDepth(1.0);

        //camera.init();
        //camera.setPerspective();
        /// var mvMatrix = camera.getMVMatrix();

        //mat4.lookAt([camera.getXPos(), camera.getYPos(), camera.getZPos()], [0, 0, 0], [0, 1, 0], mvMatrix);

    };

    var cleanup = function() {
        /*
         document.onkeydown = null;
         document.onkeyup = null;
         document.onmousemove = null;
         document.onmousedown = null;
         actionMapper = null;
         currentlyPressedKeys = {};
         */
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