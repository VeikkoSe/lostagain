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
      case ('first'):
        ef.createStars();
        ef.createFuel();
        ef.createEnemy();
        ef.createMotherShip();
        ef.createShip();
        ef.createTerrain();
        this.maxLoad = this.loadTotal;
      case ('second'):
        ef.createFuel();
        this.nextState = 'gamestate';
        this.maxLoad = this.loadTotal;
        break;
    }
    this.loading = false;
  },
  destroyAllCurrentAssets: function() {
    "use strict";
  }
}, {});
