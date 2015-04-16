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
            case ('first'):


                camera.setDistance(300);
                ef.createStars();
                ef.createFuel(false);
                //for (var i = 0; i < 50; i++) {
                ef.createEnemy();
                //}
                //this.ef.createPlane();
                var mothership = ef.createMotherShip();
                var ship = ef.createShip();


                var radar = ef.createRadar();
                var currency = ef.createCurrency();


                var gt = new Layout(0, 0.1);
                gt.addChildren(new Layout(5, 0, mothership.components.HealthComponent, 8));
                gt.addChildren(new Layout(5, 10, mothership.components.ShieldComponent, 8));
                lm.push(gt);

                var rt = new Layout(0, 0);
                rt.addChildren(new Layout(5, 5, ship.components.HealthComponent, 8));
                rt.addChildren(new Layout(5, 15, ship.components.ShieldComponent, 8));
                lm.push(rt);

                var lb = new Layout(1, 1);
                lb.addChildren(new Layout(5, 5, radar.components.RadarComponent, 55));
                lm.push(lb);
                var lh = new Layout(0, 1);
                lh.addChildren(new Layout(5, 5, currency.components.CurrencyComponent, 8));
                lm.push(lh);


                break;
            case ('second'):
                ef.createStars();
                camera.setDistance(20);
                // ef.createMotherShip();
                var ship = ef.createShip();

                //ef.createFuel(false);
                //ef.createEnemy();
                break;

            case ('third'):

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