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
    this.loading = true;
    this.loadAllAssets(name);
  },
  loadAllAssets: function(name) {
    "use strict";
    this.nextState = false;
    em.clearAll();
    this.loading = true;
    if (name == 1) {
      ef.createFuel();
      ef.createMotherShip();
      ef.createShip();
      ef.createTerrain();
      this.nextState = 'gamestate';
      this.maxLoad = this.loadTotal;
    }
    if (name == 2) {
      ef.createFuel();
      this.nextState = 'gamestate';
      this.maxLoad = this.loadTotal;
    }
    this.loading = false;
  },
  destroyAllCurrentAssets: function() {
    "use strict";
  }
}, {});
