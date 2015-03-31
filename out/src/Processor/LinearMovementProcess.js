var LinearMovementProcess = function LinearMovementProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $LinearMovementProcess.prototype, arguments);
};
var $LinearMovementProcess = LinearMovementProcess;
($traceurRuntime.createClass)(LinearMovementProcess, {
  isClose: function(currentCoord, newCoord) {
    "use strict";
    if (currentCoord < newCoord + 0.1 && currentCoord > newCoord - 0.1) {
      return true;
    }
    return false;
  },
  update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.Selectable && le.components.Renderable && le.components.Movable) {
        var se = le.components.Selectable;
        var re = le.components.Renderable;
        var me = le.components.Movable;
        if (me && se.selected && camera.clickPosition) {
          me.newXpos = camera.clickPosition[0];
          me.newYpos = camera.clickPosition[1];
          me.newZpos = camera.clickPosition[2];
        }
        if ((helpers.isNumeric(le.components.Movable.newXpos) && helpers.isNumeric(le.components.Movable.newZpos)) && (!this.isClose(re.xPos, le.components.Movable.newXpos) || !this.isClose(re.zPos, le.components.Movable.newZpos))) {
          var dirX = me.newXpos - re.xPos;
          var dirZ = me.newZpos - re.zPos;
          var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
          var angR = Math.atan2(dirX, dirZ);
          var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);
          dirX /= hyp;
          dirZ /= hyp;
          re.xPos += dirX * me.speed * (deltatime / 1000);
          re.zPos += dirZ * me.speed * (deltatime / 1000);
          re.yPos = 0;
          re.angleY = deg;
        }
      }
    }
  },
  checkCollision: function() {
    "use strict";
  }
}, {}, Processor);
