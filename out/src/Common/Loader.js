function loader_costructor() {
  var sb,
      em,
      am,
      loadingLevelName,
      t,
      sprite_loader,
      loading,
      loadTotal,
      maxLoad,
      camera;
  var getLoadingLevelName = function() {
    return loadingLevelName;
  };
  var subscribe = function() {};
  var init = function(sandbox) {
    sb = sandbox;
    loadingLevelName = '';
    loading = false;
    loadTotal = 0;
    maxLoad = 0;
  };
  var start = function() {
    camera = sb.getCamera();
    sb.subscribe("loadassets", function(name, wantedState) {
      loadAllAssets(wantedState);
    });
    sb.subscribe("allassetsloaded", function(name, dummy) {
      level = getLoadingLevelName();
      sb.publish("movetoloadstate", level);
    });
    t = texture_constructor(sb);
    sprite_loader = sprite_constructor(sb);
    em = sb.getEntityManager();
    am = sb.getAssetManager();
  };
  var loadAllAssets = function(name) {
    loadingLevelName = name;
    loading = true;
    switch (name) {
      case ('introstate'):
        createIntro();
        createShip();
        break;
      case ('gamestate'):
        camera.setDistance(350);
        createFuel(false);
        createStars();
        var mothership = createMotherShip();
        var ship = createShip();
        {
          try {
            throw undefined;
          } catch ($i) {
            {
              $i = 0;
              for (; $i < 10; $i++) {
                try {
                  throw undefined;
                } catch (i) {
                  {
                    i = $i;
                    try {
                      createEnemy();
                    } finally {
                      $i = i;
                    }
                  }
                }
              }
            }
          }
        }
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
    var e = em.addNew('ship');
    var mesh = am.getMesh('ship');
    var rc = RenderableComponent();
    rc.setXPos(10);
    rc.setZPos(20);
    e.addComponent(rc);
    e.addComponent(MeshComponent({mesh: mesh}));
    e.addComponent(MomentumComponent({}));
    t.load({name: 'hp'});
    var texture = t.getLoadedTexture();
    e.addComponent(ControllableComponent());
    e.addComponent(HealthComponent(5, sprite_loader.load("hp")));
    e.addComponent(ShieldComponent(10, sprite_loader.load("shield")));
    e.addComponent(PhotonTorpedoComponent(sprite_loader.load("bigbullet")));
    e.addComponent(GunComponent());
    e.addComponent(CollisionComponent('player'));
    t.load({name: 'exhausttrail'});
    var texture = t.getLoadedTexture();
    var mec = MultiExhaustComponent();
    mec.addExhaust(ExhaustComponent(texture, 30, 1, 3.5));
    mec.addExhaust(ExhaustComponent(texture, 30, 1, -3.5));
    e.addComponent(mec);
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
  var randomRangedInt = function() {
    var rnd = getRandomInt(500, -500);
    if (rnd > 100 || rnd < -100) {
      return rnd;
    } else
      return randomRangedInt();
  };
  var randomCloseInt = function() {
    var rnd = getRandomInt(30, -30);
    return rnd;
  };
  var createLayout = function(mothership, ship) {
    var radar = arguments[2] !== (void 0) ? arguments[2] : false;
    var currency = arguments[3] !== (void 0) ? arguments[3] : false;
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
      try {
        throw undefined;
      } catch (lb) {
        {
          lb = layout_constructor(1, 1);
          lb.addChildren(layout_constructor(5, 5, radar.components.RadarComponent, 55));
          lm.push(lb);
        }
      }
    }
    if (currency) {
      try {
        throw undefined;
      } catch (lh) {
        {
          lh = layout_constructor(0, 1);
          lh.addChildren(layout_constructor(5, 5, currency.components.CurrencyComponent, 8));
          lm.push(lh);
        }
      }
    }
    e.addComponent(LayoutComponent(lm));
  };
  var createEnemy = function() {
    var e = em.addNew('enemymirror');
    var mesh = am.getMesh('enemy');
    e.addComponent(MeshComponent({mesh: mesh}));
    e.addComponent(EnemyComponent());
    var rc = RenderableComponent();
    rc.setXPos(randomCloseInt());
    rc.setZPos(randomCloseInt());
    e.addComponent(rc);
    return e;
  };
  var createCurrency = function() {
    var e = em.addNew();
    var sc = sprite_constructor(sb);
    e.addComponent(CurrencyComponent(sprite_loader.load("currency")));
    return e;
  };
  var createRadar = function() {
    var e = em.addNew();
    e.addComponent(new RadarComponent(sprite_loader.load("radar")));
    return e;
  };
  var createMotherShip = function() {
    var e = em.addNew('mothership');
    var mesh = am.getMesh('mothership');
    e.addComponent(MeshComponent({mesh: mesh}));
    e.addComponent(MovableComponent(30));
    e.addComponent(RenderableComponent());
    e.addComponent(ControllableComponent());
    e.addComponent(MomentumComponent({}));
    e.addComponent(CameraTargetComponent());
    var points = circleXY({
      x: 0,
      y: 0,
      z: 0
    }, 300, 200);
    var buffer = sb.getGL().createBuffer();
    sb.getGL().bindBuffer(sb.getGL().ARRAY_BUFFER, buffer);
    sb.getGL().bufferData(sb.getGL().ARRAY_BUFFER, new Float32Array(points), sb.getGL().STATIC_DRAW);
    var jArea = JumpAreaComponent(buffer, points, 0, 0, 0, [0.23, 1.00, 0.63]);
    e.addComponent(jArea);
    e.addComponent(HealthComponent(10, sprite_loader.load("hp")));
    e.addComponent(ShieldComponent(2, sprite_loader.load("shield")));
    t.load({name: 'exhaust'});
    var texture = t.getLoadedTexture();
    var mec = new MultiExhaustComponent();
    mec.addExhaust(ExhaustComponent(texture, 5, 4, 12, 18));
    mec.addExhaust(ExhaustComponent(texture, 5, 4, -12, 18));
    e.addComponent(mec);
    e.addComponent(new CollisionComponent('player'));
    return e;
  };
  var createTerrain = function() {
    var e = em.addNew('terrain');
    var m = am.getMesh('terrain');
    e.addComponent(MeshComponent(m));
    e.addComponent(Renderable(m.xPos, m.yPos, m.zPos));
    return e;
  };
  var createBareMotherShip = function() {
    var e = em.addNew('baremothership');
    var m = am.getMesh('mothership');
    e.addComponent(new MeshComponent(m));
    e.addComponent(RenderableComponent());
    e.addComponent(MovableComponent());
    e.addComponent(HexItemComponent('player'));
    e.addComponent(GasComponent());
    return e;
  };
  var createAsteroidField = function() {
    var e = em.addNew();
    e.addComponent(AsteroidComponent());
    return e;
  };
  var createBackground = function() {
    var e = em.addNew();
    var m = Mesh("background");
    e.addComponent(RenderableComponent());
    e.addComponent(MeshComponent(m));
    return e;
  };
  var createFuel = function(rand) {
    var e2 = em.addNew();
    var m = am.getMesh('satellite');
    e2.addComponent(RenderableComponent());
    e2.addComponent(MeshComponent({mesh: m}));
    var e = em.addNew();
    var m = am.getMesh('fuel');
    e.addComponent(MeshComponent({mesh: m}));
    var rc = RenderableComponent();
    rc.setScale(50);
    rc.setXPos(100);
    rc.setZPos(200);
    e.addComponent(rc);
    e.addComponent(HealthComponent(5));
    return e;
  };
  var createPlane = function() {
    var e = em.addNew();
    return e;
  };
  var createMap = function() {
    var e = em.addNew('map');
    e.addComponent(MapComponent());
    e.addComponent(new Renderable(0, 0, 0));
    return e;
  };
  var createText = function() {
    var e = em.addNew();
    e.addComponent(TextComponent('first'));
  };
  return Object.freeze({
    loadAllAssets: loadAllAssets,
    init: init,
    subscribe: subscribe,
    start: start
  });
}
