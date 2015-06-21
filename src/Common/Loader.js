function loader_costructor(sb) {
    //let {em} = params;
    let em = sb.getEntityManager();
    let am = sb.getAssetManager();
    //let am = sb.getAm();
    //let am = ;
    let loadingLevelName = '';


    let loading = false;
    let loadTotal = 0;
    //let nextState = false;
    //let currentState = null;
    let maxLoad = 0;
    let camera = sb.getCamera();
    //let ef = entity_factory_constuctor({am,em});

    //let texture = texture_constructor(sb);
    //let mesh = mesh_constructor(sb);
    let am = asset_manager_constructor(sb);

    let getLoadingLevelName = function () {
        return loadingLevelName;
    }

    let subscribe = function () {

        am.subscribe();

        sb.subscribe("loadassets", function (name, wantedState) {

            loadAllAssets(wantedState);
            //sb.publish("movetoloadstate", assetname);
        });


        sb.subscribe("allassetsloaded", function (name, dummy) {

            level = getLoadingLevelName();
            sb.publish("movetoloadstate", level);
            //sb.publish("movetoloadstate", assetname);
        });


    }

    let init = function () {


    }
//
    //let loadLevel = function(name) {

    //game.stateengine.loadS(name);
    //};


    let loadAllAssets = function (name) {

        //nextState = false;

        //sb.publish("loadingstarted
        loadingLevelName = name;

        loading = true;

        //layoutManager
        //lm = [];

        switch (name) {
            case ('introstate'):

                console.log(name);
                createIntro();
                createShip();
                break;
            case ('gamestate'):
                camera.setDistance(350);

                console.log(name);

                //ef.createText();


                //ef.createFuel(false);


                //ef.createStars();
                /*
                 for (let i = 0; i < 10; i++) {
                 ef.createEnemy();
                 }
                 */
                //let mothership = ef.createMotherShip();
                createShip();


                // let radar = ef.createRadar();
                // let currency = ef.createCurrency();

                /*
                 let gt = new Layout(0, 0.1);
                 gt.addChildren(new Layout(5, 0, mothership.components.HealthComponent, 8));
                 gt.addChildren(new Layout(5, 10, mothership.components.ShieldComponent, 8));
                 lm.push(gt);

                 let rt = new Layout(0, 0);
                 rt.addChildren(new Layout(5, 5, ship.components.HealthComponent, 8));
                 rt.addChildren(new Layout(5, 15, ship.components.ShieldComponent, 8));
                 lm.push(rt);

                 let lb = new Layout(1, 1);
                 lb.addChildren(new Layout(5, 5, radar.components.RadarComponent, 55));
                 lm.push(lb);
                 let lh = new Layout(0, 1);
                 lh.addChildren(new Layout(5, 5, currency.components.CurrencyComponent, 8));
                 lm.push(lh);
                 */

                break;
            case ('second'):
                createStars();
                //camera.setDistance(100);
                createMotherShip();

                //ef.createEnemy();

                break;

            case ('third'):

                // camera.setDistance(200);
                createAsteroidField();
                createStars();
                createMotherShip();
                createShip();

                break;


        }
        maxLoad = loadTotal;
        loading = false;
    };


    let createShip = function () {

        em.clearAll();
        let e = em.addNew('ship');

        let mesh = am.getMesh('ship');
        // e.addComponent(entity_constructor({visibility:false}));
        // e.addComponent(MeshComp({mesh:mesh,width:1}));

        e.addComponent(Renderable({}));
        e.addComponent(MeshComponent({mesh}));

        e.addComponent(ConstantRotation({x: 10, y: 10, z: 10}));

        //let {speed,turnSpeed,routeEndXpos,routeEndYpos,routeEndZpos} = params;
        //let mm = MomentumMovable({});

        e.addComponent(MomentumMovable({}));
        /*
         e.addComponent(new Renderable(1,//x
         0,//y
         20,//z
         1,//scape
         0,//angleX
         -90,//angleY
         0,//angleZ
         10,//xWidth
         10,//yWidth
         10)); //zWidth
         */

        //e.addComponent(new Controllable());

        //e.addComponent(new HealthComponent(5, new Sprite("hp", -0.9, -0.8)));
        //e.addComponent(new ShieldComponent(10, new Sprite("shield", -0.9, -0.74)));
        //e.addComponent(new PhotonTorpedoComponent(new Sprite("bigbullet", 0, 0)));
        //e.addComponent(new GunComponent());
        //e.addComponent(new CollisionComponent('player'));


        //let t = new Texture('exhausttrail', false, true);

        //let mec = new MultiExhaustComponent();
        //mec.addExhaust(new ExhaustComponent(t.loadedTexture, 30, 1, 3.5));
        //mec.addExhaust(new ExhaustComponent(t.loadedTexture, 30, 1, -3.5));
        //e.addComponent(mec);

        return e;

    };

    let createIntro = function () {

        let e = em.addNew();
        let m = am.getMesh('start');

        //console.log(m);

        e.addComponent(Renderable({scale: 0.05}));
        e.addComponent(MeshComponent({mesh: m}));

        return e;
    };
    let createStars = function () {

        let e = em.addNew('stars');

        e.addComponent(new StarComponent());
        return e;
    };
    let randomRangedInt = function () {

        let rnd = getRandomInt(500, -500);
        if (rnd > 100 ||
            rnd < -100) {
            return rnd;
        }
        else
            return this.randomRangedInt();
    }
    let createEnemy = function () {


        let e = em.addNew('enemymirror');
        // let m = mm.getOrAddMesh('enemy');
        //e.addComponent(new MeshComponent(mesh));
        e.addComponent(new EnemyComponent());

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));

        let xp = randomRangedInt();
        let zp = randomRangedInt();

        e.addComponent(new Renderable(xp, //x
            0, //y
            zp, //z
            1,//scope
            1,//angleX
            0,//angleY
            0,//angleZ
            10,//xWidth
            10,//yWidth
            10//zWidth5
        ));

        e.addComponent(new CollisionComponent('enemy'));
        e.addComponent(new HealthComponent(1));

        return e;

    };
    let createCurrency = function () {

        let e = em.addNew();
        e.addComponent(new CurrencyComponent(new Sprite("currency", 0.9, 0.74)));
        return e;
    }
    let createRadar = function () {

        let e = em.addNew();
        e.addComponent(new RadarComponent(new Sprite("radar", 0.9, 0.74)));
        return e;
    };
    let createMotherShip = function () {


        let e = em.addNew('mothership');
        let m = mm.getOrAddMesh('mothership');
        e.addComponent(new MeshComponent(m));


        e.addComponent(new Movable(30));
        e.addComponent(new Renderable(m.xPos, m.yPos, m.zPos, 2));
        e.addComponent(new Controllable());
        e.addComponent(new Visibility(false));
        e.addComponent(new MomentumMovable(15, 100));

        //e.addComponent(new Drivable());
        //can be only one. Camera follows this entity
        e.addComponent(new CameraController());

        e.addComponent(new JumpArea(m.xPos, m.yPos, m.zPos, [0.23, 1.00, 0.63]));


        e.addComponent(new HealthComponent(10, new Sprite("hp", -0.9, -0.8)));
        e.addComponent(new ShieldComponent(2, new Sprite("shield", -0.9, -0.74)));


        let t = new Texture('exhausttrailm', false, true);


        let mec = new MultiExhaustComponent();
        mec.addExhaust(new ExhaustComponent(t.loadedTexture, 5, 4, 12, 18));
        mec.addExhaust(new ExhaustComponent(t.loadedTexture, 5, 4, -12, 18));
        e.addComponent(mec);

        e.addComponent(new CollisionComponent('player'));
        return e;
    }
    let createTerrain = function () {
        //createTerrain() {

        let e = em.addNew('terrain');
        let m = mm.getOrAddMesh('terrain');
        e.addComponent(new MeshComponent(m));
        e.addComponent(new Renderable(m.xPos, m.yPos, m.zPos));

        return e;

    }
    let createBareMotherShip = function () {
        // createBareMotherShip() {

        let e = em.addNew('baremothership');
        let m = mm.getOrAddMesh('mothership');
        e.addComponent(new MeshComponent(m));

        e.addComponent(new Renderable(0, 0.5, 0, 0.05));
        // e.addComponent(new Controllable());
        //e.addComponent(new MomentumMovable(2, 100));
        e.addComponent(new Movable());
        e.addComponent(new HexItem('player'));
        e.addComponent(new GasComponent());


        return e;
    };
    let createAsteroidField = function () {
        //   createAsteroidField() {

        let e = em.addNew();
        e.addComponent(new AsteroidComponent());
        return e;

    };
    let createBackground = function () {
        // createBackground() {

        let e = em.addNew();
        let m = new Mesh("background");


        e.addComponent(new Renderable(m.xPos, m.yPos, m.zPos));

        e.addComponent(new MeshComponent(m));
        return e;

    };
    let createFuel = function () {
        //createFuel(rand) {


        let e = em.addNew();
        let m = mm.getOrAddMesh('fuel');
        e.addComponent(new MeshComponent(m));
        e.addComponent(new JumpHold());

        //e.addComponent(new Movable(12));
        if (rand) {
            e.addComponent(new Renderable(getRandomInt(-200, 200), 0, getRandomInt(200, -200), 50));
        }
        else {
            e.addComponent(new Renderable(110, 0, 50, 50));
        }
        e.addComponent(new ConstantRotation(10, 10, 10));
        e.addComponent(new CollisionComponent('enemy'));
        e.addComponent(new HealthComponent(20));

        return e;

    };
    let createPlane = function () {
        //createPlane() {
        let e = em.addNew();
        e.addComponent(new PlaneComponent(new Plane(80)));
        return e;

    };
    let createMap = function () {
        // createMap() {
        let e = em.addNew('map');
        //let t = new Texture('maptiles');
        e.addComponent(new MapComponent());
        //let hg = new Hexagon(5);
        //e.addComponent(new PrimitiveComponent(hg.area,[0.75,0.75,0]));

        e.addComponent(new Renderable(0,//x
            0,//y
            0//z
        )); //zWidth


        return e;

    };
    let createText = function () {
        //createText(level) {
        let e = em.addNew();
        e.addComponent(new TextComponent(level));
    };


    return Object.freeze({

        loadAllAssets,
        init,
        subscribe


    });


}