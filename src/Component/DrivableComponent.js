function DrivableComponent() {
    'use strict';

    var name = "Drivable";
    var accelerationOn = 0;
    var acceleration = 20;

    var velocityX = 0;
    var velocityZ = 0;
    var rotateRight = false;
    var rotateLeft = false;

    //}
    return {
        getName: function() {
            return name;
        }
    }

}