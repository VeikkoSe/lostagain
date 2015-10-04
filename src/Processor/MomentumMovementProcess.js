function momemtummovementprocess_constructor(sb) {
    "use strict";


    var sb = sb;
    var em = sb.getEntityManager();


    var update = function (deltatime) {


        var ms = em.getEntityByName('mothership');
        if (ms) {


            ms.components.MomentumComponent.setRotatingLeft(0);
            ms.components.MomentumComponent.setRotatingRight(0);
            ms.components.MomentumComponent.setCurrentlyAccelerating(0);

            //w
            if (sb.getActionMapper().getCurrentlyPressedKeys()[87]) {

                ms.components.MomentumComponent.setCurrentlyAccelerating(1);
            }
            //a
            if (sb.getActionMapper().getCurrentlyPressedKeys()[65]) {
                ms.components.MomentumComponent.setRotatingLeft(1);
            }
            //d
            if (sb.getActionMapper().getCurrentlyPressedKeys()[68]) {
                ms.components.MomentumComponent.setRotatingRight(1);
            }
        }


        var ship = em.getEntityByName('ship');
        if (ship) {
            ship.components.MomentumComponent.setRotatingLeft(0);
            ship.components.MomentumComponent.setRotatingRight(0);
            ship.components.MomentumComponent.setCurrentlyAccelerating(0);
            ship.components.GunComponent.setShooting(0);

            if (sb.getActionMapper().getCurrentlyPressedKeys()[38]) {
                ship.components.MomentumComponent.setCurrentlyAccelerating(1);
            }
            //left
            if (sb.getActionMapper().getCurrentlyPressedKeys()[37]) {
                ship.components.MomentumComponent.setRotatingLeft(1);
            }
            //right
            if (sb.getActionMapper().getCurrentlyPressedKeys()[39]) {
                ship.components.MomentumComponent.setRotatingRight(1);
            }
            //spacebar
            if (sb.getActionMapper().getCurrentlyPressedKeys()[32]) {
                ship.components.GunComponent.setShooting(1);
            }
        }


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.HealthComponent && le.components.HealthComponent.amount < 1)
                continue;


            if (le.components.MomentumComponent && le.components.RenderableComponent) {

                var mm = le.components.MomentumComponent;

                var re = le.components.RenderableComponent;
                /*
                 if ((helpers.isNumeric(mm.routeEndXpos) && helpers.isNumeric(mm.routeEndZpos)) &&
                 (helpers.isClose(re.xPos, mm.routeEndXpos) && helpers.isClose(re.zPos, mm.routeEndZpos))) {

                 mm.routeDone = true;
                 }

                 //newX and newZ are false by default so we don't move anywhere if newpos is not set
                 if (!mm.routeDone) {


                 //Create a vector in the direction

                 var dirX = mm.routeEndXpos - re.xPos;
                 var dirZ = mm.routeEndZpos - re.zPos;

                 //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                 var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);


                 var angR = Math.atan2(dirX, dirZ);
                 var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);

                 dirX /= hyp;
                 dirZ /= hyp;


                 //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                 re.xPos += dirX * mm.speed * (deltatime / 1000);
                 re.zPos += dirZ * mm.speed * (deltatime / 1000);
                 re.yPos = 1;

                 re.angleY = deg;

                 }

                 */


                if (mm.getCurrentlyAccelerating() === 1) {


                    var dirVectorX = Math.cos(degToRad(re.getAngleY()));
                    //result works but re.zPos is minus instead of addition in the end
                    var dirVectorZ = Math.sin(degToRad(re.getAngleY()));

                    var tx = mm.getVelocityX();
                    var tz = mm.getVelocityZ();

                    tx += mm.getAccelerationAmount() * dirVectorX * (deltatime / 1000);
                    tz += mm.getAccelerationAmount() * dirVectorZ * (deltatime / 1000);
                    var posX = (tx < 0) ? tx * -1 : tx;
                    var posZ = (tz < 0) ? tz * -1 : tz;

                    //we cant go past top speed on x or z axel but allow deasselerating
                    if (posX < mm.getSpeed() && posZ < mm.getSpeed()) {

                        mm.setVelocityX(tx);
                        mm.setVelocityZ(tz);
                    }
                }
                if (mm.getRotatingRight() === 1) {


                    if (re.getAngleY() >= 360)
                        re.setAngleY(0);

                    if (re.getAngleY() < 0)
                        re.setAngleY(360);

                    re.setAngleY(re.getAngleY() - mm.getTurnSpeed() * (deltatime / 1000));
                }
                if (mm.getRotatingLeft() === 1) {

                    if (re.getAngleY() >= 360)
                        re.setAngleY(0);

                    if (re.getAngleY() < 0)
                        re.setAngleY(360);
                    re.setAngleY(re.getAngleY() + mm.getTurnSpeed() * (deltatime / 1000));
                }

                re.setXPos(re.getXPos() + mm.getVelocityX() * (deltatime / 1000));
                re.setZPos(re.getZPos() - mm.getVelocityZ() * (deltatime / 1000));
            }

        }
    };

    var init = function () {


    };


    return {
        update, draw: function () {
        }, init
    }

}