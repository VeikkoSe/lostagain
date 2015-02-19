var CameraControllerProcess = function CameraControllerProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $CameraControllerProcess.prototype, arguments);
};
var $CameraControllerProcess = CameraControllerProcess;
($traceurRuntime.createClass)(CameraControllerProcess, {update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.CameraController && le.components.Renderable) {
        var re = le.components.Renderable;
        camera.x = -1 * re.xPos;
        camera.z = -1 * re.zPos - 220;
      }
    }
  }}, {}, Processor);
