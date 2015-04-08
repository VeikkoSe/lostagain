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
            case ('second') :

                camera.setDistance(400);
                ef.createStars();
                ef.createFuel(false);
                //for (var i = 0; i < 50; i++) {
                    ef.createEnemy();
                //}
                //this.ef.createPlane();
                ef.createMotherShip();
                ef.createShip();


                //this.ef.createBox();

                break;
            case ('first') :

                camera.setDistance(100);
               // ef.createMotherShip();
                ef.createShip();
                /*
                 for (var i = 0; i < 5; i++) {

                 ef.createFuel(true);

                 }
                 */



                break;


        }
        this.maxLoad = this.loadTotal;


        this.loading = false;
    }


    destroyAllCurrentAssets() {

    }

}