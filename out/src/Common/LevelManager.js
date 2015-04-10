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
    switch (name) {
      case ('second'):
        camera.setDistance(400);
        ef.createStars();
        ef.createFuel(false);
        ef.createEnemy();
        ef.createMotherShip();
        ef.createShip();
        break;
      case ('first'):
        camera.setDistance(50);
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
