class LevelManager {
    constructor() {
        this.loading = false;
        this.loadTotal = 0;
        //this.loaded = null;
        this.nextState = false;
        this.maxLoad = 0;
    }

    loadLevel(name) {
        //console.log(game.stateEngine);
        game.stateEngine.loadS(name);
        //game.stateEngine.changeState("loadstate");
        //this.loading = true;
        //this.loadAllAssets(name);

    }


    loadAllAssets(name) {
        //console.log(name);
        this.nextState = false;
        // mh = new MasterHandler();
        em.clearAll();


        this.loading = true;
        switch (name) {
            case ('first') :

                ef.createStars();
                ef.createFuel();
                ef.createEnemy();
                //this.ef.createPlane();
                ef.createMotherShip();
                ef.createShip();
                ef.createTerrain();

                //this.ef.createBox();

                //this.nextState = 'gamestate';
                this.maxLoad = this.loadTotal;
            case ('second') :


                ef.createFuel();


                this.nextState = 'gamestate';
                this.maxLoad = this.loadTotal;

                break;


        }


        this.loading = false;
    }


    destroyAllCurrentAssets() {

    }

}