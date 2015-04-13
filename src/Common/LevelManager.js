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
                ef.createShip();


                //this.ef.createBox();

                break;
            case ('second') :

                camera.setDistance(10);
                // ef.createMotherShip();
                var ship = ef.createShip();

                var radar = ef.createRadar();
                var currency = ef.createCurrency();


                //var lt = new Layout(false,0.9, 0.8);
                //lt.addChildren(new Layout(new Sprite("hp"),5,5));
                //lt.addChildren(new Layout(new Sprite("shield"),5,20));

                var rt = new Layout(0.5, 0.5);
                rt.addChildren(new Layout(5, 5, new Texture("radar")),radar.components.RadarComponent);
                rt.addChildren(new Layout(5,20, new Texture("currency")),currency.components.CurrencyComponent);

                lm.push(rt);

                var lb = new Layout(false,0, 0);
                lb.addChildren(new Layout(5,5,new Texture("hp"),ship.components.HealtComponent));
                lb.addChildren(new Layout(5,20,new Texture("shield"),ship.components.ShieldComponent));

                lm.push(lb);

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