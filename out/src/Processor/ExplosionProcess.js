var ExplosionProcess = function ExplosionProcess() {
  "use strict";
  pub.subscribe("collision", this.explode);
};
($traceurRuntime.createClass)(ExplosionProcess, {
  explode: function() {
    "use strict";
    console.log('w');
  },
  update: function() {
    "use strict";
  },
  draw: function() {
    "use strict";
  }
}, {});
