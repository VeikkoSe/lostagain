function ChaseComponent(spd) {
    'use strict';

    var name = "ChaseComponent";
    var speed = spd;

    //}

    return {
        getName: function() {
            return name;
        },
        getSpeed: function() {
            return speed;
        }
    }

}