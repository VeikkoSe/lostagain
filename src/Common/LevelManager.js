class LevelManager {
    constructor() {
        this.loading = false;
        this.loadTotal = 0;
        //this.loaded = null;
        this.nextState = false;
        this.maxLoad = 0;
    }

    loadLevel(name) {

        this.loading = true;

        this.loadAllAssets(name);

    }


    loadAllAssets(name) {
        this.nextState = false;
        es = [];
        em.clearAll();


        this.loading = true;
        if (name == 2) {

            //  es.push(new RenderProcess());
            es.push(new SimpleRenderProcess());
            /*
             es.push(new PlaneProcess());
             es.push(new HealthProcess());
             es.push(new ShieldProcess());
             es.push(new TextProcess());
             es.push(new LinearMovementProcess());
             es.push(new MomentumMovementProcess());
             es.push(new CameraControllerProcess());
             es.push(new PrimitiveProcess());
             es.push(new TeleportProcess());
             es.push(new StarProcess());
             es.push(new EnemyProcess());
             es.push(new GunProcess());
             es.push(new PostProcess());
             es.push(new LaserProcess());
             */

            particleProgram = initParticleShaders("particle");
            simplestProgram = initSimplestShaders("simplest");
            blurVerticalProgram = initBlurShaders("blurvertical");
            blurHorizontalProgram = initBlurShaders("blurhorizontal");
            shaderProgram = initShaders("per-fragment-lighting");
            ambientProgram = initAmbientShaders('ambient');


            ef.createFuel();
            //this.ef.createPlane();
            ef.createMotherShip();
            ef.createShip();
            ef.createTerrain();

            //this.ef.createBox();

            this.nextState = 'gamestate';
            this.maxLoad = this.loadTotal;

        }

        if (name == 1) {


            //  es.push(new RenderProcess());
            es.push(new SimpleRenderProcess());


            particleProgram = initParticleShaders("particle");
            simplestProgram = initSimplestShaders("simplest");
            blurVerticalProgram = initBlurShaders("blurvertical");
            blurHorizontalProgram = initBlurShaders("blurhorizontal");
            shaderProgram = initShaders("per-fragment-lighting");
            ambientProgram = initAmbientShaders('ambient');


            ef.createFuel();


            this.nextState = 'gamestate';
            this.maxLoad = this.loadTotal;

        }

        this.loading = false;
        // levelManager.loaded(nextState);
    }

    destroyAllCurrentAssets() {

    }

}