function FaceProcess(sb) {
    'use strict';

    //constructor() {
    var routeDone = false;

    var camera = sb.getCamera();
    var em = sb.getEntityManager();

    //}

    var update = function(deltatime, timeFromStart) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.RenderableComponent &&
                le.components.MeshComponent &&
                le.components.ChaseComponent) {

                var ship = em.getEntityByName('ship');
                //if normal ship is dead we target the mothership
                if (!ship || ship.components.HealthComponent.amount < 1) {
                    ship = em.getEntityByName('mothership');
                }
                var re = le.components.RenderableComponent;

                var shiprc = ship.components.RenderableComponent;

                var dirZ = shiprc.getZPos() - re.getZPos();
                var dirX = shiprc.getXPos() - re.getXPos();

                var angR = Math.atan2(dirX, dirZ);
                var deg = (angR / Math.PI * 180) - 90 + (angR > 0 ? 0 : 360);

                re.setAngleY(deg);

            }
        }
    };
    return Object.freeze({
        update, draw: function() {
        }, init: function() {
        }
    });

}