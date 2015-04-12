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

                camera.setDistance(200);
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
            case ('second') :

                camera.setDistance(50);
                // ef.createMotherShip();
                ef.createShip();
                /*
                 for (var i = 0; i < 5; i++) {

                 ef.createFuel(true);

                 }
                 */


                break;

            case ('third') :

                //camera.setDistance(50);
                // ef.createMotherShip();

                camera.setDistance(200);
                ef.createAsteroidField();




                ef.createStars();
                //ef.createFuel(false);
                //for (var i = 0; i < 50; i++) {
                //ef.createEnemy();
                //}
                //this.ef.createPlane();
                ef.createMotherShip();
                ef.createShip();


                break;



        }
        this.maxLoad = this.loadTotal;


        this.loading = false;
    }


    destroyAllCurrentAssets() {

    }

}