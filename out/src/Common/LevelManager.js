var LevelManager = function LevelManager() {
  "use strict";
  this.loading = false;
  this.loadTotal = 0;
  this.nextState = false;
  this.maxLoad = 0;
};
($traceurRuntime.createClass)(LevelManager, {
  loadLevel: function(name) {
    "use strict";
    game.stateEngine.loadS(name);
  },
  loadAllAssets: function(name) {
    "use strict";
    this.nextState = false;
    em.clearAll();
    this.loading = true;
    lm = [];
    switch (name) {
      case ('first'):
        camera.setDistance(200);
        ef.createStars();
        ef.createFuel(false);
        ef.createMotherShip();
        ef.createShip();
        break;
      case ('second'):
        camera.setDistance(200);
        var ship = ef.createShip();
        var radar = ef.createRadar();
        var currency = ef.createCurrency();
        var rt = new Layout(0.5, 0.5);
        rt.addChildren(new Layout(0, 0, new Texture("hp")), radar.components.RadarComponent);
        rt.addChildren(new Layout(64, 64, new Texture("shield")), currency.components.CurrencyComponent);
        lm.push(rt);
        var lb = new Layout(0.0, 0.0);
        lb.addChildren(new Layout(0, 0, new Texture("currency"), ship.components.HealtComponent));
        lb.addChildren(new Layout(64, 64, new Texture("radar"), ship.components.ShieldComponent));
        lm.push(lb);
        break;
      case ('third'):
        camera.setDistance(200);
        ef.createAsteroidField();
        ef.createStars();
        ef.createMotherShip();
        ef.createShip();
        break;
    }
    this.maxLoad = this.loadTotal;
    this.loading = false;
  },
  destroyAllCurrentAssets: function() {
    "use strict";
  }
}, {});
