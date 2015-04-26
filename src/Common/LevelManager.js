class LevelManager {
    constructor() {
        this.loading = false;
        this.loadTotal = 0;
        this.nextState = false;
        this.maxLoad = 0;
    }

    loadLevel(name) {
        game.stateEngine.loadS(name);
    }

    loadAllAssets(name) {

        this.nextState = false;
        em.clearAll();


        this.loading = true;

        //layoutManager
        lm = [];

        switch (name) {
            case ('second'):


                camera.setDistance(350);
                ef.createStars();
                ef.createFuel(false);
                for (var i = 0; i < 1; i++) {
                    ef.createEnemy();
                }

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
            case ('first'):
                ef.createStars();
                camera.setDistance(100);
                var ship = ef.createShip();

                ef.createEnemy();

                break;

            case ('third'):

                camera.setDistance(200);
                ef.createAsteroidField();
                ef.createStars();
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