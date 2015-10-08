function momemtummovementprocess_constructor(sb) {
    'use strict';

    var sb = sb;
    var em = sb.getEntityManager();

    var update = function(deltatime) {
        /*
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
         */
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

            if (le.components.MomentumComponent && le.components.RenderableComponent) {

                var mm = le.components.MomentumComponent;

                var re = le.components.RenderableComponent;

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

    var init = function() {

    };

    return {
        update, draw: function() {
        }, init
    };

}