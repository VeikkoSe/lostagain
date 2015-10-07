function railsmovementprocess_constructor(sb) {
    'use strict';

    var sb = sb;
    var em = sb.getEntityManager();

    var update = function(deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.RailsMovementComponent &&
                le.components.RenderableComponent) {

                var rc = le.components.RailsMovementComponent;

                var re = le.components.RenderableComponent;

                if ((isNumeric(rc.getRouteEndXpos()) &&
                    isNumeric(rc.getRouteEndZpos())) &&
                    (isCloseOrbit(re.getXPos(), rc.getRouteEndXpos()) &&
                    isCloseOrbit(re.getZPos(), rc.getRouteEndZpos()))) {
                    rc.setRouteDone(true);
                    sb.publish('routeDone');

                }

                //newX and newZ are false by default so
                // we don't move anywhere if newpos is not set
                if (!rc.getRouteDone()) {


                    //Create a vector in the direction

                    var dirX = rc.getRouteEndXpos() - re.getXPos();
                    var dirZ = rc.getRouteEndZpos() - re.getZPos();

                    //Normalize this vector.
                    // That means divide the terms by the magnitude
                    // (the hypotenuse) of the vector.
                    var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                    var angR = Math.atan2(dirX, dirZ);


                    var deg = (angR / Math.PI * 180)-90 + (angR > 0 ? 0 : 360);

                    //console.log(deg);

                    dirX /= hyp;
                    dirZ /= hyp;

                    //Add that vector to the enemy's position,
                    // multiplied by the speed you want the enemy to move:
                    re.setXPos(re.getXPos() + dirX * rc.getSpeed() * (deltatime / 1000));
                    re.setZPos(re.getZPos() + dirZ * rc.getSpeed() * (deltatime / 1000));


                    re.setAngleY(deg);

                }
            }
        }
    };

    var init = function() {

    };

    return {
        update, draw: function() {
        }, init
    };

}