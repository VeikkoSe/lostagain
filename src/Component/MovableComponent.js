function MovableComponent(speed) {
    'use strict';

    //constructor(speed = 0.1) {

    var name = "MovableComponent";

    var newXpos = false;
    var newYpos = false;
    var newZpos = false;
    var path = {};

    var angle = 90;
    var lt = 0;
    var speed = speed;
    var acceleration = 5;
    //every jump in the map takes one unit of gas
    //var gas = 1;

//    }

    return {
        getName: function() {
            return name;
        }, newXpos, newYpos, newZpos, path, angle, lt, speed, acceleration
    }

}