var EnemyProcess = function EnemyProcess() {
  "use strict";
  this.routeDone = false;
};
($traceurRuntime.createClass)(EnemyProcess, {
  update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.Renderable && le.components.MeshComponent && le.components.EnemyComponent) {
        var ship = em.getEntityByName('ship');
        var re = le.components.Renderable;
        if (!this.routeDone) {
          var dirZ = ship.components.Renderable.xPos - re.xPos;
          var dirX = ship.components.Renderable.zPos - re.zPos;
          var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
          var angR = Math.atan2(dirX, dirZ);
          var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);
          dirX /= hyp;
          dirZ /= hyp;
          re.zPos += dirX * le.components.EnemyComponent.speed * (deltatime / 1000);
          re.xPos += dirZ * le.components.EnemyComponent.speed * (deltatime / 1000);
          re.angleY = deg;
        }
      }
    }
  },
  draw: function() {
    "use strict";
  }
}, {}, Processor);
