function loader_costructor() {
    "use strict";
    var sb, em, am, loadingLevelName, t, sprite_loader, loading, loadTotal, maxLoad, camera;


    var getLoadingLevelName = function () {
        return loadingLevelName;
    };

    var subscribe = function () {


    };

    var init = function (sandbox) {
        sb = sandbox;

        loadingLevelName = '';
        loading = false;
        loadTotal = 0;
        maxLoad = 0;

    };

    var start = function () {


        camera = sb.getCamera();

        sb.subscribe("loadassets", function (name, wantedState) {

            loadAllAssets(wantedState);

        });


        sb.subscribe("allassetsloaded", function (name, dummy) {

            var level = getLoadingLevelName();
            sb.publish("movetoloadstate", level);
            //sb.publish("movetoloadstate", assetname);
        });

        t = texture_constructor(sb);
        sprite_loader = sprite_constructor(sb);


        em = sb.getEntityManager();
        am = sb.getAssetManager();

    };
//


    var createPlane = function () {

        var e = em.addNew();

        /*
         var rc = RenderableComponent();
         rc.setXPos(0);
         rc.setZPos(0);
         rc.setYPos(0);
         e.addComponent(rc);
         */
        e.addComponent(PlaneComponent(new Plane(sb, 10)));
        return e;

    };


    var loadAllAssets = function (name) {

        //nextState = false;

        //sb.publish("loadingstarted
        loadingLevelName = name;

        loading = true;

        console.log('state:' + name);
        switch (name) {
            case ('introstate'):


                createIntro();

                break;
            case ('gamestate'):


                createDestroyer();

                createText();


                createFuel(false);

                createStars();

                var mothership = createMotherShip();
                var ship = createShip();
                createSatellite(mothership);


                for (var i = 0; i < 10; i++) {
                    createEnemy();
                }


                var radar = createRadar();
                var currency = createCurrency();

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

        //maxLoad = loadTotal;
        //loading = false;
    };


    var createSatellite = function (mothership) {

        var e = em.addNew();
        var mesh = am.getMesh('satellite');

        var rc = RenderableComponent();

        rc.setXPos(0);
        rc.setZPos(0);


        e.addComponent(rc);


        var mc = MeshComponent();
        mc.setMesh(mesh);

        e.addComponent(mc);
    };


    var createShip = function () {


        //em.clearAll();
        var e = em.addNew('ship');

        var mesh = am.getMesh('ship');
        // e.addComponent(entity_constructor({visibility:false}));
        // e.addComponent(MeshComp({mesh:mesh,width:1}));

        var rc = RenderableComponent();

        rc.setXPos(10);
        rc.setZPos(20);

        //rc, yPos: 0, zPos: 20}


        e.addComponent(rc);

        var mc = MeshComponent();
        mc.setMesh(mesh);
        e.addComponent(mc);

        // e.addComponent(RotationComponent());

        //var {speed,turnSpeed,routeEndXpos,routeEndYpos,routeEndZpos} = params;
        //var mm = MomentumMovable({});

        var mc = MomentumComponent();
        mc.setTurnSpeed(250);
        mc.setSpeed(50);
        e.addComponent(mc);
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


        //t.load('hp');

        //var texture = t.getLoadedTexture();

        e.addComponent(ControllableComponent());


        e.addComponent(PhotonTorpedoComponent(am.getSprite('bigbullet')));
        e.addComponent(ShieldComponent(10, am.getSprite('shield')));


        e.addComponent(ShieldComponent(10, am.getSprite('shield')));


        e.addComponent(CollisionComponent('player'));

        var sp = am.getSprite('hp');


        e.addComponent(GunComponent());

        e.addComponent(HealthComponent(5, sp));

        //var texture = t.loadTexture('exhausttrail', false, true);

        //var tc = texture_constructor(sb);
        //t.loadTexture({name});

        //texture = tc.getLoadedTexture();


        var mec = MultiExhaustComponent();
        mec.addExhaust(ExhaustComponent(am.getSprite('exhausttrail'), 30, 1, 3.5));
        mec.addExhaust(ExhaustComponent(am.getSprite('exhausttrail'), 30, 1, -3.5));
        e.addComponent(mec);

        return e;

    };


    var createDestroyer = function () {


        //em.clearAll();
        var e = em.addNew();

        var mesh = am.getMesh('destroyer');
        var mc = MeshComponent();
        mc.setMesh(mesh);
        e.addComponent(mc);
        e.addComponent(LaserComponent());


        var rc = RenderableComponent();

        rc.setXPos(100);
        rc.setZPos(-150);

        e.addComponent(rc);


        return e;

    };

    var createIntro = function () {

        var e = em.addNew();
        var m = am.getMesh('start');


        e.addComponent(RenderableComponent());
        e.addComponent(MeshComponent({mesh: m}));

        return e;
    };
    var createStars = function () {

        var e = em.addNew('stars');

        e.addComponent(StarComponent());

        return e;
    };


    var createLayout = function (mothership, ship, radar, currency) {
        var e = em.addNew('enemymirror');
        var lm = [];
        var gt = layout_constructor(0, 0.1);
        gt.addChildren(layout_constructor(5, 0, mothership.components.HealthComponent, 8));
        gt.addChildren(layout_constructor(5, 10, mothership.components.ShieldComponent, 8));
        lm.push(gt);

        var rt = layout_constructor(0, 0);
        rt.addChildren(layout_constructor(5, 5, ship.components.HealthComponent, 8));
        rt.addChildren(layout_constructor(5, 15, ship.components.ShieldComponent, 8));
        lm.push(rt);
        if (radar) {

            var lb = layout_constructor(1, 1);
            lb.addChildren(layout_constructor(5, 5, radar.components.RadarComponent, 55));
            lm.push(lb);
        }
        if (currency) {
            var lh = layout_constructor(0, 1);
            lh.addChildren(layout_constructor(5, 5, currency.components.CurrencyComponent, 8));
            lm.push(lh);
        }
        e.addComponent(LayoutComponent(lm));
    };

    var createEnemy = function () {


        var e = em.addNew('enemymirror');
        var mesh = am.getMesh('enemy');
        var m = MeshComponent();
        m.setMesh(mesh);
        e.addComponent(m);
        e.addComponent(EnemyComponent());

        //e.addComponent(HealthComponent(2));

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));


        var rc = RenderableComponent();
        rc.setXPos(randomRangedInt());
        rc.setZPos(randomRangedInt());
        e.addComponent(rc);

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

        e.addComponent(CollisionComponent('enemy'));
        e.addComponent(HealthComponent(1));

        return e;

    };
    var createCurrency = function () {

        var e = em.addNew();

        //var sc = sprite_constructor(sb);
//"currency", 0.9, 0.74
        e.addComponent(CurrencyComponent(am.getSprite('currency')));
        return e;
    };
    var createRadar = function () {

        var e = em.addNew();
        //var sc = sprite_constructor(sb);
        //, 0.9, 0.74
        e.addComponent(RadarComponent(am.getSprite('radar')));
        return e;
    };

    var createMotherShip = function () {


        var e = em.addNew('mothership');


        var mesh = am.getMesh('mothership');

        var m = MeshComponent();
        m.setMesh(mesh);
        e.addComponent(m);


        var mc = MomentumComponent();

        mc.setTurnSpeed(250);
        mc.setSpeed(50);
        e.addComponent(mc);

        /*m.xPos, m.yPos, m.zPos, 2)*/
        //{xPos: 10, yPos: 0, zPos: 20}
        var rc = RenderableComponent();
        rc.setXPos(0);
        rc.setZPos(0);
        rc.setYPos(0);
        e.addComponent(rc);

        e.addComponent(HealthComponent(50, am.getSprite('hp')));
        e.addComponent(ShieldComponent(2, am.getSprite('shield')));
        e.addComponent(ControllableComponent());
        e.addComponent(CameraTargetComponent());

        e.addComponent(VisibilityComponent());


        var points = circleXY(0, 0, 0, 300, 200);
        var buffer = sb.getGL().createBuffer();
        //var bd = sb.getGL().bufferData(gl.ARRAY_BUFFER, new Float32Array(points), sb.getGL().STATIC_DRAW);


        sb.getGL().bindBuffer(sb.getGL().ARRAY_BUFFER, buffer);
        sb.getGL().bufferData(sb.getGL().ARRAY_BUFFER, new Float32Array(points), sb.getGL().STATIC_DRAW);

        var jArea = JumpAreaComponent(buffer, points, 0, 0, 0, [0.23, 1.00, 0.63]);

        e.addComponent(jArea);

        e.addComponent(CollisionComponent('player'));


        //var tc = texture_constructor(sb);
        // t.load({name: 'exhaust'});

        //var texture = t.getLoadedTexture();

        var sprite = am.getSprite('exhaust');

        var mec = MultiExhaustComponent();
        mec.addExhaust(ExhaustComponent(sprite, 5, 4, 12, 18));
        mec.addExhaust(ExhaustComponent(sprite, 5, 4, -12, 18));
        e.addComponent(mec);


        /*


         //e.addComponent(new Drivable());
         //can be only one. Camera follows this entity




         //var sc = sprite_component(sb);

         //var shield = sc.loadSprite("shield", -0.9, -0.74);
         e.addComponent(HealthComponent(10, am.getSprite('hp')));






         */

        return e;
    };
    //for map
    var createBareMotherShip = function () {
        // createBareMotherShip() {

        var e = em.addNew('baremothership');
        var m = am.getMesh('mothership');
        e.addComponent(MeshComponent(m));
//0, 0.5, 0, 0.05
        e.addComponent(RenderableComponent());

        e.addComponent(MovableComponent());
        e.addComponent(HexItemComponent('player'));
        e.addComponent(GasComponent());


        return e;
    };
    var createAsteroidField = function () {
        //   createAsteroidField() {

        var e = em.addNew();
        e.addComponent(AsteroidComponent());
        return e;

    };
    var createBackground = function () {
        // createBackground() {

        var e = em.addNew();
        var m = Mesh("background");

        /*m.xPos, m.yPos, m.zPos)

         */
        e.addComponent(RenderableComponent());

        e.addComponent(MeshComponent(m));
        return e;

    };
    var createFuel = function (rand) {


        var e = em.addNew();
        var m = am.getMesh('fuel');
        var me = MeshComponent();
        me.setMesh(m);
        e.addComponent(me);

        var rc = RenderableComponent();
        rc.setScale(50);
        rc.setXPos(100);
        rc.setZPos(200);
        e.addComponent(rc);
        // }
        e.addComponent(RotationComponent(10, 10, 10));
        e.addComponent(CollisionComponent('enemy'));
        e.addComponent(HealthComponent(5));

        return e;

    };
    var createPlane = function () {

        var e = em.addNew();

        var rc = RenderableComponent();
        rc.setXPos(0);
        rc.setZPos(0);
        rc.setYPos(0);
        e.addComponent(rc);

        e.addComponent(PlaneComponent(new Plane(80)));
        return e;

    };
    var createMap = function () {
        // createMap() {
        var e = em.addNew('map');
        //var t = new Texture('maptiles');
        e.addComponent(MapComponent());
        //var hg = new Hexagon(5);
        //e.addComponent(new PrimitiveComponent(hg.area,[0.75,0.75,0]));

        e.addComponent(new Renderable(0,//x
            0,//y
            0//z
        )); //zWidth


        return e;

    };
    var createText = function () {
        //createText(level) {
        var e = em.addNew();
        e.addComponent(TextComponent('first'));
    };


    return Object.freeze({

        loadAllAssets,
        init,
        subscribe,
        start


    });


}