function mapstate_constructor(sb) {
    "use strict";


    //constructor(canvas) {

    var wall = null;

    //this.starProcess = new StarProcess();
    //this.wall = mm.getOrAddMesh('maps');


    var processList = [];
    var frameCount = 0;
    var lastTime = 0;
    var elapsedTotal = 0;
    var camera = sb.getCamera();
    var gl = sb.getGL();
    //var actionMapper = map_action_mapper(sb);
    //var ef = sb.getEn


    //}

    var draw = function () {


        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        camera.move();

        for (var i = 0; i < processList.length; i++) {
            processList[i].draw();
        }
        camera.drawCalls = 0;


    };


    var init = function () {

        /*
         actionMapper = map_action_mapper(sb);

         document.onkeydown = actionMapper.handleKeyDown;
         document.onkeyup = actionMapper.handleKeyUp;
         document.onmousemove = actionMapper.handleMouseMove;
         document.onmousedown = actionMapper.handleMouseDown;
         */
        processList = [];
        //this.processList.push(new MapProcess());
        //this.processList.push(new PrimitiveProcess());
        processList.push(RenderProcess());
        //processList.push(StarProcess());
        //processList.push(MapProcess());
        //processList.push(MomentumMovementProcess());

        //camera.setPos(0, 0, 0, 45);
        //camera.setDistance(50);
        /*
         ef.createMap();
         ef.createBareMotherShip();
         ef.createStars();
         */

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();

        mat4.identity(camera.getMVMatrix());
        //mat4.translate(camera.mvMatrix, [-50, 0, -10]);


    };


    var update = function () {

        var timeNow = new Date().getTime();
        actionMapper.handleKeys();

        frameCount++;

        if (lastTime != 0) {

            var elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;

            for (var i = 0; i < processList.length; i++) {
                processList[i].update(elapsed, false);
            }


        }
        lastTime = timeNow;

    };

    var subscribe = function () {

    };

    var cleanup = function () {
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