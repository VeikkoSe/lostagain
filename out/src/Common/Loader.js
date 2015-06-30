function loader_costructor(sb) {
  var em = sb.getEntityManager();
  var am = sb.getAssetManager();
  var loadingLevelName = '';
  var t = texture_constructor(sb);
  var sprite_loader = sprite_constructor(sb);
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
        createIntro();
        createShip();
        break;
      case ('gamestate'):
        camera.setDistance(350);
        createFuel(false);
        createStars();
        var ship = createShip();
        var mothership = createMotherShip();
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
        createLayout(mothership, ship);
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
    e.addComponent(RenderableComponent({
      xPos: 10,
      yPos: 0,
      zPos: 20
    }));
    e.addComponent(MeshComponent({mesh: mesh}));
    e.addComponent(RotationComponent({}));
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
    e.addComponent(RenderableComponent({
      scale: 0.05,
      xPos: 10,
      yPos: 10,
      zPos: 10
    }));
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
    var xp = randomCloseInt();
    var zp = randomCloseInt();
    e.addComponent(RenderableComponent({
      xPos: xp,
      yPos: 0,
      zPos: zp
    }));
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
    e.addComponent(RenderableComponent({
      xPos: 10,
      yPos: 0,
      zPos: 20
    }));
    e.addComponent(ControllableComponent());
    e.addComponent(MomentumComponent({}));
    e.addComponent(CameraTargetComponent());
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
    e.addComponent(RenderableComponent({}));
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
    e.addComponent(RenderableComponent({}));
    e.addComponent(MeshComponent(m));
    return e;
  };
  var createFuel = function(rand) {
    var e = em.addNew();
    var m = am.getMesh('fuel');
    e.addComponent(MeshComponent({mesh: m}));
    if (rand) {
      e.addComponent(RenderableComponent({}));
    } else {
      e.addComponent(RenderableComponent({
        xPos: 10,
        yPos: 10,
        zPos: 10
      }));
    }
    e.addComponent(RotationComponent({
      x: 10,
      y: 10,
      z: 10
    }));
    e.addComponent(CollisionComponent('enemy'));
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
    subscribe: subscribe
  });
}
