function mapstate_constructor(sb) {

    //constructor(canvas) {

    let wall = null;

    //this.starProcess = new StarProcess();
    //this.wall = mm.getOrAddMesh('maps');


    let processList = [];
    let frameCount = 0;
    let lastTime = 0;
    let elapsedTotal = 0;
    let camera = sb.getCamera();
    let gl = sb.getGL();
    let actionMapper = map_action_mapper(sb);
    //let ef = sb.getEn


    //}

    let draw = function () {


        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        camera.move();

        for (let i = 0; i < processList.length; i++) {
            processList[i].draw();
        }
        camera.drawCalls = 0;


    }


    let init = function () {


        actionMapper = map_action_mapper(sb);

        document.onkeydown = actionMapper.handleKeyDown;
        document.onkeyup = actionMapper.handleKeyUp;
        document.onmousemove = actionMapper.handleMouseMove;
        document.onmousedown = actionMapper.handleMouseDown;

        processList = [];
        //this.processList.push(new MapProcess());
        //this.processList.push(new PrimitiveProcess());
        processList.push(RenderProcess());
        //processList.push(StarProcess());
        //processList.push(MapProcess());
        //processList.push(MomentumMovementProcess());

        camera.setPos(0, 0, 0, 45);
        camera.setDistance(50);
        /*
         ef.createMap();
         ef.createBareMotherShip();
         ef.createStars();
         */

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();

        mat4.identity(camera.getMVMatrix());
        //mat4.translate(camera.mvMatrix, [-50, 0, -10]);


    }


    let update = function () {

        let timeNow = new Date().getTime();
        actionMapper.handleKeys();

        frameCount++;

        if (lastTime != 0) {

            let elapsed = timeNow - lastTime;
            elapsedTotal += elapsed;

            for (let i = 0; i < processList.length; i++) {
                processList[i].update(elapsed, false);
            }


        }
        lastTime = timeNow;

    }

    let subscribe = function () {

    }

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