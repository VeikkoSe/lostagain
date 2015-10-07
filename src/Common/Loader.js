function loader_costructor() {
    'use strict';
    var sb, em, am, loadingLevelName, t, sprite_loader, loading, loadTotal, maxLoad, camera,ec;

    var getLoadingLevelName = function() {
        return loadingLevelName;
    };

    var subscribe = function() {

    };

    var init = function(sandbox) {
        sb = sandbox;

        loadingLevelName = '';
        loading = false;
        loadTotal = 0;
        maxLoad = 0;

    };

    var start = function() {

        //camera = sb.getCamera();
        ec = sb.getEntityCreator();
        //em = sb.getEntityManager();
        //am = sb.getAssetManager();

        //t = texture_constructor(sb);
        //sprite_loader = sprite_constructor(sb);


        sb.subscribe("loadassets", function(name, wantedState) {

            loadAllAssets(wantedState);

        });

        sb.subscribe("allassetsloaded", function(name, dummy) {

            var level = getLoadingLevelName();
            sb.publish("movetoloadstate", level);
            //sb.publish("movetoloadstate", assetname);
        });




    };
//



    var loadAllAssets = function(name) {

        //nextState = false;

        //sb.publish("loadingstarted
        loadingLevelName = name;

        loading = true;

        switch (name) {
            case ('introstate'):

                ec.createIntro();

                break;
            case ('gamestate'):

                ec.createDestroyer();

                ec.createText();

                var target = ec.createFuel(true);

                ec.createStars();

                var mothership = ec.createMotherShip(target);
                var ship = ec.createShip();
                //createSatellite(mothership);

                for (var i = 0; i < 10; i++) {
                    //  createEnemy();
                }

                var radar = ec.createRadar();
                var currency = ec.createCurrency();

                ec.createLayout(mothership, ship, radar, currency);

                break;
            case ('second'):
                //ec.createStars();
                //camera.setDistance(100);
                //ec.createMotherShip();

                //ef.createEnemy();

                break;

            case ('third'):

                // camera.setDistance(200);
               // createAsteroidField();
               // createStars();
               // createMotherShip();
                //createShip();

                break;

        }

        //maxLoad = loadTotal;
        //loading = false;
    };


    return Object.freeze({

        loadAllAssets,
        init,
        subscribe,
        start

    });

}