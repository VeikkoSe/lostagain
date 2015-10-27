function entityCreator() {
    'use strict';
    var t, em, am, sb;

    var init = function(sandbox) {

        sb = sandbox;
    };

    var start = function() {

        em = sb.getEntityManager();
        t = textureCreator(sb);
        //sprite_loader = sprite(sb);

        am = sb.getAssetManager();

    };

    var createShip = function() {

        var e = em.addNew('ship');

        var mesh = am.getMesh('ship');

        e.addComponent(cameraTargetComponent());

        var rc = renderableComponent();

        rc.setXPos(10);
        rc.setZPos(20);

        //rc, yPos: 0, zPos: 20}

        e.addComponent(rc);

        var mc = meshComponent();
        mc.setMesh(mesh);
        e.addComponent(mc);

        var shieldBubbleMesh = am.getMesh('fuel');

        var shieldBubble = meshComponent();
        shieldBubble.setMesh(shieldBubbleMesh);

        var moc = momentumComponent();
        moc.setTurnSpeed(250);
        moc.setSpeed(50);
        e.addComponent(moc);

        e.addComponent(controllableComponent());

        var pc = pulseGunComponent(am.getSprite('bigbullet'));

        var bullets = [];
        for (var i = 0; i < pc.getBulletsAmount(); i++) {
            var bulVar = photonTorpedoComponent();
            bullets.push(bulVar);
        }

        pc.setBullets(bullets);

        pc.setPointStartPositionBuffer(sb.getGL().createBuffer());

        e.addComponent(pc);
        e.addComponent(shieldComponent(3, am.getSprite('shield'), am.getMesh('shieldbubble'), 8));

        e.addComponent(collisionComponent('player'));

        e.addComponent(gunComponent());

        e.addComponent(healthComponent(3, am.getSprite('hp')));

        //var exMesh = am.getSprite('exhausttrail');
        var exMesh = am.getMesh('exhaustcone');

        var mec = multiExhaustComponent();
        mec.addExhaust(exhaustComponent(exMesh, 3, 1.5));
        mec.addExhaust(exhaustComponent(exMesh, -3, 1.5));
        e.addComponent(mec);

        var sprite = am.getSprite('exhausttrail');

        var mtc = multiTrailComponent();
        mtc.addTrail(trailComponent(sprite, 30, 1, 3.5, 1));
        mtc.addTrail(trailComponent(sprite, 30, 1, -3.5, 1));
        e.addComponent(mtc);

        return e;

    };

    var createDestroyer = function(spawnRelated) {


        //em.clearAll();
        var e = em.addNew('destroyer');

        e.addComponent(chaseComponent(17));
        var fc = faceComponent();
        fc.setTarget('player'); //dummy, we take ship or mothership depending who is closest
        e.addComponent(fc);

        var mesh = am.getMesh('destroyer');
        var mc = meshComponent();
        mc.setMesh(mesh);
        e.addComponent(mc);
        e.addComponent(laserComponent());

        e.addComponent(collisionComponent('enemy'));
        var rc = renderableComponent();

        rc.setXPos(randomRangedIntFromPos(spawnRelated.components.RenderableComponent.getXPos()));
        rc.setZPos(randomRangedIntFromPos(spawnRelated.components.RenderableComponent.getZPos()));
        //rc.setXPos(randomRangedInt());
        //rc.setZPos(randomRangedInt());

        e.addComponent(rc);

        e.addComponent(shieldComponent(0, am.getSprite('shield')));
        e.addComponent(healthComponent(1));

        e.addComponent(respawnComponent());

        return e;

    };

    var createIntro = function() {

        var e = em.addNew();
        var m = am.getMesh('start');

        e.addComponent(renderableComponent());
        e.addComponent(meshComponent({mesh: m}));

        return e;
    };
    var createStars = function() {

        var e = em.addNew('stars');

        e.addComponent(starComponent());

        return e;
    };

    var createLayout = function(mothership, ship, radar, currency) {
        var e = em.addNew();
        var lg = layoutComponent();
        lg.setRoot(true);
        var lm = layoutComponent(0.0, 0.06, am.getSprite('mothershipicon'));

        var h = layoutComponent(5, 10, false, mothership.components.ShieldComponent);
        h.setSize(8);
        lm.addChildren(h);

        var d = layoutComponent(5, 0, false, mothership.components.HealthComponent);
        d.setSize(8);
        lm.addChildren(d);

        var ls = layoutComponent(0.0, 0.0, am.getSprite('shipicon'));
        var j = layoutComponent(5, 10, false, ship.components.ShieldComponent);
        j.setSize(8);
        ls.addChildren(j);

        var a = layoutComponent(5, 0, false, ship.components.HealthComponent);
        a.setSize(8);
        ls.addChildren(a);

        lg.addChildren(ls);
        lg.addChildren(lm);
        e.addComponent(lg);

    };

    var createMine = function(spawnRelated) {

        var e = em.addNew('mine');
        var mesh = am.getMesh('mine');
        var m = meshComponent();
        m.setMesh(mesh);
        e.addComponent(m);
        e.addComponent(chaseComponent(50));
        e.addComponent(rotationComponent(10, 10, 10));

        var rc = renderableComponent();
        rc.setScale(5);

        rc.setXPos(randomRangedIntFromPos(spawnRelated.components.RenderableComponent.getXPos()));
        rc.setZPos(randomRangedIntFromPos(spawnRelated.components.RenderableComponent.getZPos()));
        e.addComponent(rc);

        e.addComponent(respawnComponent());

        e.addComponent(collisionComponent('enemy'));
        e.addComponent(healthComponent(1));

        return e;

    };

    var createMirrorEnemy = function(spawnRelated) {

        var e = em.addNew('enemymirror');
        var mesh = am.getMesh('enemy');

        var m = meshComponent();
        m.setMesh(mesh);
        e.addComponent(m);
        e.addComponent(chaseComponent(50));

        var pc = pulseGunComponent(am.getSprite('bigbullet'));

        var bullets = [];
        for (var i = 0; i < pc.getBulletsAmount(); i++) {
            var bulVar = photonTorpedoComponent();
            bullets.push(bulVar);
        }

        pc.setBullets(bullets);

        pc.setPointStartPositionBuffer(sb.getGL().createBuffer());

        e.addComponent(pc);

        //e.addComponent(EnemyComponent());

        //e.addComponent(HealthComponent(2));

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));

        var rc = renderableComponent();

        rc.setXPos(randomRangedIntFromPos(spawnRelated.components.RenderableComponent.getXPos()));
        rc.setZPos(randomRangedIntFromPos(spawnRelated.components.RenderableComponent.getZPos()));
        //rc.setXPos(randomCloseInt());
        //rc.setZPos(randomCloseInt());
        e.addComponent(rc);

        e.addComponent(collisionComponent('enemy'));
        e.addComponent(healthComponent(1));

        return e;

    };
    var createCurrency = function() {

        var e = em.addNew();

        e.addComponent(currencyComponent(am.getSprite('currency')));
        return e;
    };
    var createRadar = function() {

        var e = em.addNew();
        //var sc = sprite_constructor(sb);
        //, 0.9, 0.74
        e.addComponent(radarComponent(am.getSprite('radar')));
        return e;
    };

    var createMotherShip = function(target) {

        var e = em.addNew('mothership');

        e.addComponent(shieldComponent(3, am.getSprite('shield'), am.getMesh('shieldbubble'), 20));

        e.addComponent(satelliteComponent(am.getMesh('satellite')));

        var mesh = am.getMesh('mothership');

        var m = meshComponent();
        m.setMesh(mesh);
        e.addComponent(m);

        var rmc = railsMovementComponent();
        rmc.setRouteEndXpos(target.components.RenderableComponent.getXPos());
        rmc.setRouteEndZpos(target.components.RenderableComponent.getZPos());
        rmc.setRouteDone(false);
        rmc.setSpeed(15);

        e.addComponent(rmc);

        var rc = renderableComponent();
        rc.setXPos(0);
        rc.setZPos(0);
        rc.setYPos(0);
        e.addComponent(rc);

        e.addComponent(scoreComponent(am.getSprite('currency')));
        var tc = textComponent();
        tc.setPosition(0.03, 0.01);
        tc.setTextBuffer(sb.getGL().createBuffer());
        e.addComponent(tc);

        e.addComponent(healthComponent(4, am.getSprite('hp')));

        e.addComponent(controllableComponent());

        e.addComponent(visibilityComponent());

        var points = circleXY(0, 0, 0, 300, 200);
        var buffer = sb.getGL().createBuffer();
        //var bd = sb.getGL().bufferData(gl.ARRAY_BUFFER, new Float32Array(points), sb.getGL().STATIC_DRAW);

        sb.getGL().bindBuffer(sb.getGL().ARRAY_BUFFER, buffer);
        sb.getGL().bufferData(sb.getGL().ARRAY_BUFFER, new Float32Array(points), sb.getGL().STATIC_DRAW);

        var jArea = jumpAreaComponent(buffer, points, 0, 0, 0, [0.23, 1.00, 0.63]);

        e.addComponent(jArea);

        e.addComponent(collisionComponent('player'));

        var exMesh = am.getMesh('exhaustcone');

        var mec = multiExhaustComponent();
        mec.addExhaust(exhaustComponent(exMesh, 2, 9));
        mec.addExhaust(exhaustComponent(exMesh, -2, 9));
        e.addComponent(mec);

        var sprite = am.getSprite('exhausttrail');

        var mtc = multiTrailComponent();
        mtc.addTrail(trailComponent(sprite, 15, 1, 5, 8));
        mtc.addTrail(trailComponent(sprite, 15, 1, -5, 8));
        e.addComponent(mtc);

        return e;
    };
    //for map
    var createBareMotherShip = function() {
        // createBareMotherShip() {

        var e = em.addNew('baremothership');
        var m = am.getMesh('mothership');
        e.addComponent(meshComponent(m));

        e.addComponent(renderableComponent());

        e.addComponent(movableComponent());
        e.addComponent(hexItemComponent('player'));

        return e;
    };
    var createAsteroidField = function() {

        var e = em.addNew();
        e.addComponent(asteroidComponent());
        return e;

    };

    var createFuel = function(rand) {

        var e = em.addNew('fuel');
        var m = am.getMesh('fuel');
        var me = meshComponent();
        me.setMesh(m);
        e.addComponent(me);

        var rc = renderableComponent();
        rc.setScale(50);
        rc.setXPos(randomRangedInt());
        rc.setZPos(randomRangedInt());
        e.addComponent(rc);

        e.addComponent(rotationComponent(10, 10, 10));
        e.addComponent(collisionComponent('enemy'));
        e.addComponent(healthComponent(5));

        return e;

    };
    var createMap = function() {
        // createMap() {
        var e = em.addNew('map');
        //var t = new Texture('maptiles');
        e.addComponent(mapComponent());
        //var hg = new Hexagon(5);
        //e.addComponent(new PrimitiveComponent(hg.area,[0.75,0.75,0]));

        var rc = renderableComponent();

        rc.setXPos(0);
        rc.setZPos(0);
        e.addComponent(rc);

        return e;

    };
    var createText = function() {
        //createText(level) {
        var e = em.addNew();
        var t = textComponent();
        t.setTexts('first');
        t.setPosition(0.5, 0.1);
        t.setTextBuffer(sb.getGL().createBuffer());
        e.addComponent(t);
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
        e.addComponent(planeComponent(new Plane(sb, 10)));
        return e;

    };

    return {
        start, init,
        createText, createMap, createFuel,
        createAsteroidField, createBareMotherShip,
        createMotherShip, createRadar, createMirrorEnemy, createMine, createLayout,
        createCurrency, createStars, createIntro, createDestroyer,
        createShip, createPlane

    };

}