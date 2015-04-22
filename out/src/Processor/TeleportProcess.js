var TeleportProcess = function TeleportProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $TeleportProcess.prototype, arguments);
};
var $TeleportProcess = TeleportProcess;
($traceurRuntime.createClass)(TeleportProcess, {
  update: function(deltatime) {
    "use strict";
    var ms = em.getEntityByName('mothership');
    var ship = em.getEntityByName('ship');
    if (ms && ship) {
      if (!this.isInCircle(ms.components.Renderable.xPos, ms.components.Renderable.zPos, ms.components.JumpArea.radius, ship.components.Renderable.xPos, ship.components.Renderable.zPos)) {
        var dirX = ms.components.Renderable.xPos - ship.components.Renderable.xPos;
        var dirZ = ms.components.Renderable.zPos - ship.components.Renderable.zPos;
        var origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
        var dirXnormal = dirX / origHyp;
        var dirZnormal = dirZ / origHyp;
        dirX = (ms.components.JumpArea.radius - 1) * dirXnormal;
        dirZ = (ms.components.JumpArea.radius - 1) * dirZnormal;
        var posx = dirX + ms.components.Renderable.xPos;
        var posZ = dirZ + ms.components.Renderable.zPos;
        ship.components.Renderable.xPos = posx;
        ship.components.Renderable.zPos = posZ;
        ship.components.ExhaustComponent.points = [];
        ship.components.ExhaustComponent.flow = [];
      }
    }
  },
  isInCircle: function(centerX, centerY, radius, x, y) {
    "use strict";
    return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
  },
  isInRectangle: function(centerX, centerY, radius, x, y) {
    "use strict";
    return x >= centerX - radius && x <= centerX + radius && y >= centerY - radius && y <= centerY + radius;
  },
  getOppositeAngle: function(angle) {
    "use strict";
    var ret = false;
    if (angle > 180)
      ret = angle - 180;
    else if (angle < 180)
      ret = angle + 180;
    return ret;
  }
}, {}, Processor);
