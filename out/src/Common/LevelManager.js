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
        var ship = ef.createShip();
        break;
      case ('second'):
        ef.createStars();
        camera.setDistance(200);
        var ship = ef.createShip();
        var radar = ef.createRadar();
        var currency = ef.createCurrency();
        var rt = new Layout(0.00, 0.00);
        rt.addChildren(new Layout(5, 5, new Texture("hp"), radar.components.RadarComponent, 8));
        rt.addChildren(new Layout(5, 13, new Texture("shield"), currency.components.CurrencyComponent, 8));
        lm.push(rt);
        var lb = new Layout(1, 1);
        lb.addChildren(new Layout(5, 5, new Texture("radar"), radar.components.RadarComponent, 55));
        lm.push(lb);
        var lh = new Layout(0, 1);
        lh.addChildren(new Layout(5, 5, new Texture("currency"), ship.components.HealtComponent, 8));
        lm.push(lh);
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
