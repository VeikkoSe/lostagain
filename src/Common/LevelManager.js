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
       // mh = new MasterHandler();
        em.clearAll();


        this.loading = true;
        if (name == 1) {

            //  es.push(new RenderProcess());

            //handler = new Handler();

            //es.uniforms.push(gl.uniform1i(shaderProgram.uDrawColors, 0));
            //gl.uniform1i(shaderProgram.uDrawColors, 0);

            //es.uniforms.push(new SimpleRenderProcess());







            ef.createFuel();
            //this.ef.createPlane();
            ef.createMotherShip();
            ef.createShip();
            ef.createTerrain();

            //this.ef.createBox();

            this.nextState = 'gamestate';
            this.maxLoad = this.loadTotal;

        }

        if (name == 2) {


            //  es.push(new RenderProcess());
            //es.push(new SimpleRenderProcess());




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