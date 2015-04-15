var MomentumMovementProcess = function MomentumMovementProcess() {
  "use strict";
};
($traceurRuntime.createClass)(MomentumMovementProcess, {update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.MomentumMovable && le.components.Renderable) {
        var mm = le.components.MomentumMovable;
        var re = le.components.Renderable;
        if (mm.accelerationOn) {
          var dirVectorX = Math.cos(helpers.degToRad(re.angleY));
          var dirVectorZ = Math.sin(helpers.degToRad(re.angleY));
          var tx = mm.velocityX;
          var tz = mm.velocityZ;
          tx += mm.acceleration * dirVectorX * (deltatime / 1000);
          tz += mm.acceleration * dirVectorZ * (deltatime / 1000);
          var posX = (tx < 0) ? tx * -1 : tx;
          var posZ = (tz < 0) ? tz * -1 : tz;
          if (posX < mm.speed && posZ < mm.speed) {
            mm.velocityX = tx;
            mm.velocityZ = tz;
          }
        }
        if (mm.rotateRight) {
          if (re.angleY >= 360)
            re.angleY = 0;
          if (re.angleY < 0)
            re.angleY = 360;
          re.angleY -= mm.turnSpeed * (deltatime / 1000);
        }
        if (mm.rotateLeft) {
          if (re.angleY >= 360)
            re.angleY = 0;
          if (re.angleY < 0)
            re.angleY = 360;
          re.angleY += mm.turnSpeed * (deltatime / 1000);
        }
        re.xPos += mm.velocityX * (deltatime / 1000);
        re.zPos -= mm.velocityZ * (deltatime / 1000);
      }
    }
  }}, {}, Processor);
