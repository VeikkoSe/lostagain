var MomentumMovementProcess = function MomentumMovementProcess() {
  "use strict";
};
($traceurRuntime.createClass)(MomentumMovementProcess, {update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      var mm = le.components.MomentumMovable;
      var re = le.components.Renderable;
      if (le.components.MomentumMovable) {
        if (mm.accelerationOn) {
          var dirVectorX = Math.cos(helpers.degToRad(re.angleY));
          var dirVectorZ = Math.sin(helpers.degToRad(re.angleY));
          mm.velocityX += mm.acceleration * dirVectorX * (deltatime / 1000);
          mm.velocityZ += mm.acceleration * dirVectorZ * (deltatime / 1000);
        }
        if (mm.rotateRight) {
          if (re.angleY >= 360)
            re.angleY = 0;
          if (re.angleY < 0)
            re.angleY = 360;
          re.angleY -= 600 * (deltatime / 1000);
        }
        if (mm.rotateLeft) {
          if (re.angleY >= 360)
            re.angleY = 0;
          if (re.angleY < 0)
            re.angleY = 360;
          re.angleY += 600 * (deltatime / 1000);
        }
        re.xPos += mm.velocityX * (deltatime / 1000);
        re.zPos -= mm.velocityZ * (deltatime / 1000);
      }
    }
  }}, {}, Processor);
