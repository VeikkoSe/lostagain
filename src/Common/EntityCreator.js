function entity_creator_constructor() {

    var t, sprite_loader, em, am, sb;

    var init = function(sandbox) {

        sb = sandbox;
    };

    var start = function() {

        em = sb.getEntityManager();
        t = texture_constructor(sb);
        sprite_loader = sprite_constructor(sb);

        am = sb.getAssetManager();

    };

    var createShip = function() {

        var e = em.addNew('ship');

        var mesh = am.getMesh('ship');

        e.addComponent(CameraTargetComponent());

        var rc = RenderableComponent();

        rc.setXPos(10);
        rc.setZPos(20);

        //rc, yPos: 0, zPos: 20}

        e.addComponent(rc);

        var mc = MeshComponent();
        mc.setMesh(mesh);
        e.addComponent(mc);

        var moc = MomentumComponent();
        moc.setTurnSpeed(250);
        moc.setSpeed(50);
        e.addComponent(moc);

        e.addComponent(ControllableComponent());

        e.addComponent(PhotonTorpedoComponent(am.getSprite('bigbullet')));
        e.addComponent(ShieldComponent(10, am.getSprite('shield')));

        e.addComponent(ShieldComponent(10, am.getSprite('shield')));

        e.addComponent(CollisionComponent('player'));

        var sp = am.getSprite('hp');

        e.addComponent(GunComponent());

        e.addComponent(HealthComponent(5, sp));

        //var exMesh = am.getSprite('exhausttrail');
        var exMesh = am.getMesh('exhaustcone');

        var mec = MultiExhaustComponent();
        mec.addExhaust(ExhaustComponent(exMesh, 3, 1.5));
        mec.addExhaust(ExhaustComponent(exMesh, -3, 1.5));
        e.addComponent(mec);

        var sprite = am.getSprite('exhausttrail');

        var mtc = MultiTrailComponent();
        mtc.addTrail(TrailComponent(sprite, 30, 1, 3.5, 1));
        mtc.addTrail(TrailComponent(sprite, 30, 1, -3.5, 1));
        e.addComponent(mtc);

        return e;

    };

    var createDestroyer = function() {


        //em.clearAll();
        var e = em.addNew();

        e.addComponent(ChaseComponent(10));

        var mesh = am.getMesh('destroyer');
        var mc = MeshComponent();
        mc.setMesh(mesh);
        e.addComponent(mc);
        e.addComponent(LaserComponent());

        e.addComponent(CollisionComponent('enemy'));
        var rc = RenderableComponent();

        rc.setXPos(randomRangedInt());
        rc.setZPos(randomRangedInt());

        e.addComponent(rc);

        e.addComponent(ShieldComponent(0, am.getSprite('shield')));
        e.addComponent(HealthComponent(1));

        return e;

    };

    var createIntro = function() {

        var e = em.addNew();
        var m = am.getMesh('start');

        e.addComponent(RenderableComponent());
        e.addComponent(MeshComponent({mesh: m}));

        return e;
    };
    var createStars = function() {

        var e = em.addNew('stars');

        e.addComponent(StarComponent());

        return e;
    };

    var createLayout = function(mothership, ship, radar, currency) {
        var e = em.addNew();
        var lm = [];
        var gt = layout_constructor(0, 0.1);

        gt.addChildren(layout_constructor(5, 0, mothership.components.HealthComponent, 8));
        gt.addChildren(layout_constructor(5, 10, mothership.components.ShieldComponent, 8));
        lm.push(gt);

        var rt = layout_constructor(0, 0);

        rt.addChildren(layout_constructor(5, 5, ship.components.HealthComponent, 8));
        rt.addChildren(layout_constructor(5, 15, ship.components.ShieldComponent, 8));
        lm.push(rt);
        /*
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
         */
        e.addComponent(LayoutComponent(lm));

    };

    var createMine = function() {

        var e = em.addNew('mine');
        var mesh = am.getMesh('mine');
        var m = MeshComponent();
        m.setMesh(mesh);
        e.addComponent(m);
        e.addComponent(ChaseComponent(40));
        e.addComponent(RotationComponent(10, 10, 10));

        //e.addComponent(HealthComponent(2));

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));

        var rc = RenderableComponent();
        rc.setScale(5);
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

    var createMirrorEnemy = function() {

        var e = em.addNew('enemymirror');
        var mesh = am.getMesh('enemy');

        e.addComponent(ChaseComponent(20));
        var m = MeshComponent();
        m.setMesh(mesh);
        e.addComponent(m);
        //e.addComponent(EnemyComponent());

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
    var createCurrency = function() {

        var e = em.addNew();

        e.addComponent(CurrencyComponent(am.getSprite('currency')));
        return e;
    };
    var createRadar = function() {

        var e = em.addNew();
        //var sc = sprite_constructor(sb);
        //, 0.9, 0.74
        e.addComponent(RadarComponent(am.getSprite('radar')));
        return e;
    };

    var createMotherShip = function(target) {

        var e = em.addNew('mothership');

        e.addComponent(SatelliteComponent(am.getMesh('satellite')));

        var mesh = am.getMesh('mothership');

        var m = MeshComponent();
        m.setMesh(mesh);
        e.addComponent(m);

        var rmc = RailsMovementComponent();
        rmc.setRouteEndXpos(target.components.RenderableComponent.getXPos());
        rmc.setRouteEndZpos(target.components.RenderableComponent.getZPos());
        rmc.setRouteDone(false);
        rmc.setSpeed(15);

        e.addComponent(rmc);

        var rc = RenderableComponent();
        rc.setXPos(0);
        rc.setZPos(0);
        rc.setYPos(0);
        e.addComponent(rc);

        e.addComponent(HealthComponent(4, am.getSprite('hp')));
        e.addComponent(ShieldComponent(2, am.getSprite('shield')));
        e.addComponent(ControllableComponent());

        e.addComponent(VisibilityComponent());

        var points = circleXY(0, 0, 0, 300, 200);
        var buffer = sb.getGL().createBuffer();
        //var bd = sb.getGL().bufferData(gl.ARRAY_BUFFER, new Float32Array(points), sb.getGL().STATIC_DRAW);

        sb.getGL().bindBuffer(sb.getGL().ARRAY_BUFFER, buffer);
        sb.getGL().bufferData(sb.getGL().ARRAY_BUFFER, new Float32Array(points), sb.getGL().STATIC_DRAW);

        var jArea = JumpAreaComponent(buffer, points, 0, 0, 0, [0.23, 1.00, 0.63]);

        e.addComponent(jArea);

        e.addComponent(CollisionComponent('player'));

        var exMesh = am.getMesh('exhaustcone');

        var mec = MultiExhaustComponent();
        mec.addExhaust(ExhaustComponent(exMesh, 2, 9));
        mec.addExhaust(ExhaustComponent(exMesh, -2, 9));
        e.addComponent(mec);

        var sprite = am.getSprite('exhausttrail');

        var mtc = MultiTrailComponent();
        mtc.addTrail(TrailComponent(sprite, 15, 1, 5, 8));
        mtc.addTrail(TrailComponent(sprite, 15, 1, -5, 8));
        e.addComponent(mtc);

        return e;
    };
    //for map
    var createBareMotherShip = function() {
        // createBareMotherShip() {

        var e = em.addNew('baremothership');
        var m = am.getMesh('mothership');
        e.addComponent(MeshComponent(m));

        e.addComponent(RenderableComponent());

        e.addComponent(MovableComponent());
        e.addComponent(HexItemComponent('player'));
        e.addComponent(GasComponent());

        return e;
    };
    var createAsteroidField = function() {
        //   createAsteroidField() {

        var e = em.addNew();
        e.addComponent(AsteroidComponent());
        return e;

    };
    var createBackground = function() {
        // createBackground() {

        var e = em.addNew();
        var m = Mesh('background');

        /*m.xPos, m.yPos, m.zPos)

         */
        e.addComponent(RenderableComponent());

        e.addComponent(MeshComponent(m));
        return e;

    };
    var createFuel = function(rand) {

        var e = em.addNew('fuel');
        var m = am.getMesh('fuel');
        var me = MeshComponent();
        me.setMesh(m);
        e.addComponent(me);

        var rc = RenderableComponent();
        rc.setScale(50);
        rc.setXPos(randomRangedInt());
        rc.setZPos(randomRangedInt());
        e.addComponent(rc);

        e.addComponent(RotationComponent(10, 10, 10));
        e.addComponent(CollisionComponent('enemy'));
        e.addComponent(HealthComponent(5));

        return e;

    };
    var createMap = function() {
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
    var createText = function() {
        //createText(level) {
        var e = em.addNew();
        e.addComponent(TextComponent('first'));
    };
    var createPlane = function() {

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

    return {
        start, init,
        createText, createMap, createFuel, createBackground,
        createAsteroidField, createBareMotherShip,
        createMotherShip, createRadar, createMirrorEnemy, createMine, createLayout,
        createCurrency, createStars, createIntro, createDestroyer,
        createShip, createPlane

    };

}