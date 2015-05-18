class MapState extends StateEngine {

    constructor(canvas) {

        this.wall = null;

        //this.starProcess = new StarProcess();
        //this.wall = mm.getOrAddMesh('maps');


        this.processList = [];
        this.frameCount = 0;
        this.lastTime = 0;
        this.elapsedTotal = 0;


    }

    draw() {


        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        camera.move();

        for (var i = 0; i < this.processList.length; i++) {
            this.processList[i].draw();
        }
        camera.drawCalls = 0;





    }


    init() {


        actionMapper = new MapStateActionMapper();

        document.onkeydown = actionMapper.handleKeyDown;
        document.onkeyup = actionMapper.handleKeyUp;
        document.onmousemove = actionMapper.handleMouseMove;
        document.onmousedown = actionMapper.handleMouseDown;


        this.processList = [];
        //this.processList.push(new MapProcess());
        //this.processList.push(new PrimitiveProcess());
        this.processList.push(new RenderProcess());
        this.processList.push(new StarProcess());
        this.processList.push(new MapProcess());
        this.processList.push(new MomentumMovementProcess());

        camera.setPos(-10, 0, 0, 45);
        camera.setDistance(40);

        ef.createMap();
        ef.createBareMotherShip();
        ef.createStars();




        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        camera.setPerspective();

        mat4.identity(camera.mvMatrix);
        //mat4.translate(camera.mvMatrix, [-50, 0, -10]);


    }


    update() {

        var timeNow = new Date().getTime();

        this.frameCount++;

        if (this.lastTime != 0) {

            var elapsed = timeNow - this.lastTime;
            this.elapsedTotal += elapsed;

            for (var i = 0; i < this.processList.length; i++) {
                this.processList[i].update(elapsed);
            }

            actionMapper.handleKeys();

        }
        this.lastTime = timeNow;

    }

    cleanup() {

        document.onkeydown = null;
        document.onkeyup = null;
        document.onmousemove = null;
        document.onmousedown = null;
        actionMapper = null;
        currentlyPressedKeys = {};
        em.clearAll();
    }


}