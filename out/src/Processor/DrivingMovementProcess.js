var DrivingMovementProcess = function DrivingMovementProcess() {
  "use strict";
};
($traceurRuntime.createClass)(DrivingMovementProcess, {update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.Drivable) {
        var mm = le.components.Drivable;
        var re = le.components.Renderable;
        var dirVectorX = Math.cos(helpers.degToRad(re.angleY));
        var dirVectorZ = Math.sin(helpers.degToRad(re.angleY));
        if (mm.addSpeed) {
          mm.velocityX += mm.acceleration * dirVectorX * (deltatime / 1000);
          mm.velocityZ += mm.acceleration * dirVectorZ * (deltatime / 1000);
        }
        if (mm.reduceSpeed) {
          mm.velocityX -= mm.acceleration * dirVectorX * (deltatime / 1000);
          mm.velocityZ -= mm.acceleration * dirVectorZ * (deltatime / 1000);
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
