var EntityFactory = function EntityFactory() {
  "use strict";
};
($traceurRuntime.createClass)(EntityFactory, {
  createShip: function() {
    "use strict";
    var e = em.addNew('ship');
    var mesh = mm.getOrAddMesh('ship');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new MomentumMovable(30, 15, 0, 0));
    e.addComponent(new Renderable(1, 0, 1, 1, 0, -90, 0));
    e.addComponent(new Controllable());
    e.addComponent(new PhotonTorpedoComponent(new Sprite("bigbullet", 0, 0)));
    e.addComponent(new GunComponent());
    var t = new Texture('exhausttrail', false, true);
    e.addComponent(new ExhaustComponent(t.loadedTexture));
    return e;
  },
  createStars: function() {
    "use strict";
    var e = em.addNew('stars');
    e.addComponent(new StarComponent());
    return e;
  },
  createEnemy: function() {
    "use strict";
    var e = em.addNew('enemymirror');
    var mesh = mm.getOrAddMesh('enemy');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new EnemyComponent());
    e.addComponent(new Renderable(helpers.getRandomInt(-800, 700), 0, helpers.getRandomInt(-800, 700), 1));
    return e;
  },
  createCurrency: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new CurrencyComponent());
    return e;
  },
  createRadar: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new RadarComponent());
    return e;
  },
  createMotherShip: function() {
    "use strict";
    var e = em.addNew('mothership');
    var mesh = mm.getOrAddMesh('mothership');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new Movable(30));
    e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos, 2));
    e.addComponent(new Controllable());
    e.addComponent(new Drivable());
    e.addComponent(new CameraController());
    e.addComponent(new JumpArea());
    e.addComponent(new HealthComponent(10));
    e.addComponent(new ShieldComponent(2, new Sprite("shield", 0.9, 0.74)));
    var t = new Texture('exhausttrailm', false, true);
    e.addComponent(new ExhaustComponent(t.loadedTexture));
    return e;
  },
  createTerrain: function() {
    "use strict";
    var e = em.addNew('terrain');
    var mesh = mm.getOrAddMesh('terrain');
    e.addComponent(new MeshComponent(mesh));
    e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));
    return e;
  },
  createAsteroidField: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new AsteroidComponent());
    return e;
  },
  createBackground: function() {
    "use strict";
    var e = em.addNew();
    var mesh = new Mesh("background");
    e.addComponent(new Renderable(mesh.xPos, mesh.yPos, mesh.zPos));
    e.addComponent(new MeshComponent(mesh));
    return e;
  },
  createFuel: function(rand) {
    "use strict";
    var e = em.addNew();
    var mesh = mm.getOrAddMesh('fuel');
    e.addComponent(new MeshComponent(mesh));
    if (rand) {
      e.addComponent(new Renderable(helpers.getRandomInt(-200, 200), 0, helpers.getRandomInt(200, -200), 50));
    } else {
      e.addComponent(new Renderable(110, 0, 50, 50));
    }
    e.addComponent(new ConstantRotation(10, 10, 10));
    return e;
  },
  createPlane: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new PlaneComponent(new Plane(80)));
    return e;
  }
}, {});
