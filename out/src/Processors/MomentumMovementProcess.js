var MomentumMovementProcess = function MomentumMovementProcess() {
  "use strict";
};
($traceurRuntime.createClass)(MomentumMovementProcess, {
  isClose: function(currentCoord, newCoord) {
    "use strict";
    if (currentCoord <= newCoord + 0.1 && currentCoord >= newCoord - 0.1) {
      return true;
    }
    return false;
  },
  update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      var mm = le.components.MomentumMovable;
      var re = le.components.Renderable;
      if (le.components.MomentumMovable) {
        if ((helpers.isNumeric(mm.routeEndXpos) && helpers.isNumeric(mm.routeEndZpos)) && (this.isClose(re.xPos, mm.routeEndXpos) && this.isClose(re.zPos, mm.routeEndZpos))) {
          mm.routeDone = true;
        }
        if (!mm.routeDone) {
          var dirX = mm.routeEndXpos - re.xPos;
          var dirZ = mm.routeEndZpos - re.zPos;
          var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
          var angR = Math.atan2(dirX, dirZ);
          var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);
          dirX /= hyp;
          dirZ /= hyp;
          re.xPos += dirX * mm.speed * (deltatime / 1000);
          re.zPos += dirZ * mm.speed * (deltatime / 1000);
          re.yPos = 1;
          re.angleY = deg;
        }
        if (mm.accelerationOn) {
          var dirVectorX = Math.cos(this.degToRad(re.angleY));
          var dirVectorZ = Math.sin(this.degToRad(re.angleY));
          mm.velocityX += mm.acceleration * dirVectorX * (deltatime / 1000);
          mm.velocityZ += mm.acceleration * dirVectorZ * (deltatime / 1000);
        }
        if (mm.rotateRight) {
          if (re.angleY >= 360)
            re.angleY = 0;
          if (re.angleY < 0)
            re.angleY = 360;
          re.angleY += 600 * (deltatime / 1000);
        }
        if (mm.rotateLeft) {
          if (re.angleY >= 360)
            re.angleY = 0;
          if (re.angleY < 0)
            re.angleY = 360;
          re.angleY -= 600 * (deltatime / 1000);
        }
        re.xPos += mm.velocityX * (deltatime / 1000);
        re.zPos += mm.velocityZ * (deltatime / 1000);
      }
    }
  },
  degToRad: function(degrees) {
    "use strict";
    return degrees * Math.PI / 180;
  }
}, {});
