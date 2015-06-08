class EntityFactory {
    constructor() {
    }

    createShip() {

        var e = em.addNew('ship');
        var mesh = mm.getOrAddMesh('ship');
        e.addComponent(new Visibility(false));
        e.addComponent(new MeshComponent(mesh));


        e.addComponent(new MomentumMovable(50, 300, 15, 0, 0));
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


        e.addComponent(new Controllable());

        e.addComponent(new HealthComponent(5, new Sprite("hp", -0.9, -0.8)));
        e.addComponent(new ShieldComponent(10, new Sprite("shield", -0.9, -0.74)));
        e.addComponent(new PhotonTorpedoComponent(new Sprite("bigbullet", 0, 0)));
        e.addComponent(new GunComponent());
        e.addComponent(new CollisionComponent('player'));


        var t = new Texture('exhausttrail', false, true);

        var mec = new MultiExhaustComponent();
        mec.addExhaust(new ExhaustComponent(t.loadedTexture, 30, 1, 3.5));
        mec.addExhaust(new ExhaustComponent(t.loadedTexture, 30, 1, -3.5));
        e.addComponent(mec);

        return e;

    }

    createStars() {

        var e = em.addNew('stars');

        e.addComponent(new StarComponent());
        return e;
    }

    randomRangedInt() {
        var rnd = helpers.getRandomInt(500, -500);
        if (rnd > 100 ||
            rnd < -100) {
            return rnd;
        }
        else
            return this.randomRangedInt();
    }

    createEnemy() {

        var e = em.addNew('enemymirror');
        var mesh = mm.getOrAddMesh('enemy');
        e.addComponent(new MeshComponent(mesh));
        e.addComponent(new EnemyComponent());

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));

        var xp = this.randomRangedInt();
        var zp = this.randomRangedInt();

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

    }

    createCurrency() {
        var e = em.addNew();
        e.addComponent(new CurrencyComponent(new Sprite("currency", 0.9, 0.74)));
        return e;
    }

    createRadar() {
        var e = em.addNew();
        e.addComponent(new RadarComponent(new Sprite("radar", 0.9, 0.74)));
        return e;
    }

    createMotherShip() {


        var e = em.addNew('mothership');
        var mesh = mm.getOrAddMesh('mothership');
        e.addComponent(new MeshComponent(mesh));


        e.addComponent(new Movable(30));
        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos, 2));
        e.addComponent(new Controllable());
        e.addComponent(new Visibility(false));
        e.addComponent(new MomentumMovable(15, 100));

        //e.addComponent(new Drivable());
        //can be only one. Camera follows this entity
        e.addComponent(new CameraController());

        e.addComponent(new JumpArea(mesh.xPos, mesh.yPos, mesh.zPos, [1, 0, 0]));


        e.addComponent(new HealthComponent(10, new Sprite("hp", -0.9, -0.8)));
        e.addComponent(new ShieldComponent(2, new Sprite("shield", -0.9, -0.74)));


        var t = new Texture('exhausttrailm', false, true);


        var mec = new MultiExhaustComponent();
        mec.addExhaust(new ExhaustComponent(t.loadedTexture, 5, 4, 12, 18));
        mec.addExhaust(new ExhaustComponent(t.loadedTexture, 5, 4, -12, 18));
        e.addComponent(mec);

        e.addComponent(new CollisionComponent('player'));
        return e;
    }


    createTerrain() {

        var e = em.addNew('terrain');
        var mesh = mm.getOrAddMesh('terrain');
        e.addComponent(new MeshComponent(mesh));
        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));

        return e;

    }

    createBareMotherShip() {

        var e = em.addNew('baremothership');
        var mesh = mm.getOrAddMesh('mothership');
        e.addComponent(new MeshComponent(mesh));

        e.addComponent(new Renderable(0, 0.5, 0, 0.05));
        // e.addComponent(new Controllable());
        //e.addComponent(new MomentumMovable(2, 100));
        e.addComponent(new Movable());
        e.addComponent(new HexItem('player'));
        e.addComponent(new GasComponent());


        return e;
    }

    createAsteroidField() {

        var e = em.addNew();
        e.addComponent(new AsteroidComponent());
        return e;

    }


    createBackground() {

        var e = em.addNew();
        var mesh = new Mesh("background");


        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));

        e.addComponent(new MeshComponent(mesh));
        return e;

    }


    createFuel(rand) {


        var e = em.addNew();
        var mesh = mm.getOrAddMesh('fuel');
        e.addComponent(new MeshComponent(mesh));
        e.addComponent(new JumpHold());

        //e.addComponent(new Movable(12));
        if (rand) {
            e.addComponent(new Renderable(helpers.getRandomInt(-200, 200), 0, helpers.getRandomInt(200, -200), 50));
        }
        else {
            e.addComponent(new Renderable(110, 0, 50, 50));
        }
        e.addComponent(new ConstantRotation(10, 10, 10));
        e.addComponent(new CollisionComponent('enemy'));
        e.addComponent(new HealthComponent(20));

        return e;

    }

    createPlane() {
        var e = em.addNew();
        e.addComponent(new PlaneComponent(new Plane(80)));
        return e;

    }

    createMap() {
        var e = em.addNew('map');
        //var t = new Texture('maptiles');
        e.addComponent(new MapComponent());
        //var hg = new Hexagon(5);
        //e.addComponent(new PrimitiveComponent(hg.area,[0.75,0.75,0]));

        e.addComponent(new Renderable(0,//x
            0,//y
            0//z
        )); //zWidth


        return e;

    }

    createText(level) {
        var e = em.addNew();
        e.addComponent(new TextComponent(level));
    }


}