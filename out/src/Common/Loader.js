function loader_costructor(sb) {
  var em = sb.getEntityManager();
  var am = sb.getAssetManager();
  var loadingLevelName = '';
  var loading = false;
  var loadTotal = 0;
  var maxLoad = 0;
  var camera = sb.getCamera();
  var am = asset_manager_constructor(sb);
  var getLoadingLevelName = function() {
    return loadingLevelName;
  };
  var subscribe = function() {
    am.subscribe();
    sb.subscribe("loadassets", function(name, wantedState) {
      loadAllAssets(wantedState);
    });
    sb.subscribe("allassetsloaded", function(name, dummy) {
      level = getLoadingLevelName();
      sb.publish("movetoloadstate", level);
    });
  };
  var init = function() {};
  var loadAllAssets = function(name) {
    loadingLevelName = name;
    loading = true;
    switch (name) {
      case ('introstate'):
        console.log(name);
        createIntro();
        createShip();
        break;
      case ('gamestate'):
        camera.setDistance(350);
        console.log(name);
        createShip();
        break;
      case ('second'):
        createStars();
        createMotherShip();
        break;
      case ('third'):
        createAsteroidField();
        createStars();
        createMotherShip();
        createShip();
        break;
    }
    maxLoad = loadTotal;
    loading = false;
  };
  var createShip = function() {
    em.clearAll();
    var e = em.addNew('ship');
    var mesh = am.getMesh('ship');
    e.addComponent(Renderable({}));
    e.addComponent(MeshComponent({mesh: mesh}));
    e.addComponent(ConstantRotation({
      x: 10,
      y: 10,
      z: 10
    }));
    e.addComponent(MomentumMovable({}));
    return e;
  };
  var createIntro = function() {
    var e = em.addNew();
    var m = am.getMesh('start');
    e.addComponent(Renderable({scale: 0.05}));
    e.addComponent(MeshComponent({mesh: m}));
    return e;
  };
  var createStars = function() {
    var e = em.addNew('stars');
    e.addComponent(new StarComponent());
    return e;
  };
  var randomRangedInt = function() {
    var rnd = getRandomInt(500, -500);
    if (rnd > 100 || rnd < -100) {
      return rnd;
    } else
      return this.randomRangedInt();
  };
  var createEnemy = function() {
    var e = em.addNew('enemymirror');
    e.addComponent(new EnemyComponent());
    var xp = randomRangedInt();
    var zp = randomRangedInt();
    e.addComponent(new Renderable(xp, 0, zp, 1, 1, 0, 0, 10, 10, 10));
    e.addComponent(new CollisionComponent('enemy'));
    e.addComponent(new HealthComponent(1));
    return e;
  };
  var createCurrency = function() {
    var e = em.addNew();
    e.addComponent(new CurrencyComponent(new Sprite("currency", 0.9, 0.74)));
    return e;
  };
  var createRadar = function() {
    var e = em.addNew();
    e.addComponent(new RadarComponent(new Sprite("radar", 0.9, 0.74)));
    return e;
  };
  var createMotherShip = function() {
    var e = em.addNew('mothership');
    var m = mm.getOrAddMesh('mothership');
    e.addComponent(new MeshComponent(m));
    e.addComponent(new Movable(30));
    e.addComponent(new Renderable(m.xPos, m.yPos, m.zPos, 2));
    e.addComponent(new Controllable());
    e.addComponent(new Visibility(false));
    e.addComponent(new MomentumMovable(15, 100));
    e.addComponent(new CameraController());
    e.addComponent(new JumpArea(m.xPos, m.yPos, m.zPos, [0.23, 1.00, 0.63]));
    e.addComponent(new HealthComponent(10, new Sprite("hp", -0.9, -0.8)));
    e.addComponent(new ShieldComponent(2, new Sprite("shield", -0.9, -0.74)));
    var t = new Texture('exhausttrailm', false, true);
    var mec = new MultiExhaustComponent();
    mec.addExhaust(new ExhaustComponent(t.loadedTexture, 5, 4, 12, 18));
    mec.addExhaust(new ExhaustComponent(t.loadedTexture, 5, 4, -12, 18));
    e.addComponent(mec);
    e.addComponent(new CollisionComponent('player'));
    return e;
  };
  var createTerrain = function() {
    var e = em.addNew('terrain');
    var m = mm.getOrAddMesh('terrain');
    e.addComponent(new MeshComponent(m));
    e.addComponent(new Renderable(m.xPos, m.yPos, m.zPos));
    return e;
  };
  var createBareMotherShip = function() {
    var e = em.addNew('baremothership');
    var m = mm.getOrAddMesh('mothership');
    e.addComponent(new MeshComponent(m));
    e.addComponent(new Renderable(0, 0.5, 0, 0.05));
    e.addComponent(new Movable());
    e.addComponent(new HexItem('player'));
    e.addComponent(new GasComponent());
    return e;
  };
  var createAsteroidField = function() {
    var e = em.addNew();
    e.addComponent(new AsteroidComponent());
    return e;
  };
  var createBackground = function() {
    var e = em.addNew();
    var m = new Mesh("background");
    e.addComponent(new Renderable(m.xPos, m.yPos, m.zPos));
    e.addComponent(new MeshComponent(m));
    return e;
  };
  var createFuel = function() {
    var e = em.addNew();
    var m = mm.getOrAddMesh('fuel');
    e.addComponent(new MeshComponent(m));
    e.addComponent(new JumpHold());
    if (rand) {
      e.addComponent(new Renderable(getRandomInt(-200, 200), 0, getRandomInt(200, -200), 50));
    } else {
      e.addComponent(new Renderable(110, 0, 50, 50));
    }
    e.addComponent(new ConstantRotation(10, 10, 10));
    e.addComponent(new CollisionComponent('enemy'));
    e.addComponent(new HealthComponent(20));
    return e;
  };
  var createPlane = function() {
    var e = em.addNew();
    e.addComponent(new PlaneComponent(new Plane(80)));
    return e;
  };
  var createMap = function() {
    var e = em.addNew('map');
    e.addComponent(new MapComponent());
    e.addComponent(new Renderable(0, 0, 0));
    return e;
  };
  var createText = function() {
    var e = em.addNew();
    e.addComponent(new TextComponent(level));
  };
  return Object.freeze({
    loadAllAssets: loadAllAssets,
    init: init,
    subscribe: subscribe
  });
}
