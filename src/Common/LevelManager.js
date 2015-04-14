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

        //layoutManager
        lm = [];

        switch (name) {
            case ('first') :

                camera.setDistance(200);
                ef.createStars();
                ef.createFuel(false);
                //for (var i = 0; i < 50; i++) {
                //ef.createEnemy();
                //}
                //this.ef.createPlane();
                ef.createMotherShip();
                var ship = ef.createShip();




                //this.ef.createBox();

                break;
            case ('second') :
                ef.createStars();
                camera.setDistance(200);
                // ef.createMotherShip();
                var ship = ef.createShip();

                var radar = ef.createRadar();
                var currency = ef.createCurrency();




                var rt = new Layout(0.00, 0.00);
                rt.addChildren(new Layout(5, 5, new Texture("hp"),radar.components.RadarComponent,8));
                rt.addChildren(new Layout(5,13, new Texture("shield"),currency.components.CurrencyComponent,8));
                lm.push(rt);
                var lb = new Layout(1, 1);
                lb.addChildren(new Layout(5,5,new Texture("radar"),radar.components.RadarComponent,55));
                lm.push(lb);
                var lh = new Layout(0, 1);
                lh.addChildren(new Layout(5,5,new Texture("currency"),ship.components.HealtComponent,8));
                lm.push(lh);


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