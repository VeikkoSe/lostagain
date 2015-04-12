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
        camera.setDistance(50);
        var ship = ef.createShip();
        var radar = ef.createRadar();
        var currency = ef.createCurrency();
        var rt = new Layout(0.5, 0.5);
        rt.addChildren(new Layout(5, 5, new Sprite("radar")), radar.components.RadarComponent);
        rt.addChildren(new Layout(5, 20, new Sprite("currency")), currency.components.CurrencyComponent);
        lm.push(rt);
        var lb = new Layout(false, 0, 0);
        lb.addChildren(new Layout(5, 5, new Sprite("hp"), ship.components.HealtComponent));
        lb.addChildren(new Layout(5, 20, new Sprite("shield"), ship.components.ShieldComponent));
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
