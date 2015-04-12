class EntityFactory {
    constructor() {

        //this.controllable = new Controllable();

    }

    createShip() {

        var e = em.addNew('ship');
        var mesh = mm.getOrAddMesh('ship');
        e.addComponent(new MeshComponent(mesh));

        e.addComponent(new MomentumMovable(30, 15, 0, 0));
        e.addComponent(new Renderable(1, 0, 1, 1, 0, -90, 0));
        //e.addComponent(new Selectable());
        e.addComponent(new Controllable());

        //e.addComponent(new HealthComponent(5, new Sprite("hp", -0.9, -0.8)));
        //e.addComponent(new ShieldComponent(10, new Sprite("shield", -0.9, -0.74)));
        e.addComponent(new PhotonTorpedoComponent(new Sprite("bigbullet", 0, 0)));
        e.addComponent(new GunComponent());

        var t = new Texture('exhausttrail', false, true);

        //t.repeat = true;
        e.addComponent(new ExhaustComponent(t.loadedTexture));
        return e;

    }

    createStars() {

        var e = em.addNew('stars');

        e.addComponent(new StarComponent());
        return e;
    }


    createEnemy() {

        var e = em.addNew('enemymirror');
        var mesh = mm.getOrAddMesh('enemy');
        e.addComponent(new MeshComponent(mesh));
        e.addComponent(new EnemyComponent());

        //e.addComponent(new MomentumMovable(30, 15, 0, 0));
        e.addComponent(new Renderable(helpers.getRandomInt(-800, 700), 0, helpers.getRandomInt(-800, 700), 1));
        //e.addComponent(new Selectable());
        //e.addComponent(new Controllable());

        //e.addComponent(new HealthComponent(15));
        //e.addComponent(new Shield(10, new Sprite("shield", -0.9, -0.74)));
        return e;

    }
/*
    createGUI() {
        var e = em.addNew();
        //var mesh = mm.getOrAddMesh('radar');

        var sprites = [];

        sprites.push(new Sprite("radar", 0.5, 0.5));
        sprites.push(new Sprite("currency", 0.2, 0.2));

        e.addComponent(new GuiComponent(sprites));
    }
*/
    createCurrency() {
        var e = em.addNew();
        e.addComponent(new CurrencyComponent());
        return e;
    }

    createRadar() {
        var e = em.addNew();
        e.addComponent(new RadarComponent());
        return e;
    }

    createMotherShip() {

        var e = em.addNew('mothership');
        var mesh = mm.getOrAddMesh('mothership');
        e.addComponent(new MeshComponent(mesh));

        e.addComponent(new Movable(30));
        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos, 2));
        //e.addComponent(new Selectable());
        e.addComponent(new Controllable());
        e.addComponent(new Drivable());
        //can be only one. Camera follows this entity
        e.addComponent(new CameraController());
        e.addComponent(new JumpArea());

        e.addComponent(new HealthComponent(10));
        e.addComponent(new ShieldComponent(2, new Sprite("shield", 0.9, 0.74)));


        var t = new Texture('exhausttrailm', false, true);

        //t.repeat = true;
        e.addComponent(new ExhaustComponent(t.loadedTexture));
        return e;
    }


    createTerrain() {

        var e = em.addNew('terrain');
        var mesh = mm.getOrAddMesh('terrain');
        e.addComponent(new MeshComponent(mesh));

        // e.addComponent(new Movable(30));
        e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));
        // e.addComponent(new Selectable());
        // e.addComponent(new Controllable());
        //can be only one. Camera follows this entity
        // e.addComponent(new CameraController());
        //  e.addComponent(new JumpArea());
        return e;

    }


    createAsteroidField() {

        var e = em.addNew();
        //var mesh = mm.getOrAddMesh('asteroid');
        e.addComponent(new AsteroidComponent());
        //e.addComponent(new Renderable(helpers.getRandomInt(-20), 0, helpers.getRandomInt(20), 2));
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

        //e.addComponent(new Movable(12));
        if (rand) {

            e.addComponent(new Renderable(helpers.getRandomInt(-200, 200), 0, helpers.getRandomInt(200, -200), 50));
        }
        else {
            e.addComponent(new Renderable(110, 0, 50, 50));
        }
        e.addComponent(new ConstantRotation(10, 10, 10));

        return e;

    }

    createPlane() {


        var e = em.addNew();
        e.addComponent(new PlaneComponent(new Plane(80)));
        return e;

    }


}