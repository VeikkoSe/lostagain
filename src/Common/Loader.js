function loader_costructor(sb) {
    //let {em} = params;
    let em = sb.getEntityManager();
    let am = sb.getAssetManager();
    //let am = sb.getAm();
    //let am = ;
    let loadingLevelName = '';
    let t = texture_constructor(sb);
    let sprite_loader = sprite_constructor(sb);
    //let t = texture_constructor('exhausttrailm', false, true);


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


        switch (name) {
            case ('introstate'):

                //console.log(name);
                createIntro();
                createShip();
                break;
            case ('gamestate'):

                camera.setDistance(350);

                //console.log(name);

                //createText();


                createFuel(false);

                createStars();
                let ship = createShip();

                let mothership = createMotherShip();





                 for (let i = 0; i < 10; i++) {
                 createEnemy();
                 }



                 // let radar = createRadar();
                 //let currency = createCurrency();

                 createLayout(mothership, ship);


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

        //em.clearAll();
        let e = em.addNew('ship');

        let mesh = am.getMesh('ship');
        // e.addComponent(entity_constructor({visibility:false}));
        // e.addComponent(MeshComp({mesh:mesh,width:1}));

        e.addComponent(RenderableComponent({xPos: 10, yPos: 0, zPos: 20}));
        e.addComponent(MeshComponent({mesh}));

        e.addComponent(RotationComponent({}));

        //let {speed,turnSpeed,routeEndXpos,routeEndYpos,routeEndZpos} = params;
        //let mm = MomentumMovable({});

        e.addComponent(MomentumComponent({}));
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


        t.load({name: 'hp'});

        let texture = t.getLoadedTexture();

        e.addComponent(ControllableComponent());
        //let sc = sprite_constructor(sb);
        //e.addComponent(HealthComponent(5,sprite_loader.load("hp", -0.9, -0.8) ));
        //e.addComponent(PhotonTorpedoComponent(sc.loadSprite("bigbullet", 0, 0)));
        //e.addComponent(ShieldComponent(10, sc.loadSprite("shield", -0.9, -0.74)));
        e.addComponent(HealthComponent(5, sprite_loader.load("hp")));
        e.addComponent(ShieldComponent(10, sprite_loader.load("shield")));
        e.addComponent(PhotonTorpedoComponent(sprite_loader.load("bigbullet")));
        e.addComponent(GunComponent());
        e.addComponent(CollisionComponent('player'));


        //let t = texture_constructor();

        t.load({name: 'exhausttrail'});

        let texture = t.getLoadedTexture();
        //let texture = t.loadTexture('exhausttrail', false, true);

        //let tc = texture_constructor(sb);
        //t.loadTexture({name});

        //texture = tc.getLoadedTexture();

        let mec = MultiExhaustComponent();
        mec.addExhaust(ExhaustComponent(texture, 30, 1, 3.5));
        mec.addExhaust(ExhaustComponent(texture, 30, 1, -3.5));
        e.addComponent(mec);

        return e;

    };

    let createIntro = function () {

        let e = em.addNew();
        let m = am.getMesh('start');

        //console.log(m);
//
        e.addComponent(RenderableComponent({scale: 0.05,xPos: 10, yPos: 10, zPos: 10}));
        e.addComponent(MeshComponent({mesh: m}));

        return e;
    };
    let createStars = function () {
//console.log('a');
        let e = em.addNew('stars');

        e.addComponent(StarComponent());

        return e;
    };
    let randomRangedInt = function () {

        let rnd = getRandomInt(500, -500);
        if (rnd > 100 ||
            rnd < -100) {
            return rnd;
        }
        else
            return randomRangedInt();
    }

    let randomCloseInt = function () {

        let rnd = getRandomInt(30, -30);

            return rnd;

    }

    let createLayout = function (mothership, ship, radar = false, currency = false) {
        let e = em.addNew('enemymirror');
        let lm = [];
        let gt = layout_constructor(0, 0.1);
        gt.addChildren(layout_constructor(5, 0, mothership.components.HealthComponent, 8));
        gt.addChildren(layout_constructor(5, 10, mothership.components.ShieldComponent, 8));
        lm.push(gt);

        let rt = layout_constructor(0, 0);
        rt.addChildren(layout_constructor(5, 5, ship.components.HealthComponent, 8));
        rt.addChildren(layout_constructor(5, 15, ship.components.ShieldComponent, 8));
        lm.push(rt);
        if (radar) {

            let lb = layout_constructor(1, 1);
            lb.addChildren(layout_constructor(5, 5, radar.components.RadarComponent, 55));
            lm.push(lb);
        }
        if (currency) {
            let lh = layout_constructor(0, 1);
            lh.addChildren(layout_constructor(5, 5, currency.components.CurrencyComponent, 8));
            lm.push(lh);
        }
        e.addComponent(LayoutComponent(lm));
    }

    let createEnemy = function () {


        let e = em.addNew('enemymirror');
        let mesh = am.getMesh('enemy');

        e.addComponent(MeshComponent({mesh:mesh}));
        e.addComponent(EnemyComponent());

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));

        let xp = randomCloseInt();
        let zp = randomCloseInt();

        e.addComponent(RenderableComponent({xPos: xp, yPos: 0, zPos: zp}));

        /*xp, //x
         0, //y
         zp, //z
         1,//scope
         1,//angleX
         0,//angleY
         0,//angleZ
         10,//xWidth
         10,//yWidth
         10//zWidth5
         )*/

       // e.addComponent(CollisionComponent('enemy'));
        //e.addComponent(HealthComponent(1));

        return e;

    };
    let createCurrency = function () {

        let e = em.addNew();

        let sc = sprite_constructor(sb);
//"currency", 0.9, 0.74
        e.addComponent(CurrencyComponent(sprite_loader.load("currency")));
        return e;
    }
    let createRadar = function () {

        let e = em.addNew();
        //let sc = sprite_constructor(sb);
        //, 0.9, 0.74
        e.addComponent(new RadarComponent(sprite_loader.load("radar")));
        return e;
    };
    let createMotherShip = function () {


        let e = em.addNew('mothership');

        let mesh = am.getMesh('mothership');
        //let m = am.getMesh('mothership');
        e.addComponent(MeshComponent({mesh}));


        e.addComponent(MovableComponent(30));
        /*m.xPos, m.yPos, m.zPos, 2)*/
        e.addComponent(RenderableComponent({xPos: 10, yPos: 0, zPos: 20}));
        e.addComponent(ControllableComponent());
        // e.addComponent(VisibilityComponent({}));
        e.addComponent(MomentumComponent({}));

        //e.addComponent(new Drivable());
        //can be only one. Camera follows this entity
        e.addComponent(CameraTargetComponent());

        //e.addComponent(JumpAreaController(0,0, 0, [0.23, 1.00, 0.63]));

        //let sc = sprite_component(sb);
        //let hp = sc.loadSprite("hp", -0.9, -0.8);
        //let shield = sc.loadSprite("shield", -0.9, -0.74);
        e.addComponent(HealthComponent(10, sprite_loader.load("hp")));
        e.addComponent(ShieldComponent(2, sprite_loader.load("shield")));


        //let tc = texture_constructor(sb);
        t.load({name: 'exhaust'});

        let texture = t.getLoadedTexture();

        let mec = new MultiExhaustComponent();
        mec.addExhaust(ExhaustComponent(texture, 5, 4, 12, 18));
        mec.addExhaust(ExhaustComponent(texture, 5, 4, -12, 18));
        e.addComponent(mec);

        e.addComponent(new CollisionComponent('player'));
        return e;
    }
    let createTerrain = function () {
        //createTerrain() {

        let e = em.addNew('terrain');
        let m = am.getMesh('terrain');

        e.addComponent(MeshComponent(m));
        e.addComponent(Renderable(m.xPos, m.yPos, m.zPos));

        return e;

    }
    let createBareMotherShip = function () {
        // createBareMotherShip() {

        let e = em.addNew('baremothership');
        let m = am.getMesh('mothership');
        e.addComponent(new MeshComponent(m));
//0, 0.5, 0, 0.05
        e.addComponent(RenderableComponent({}));

        e.addComponent(MovableComponent());
        e.addComponent(HexItemComponent('player'));
        e.addComponent(GasComponent());


        return e;
    };
    let createAsteroidField = function () {
        //   createAsteroidField() {

        let e = em.addNew();
        e.addComponent(AsteroidComponent());
        return e;

    };
    let createBackground = function () {
        // createBackground() {

        let e = em.addNew();
        let m = Mesh("background");

        /*m.xPos, m.yPos, m.zPos)

         */
        e.addComponent(RenderableComponent({}));

        e.addComponent(MeshComponent(m));
        return e;

    };
    let createFuel = function (rand) {
        //createFuel(rand) {


        let e = em.addNew();
        let m = am.getMesh('fuel');
        e.addComponent(MeshComponent({mesh:m}));
        //e.addComponent(new JumpHold());

        //e.addComponent(new Movable(12));
        if (rand) {

            //getRandomInt(-200, 200), 0, getRandomInt(200, -200), 50)
            e.addComponent(RenderableComponent({}));
        }
        else {
            //110, 0, 50, 50
            e.addComponent(RenderableComponent({xPos: 10, yPos: 10, zPos: 10}));
        }
        e.addComponent(RotationComponent({x: 10, y: 10, z: 10}));
        e.addComponent(CollisionComponent('enemy'));
        //e.addComponent(HealthComponent(20));

        return e;

    };
    let createPlane = function () {
        //createPlane() {
        let e = em.addNew();
        //e.addComponent(new PlaneComponent(new Plane(80)));
        return e;

    };
    let createMap = function () {
        // createMap() {
        let e = em.addNew('map');
        //let t = new Texture('maptiles');
        e.addComponent(MapComponent());
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
        e.addComponent(TextComponent('first'));
    };


    return Object.freeze({

        loadAllAssets,
        init,
        subscribe


    });


}