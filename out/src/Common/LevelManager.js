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
    es = [];
    em.clearAll();
    this.loading = true;
    if (name == 2) {
      es.push(new SimpleRenderProcess());
      particleProgram = initParticleShaders("particle");
      simplestProgram = initSimplestShaders("simplest");
      blurVerticalProgram = initBlurShaders("blurvertical");
      blurHorizontalProgram = initBlurShaders("blurhorizontal");
      shaderProgram = initShaders("per-fragment-lighting");
      ambientProgram = initAmbientShaders('ambient');
      ef.createFuel();
      ef.createMotherShip();
      ef.createShip();
      ef.createTerrain();
      this.nextState = 'gamestate';
      this.maxLoad = this.loadTotal;
    }
    if (name == 1) {
      es.push(new SimpleRenderProcess());
      particleProgram = initParticleShaders("particle");
      simplestProgram = initSimplestShaders("simplest");
      blurVerticalProgram = initBlurShaders("blurvertical");
      blurHorizontalProgram = initBlurShaders("blurhorizontal");
      shaderProgram = initShaders("per-fragment-lighting");
      ambientProgram = initAmbientShaders('ambient');
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
