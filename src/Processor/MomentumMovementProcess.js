function momemtummovementprocess_constructor() {
    //constructor() {


    //}


    let update = function (deltatime) {

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.HealthComponent && le.components.HealthComponent.amount < 1)
                continue;


            if (le.components.MomentumMovable && le.components.Renderable) {

                let mm = le.components.MomentumMovable;
                let re = le.components.Renderable;
                /*
                 if ((helpers.isNumeric(mm.routeEndXpos) && helpers.isNumeric(mm.routeEndZpos)) &&
                 (helpers.isClose(re.xPos, mm.routeEndXpos) && helpers.isClose(re.zPos, mm.routeEndZpos))) {

                 mm.routeDone = true;
                 }

                 //newX and newZ are false by default so we don't move anywhere if newpos is not set
                 if (!mm.routeDone) {


                 //Create a vector in the direction

                 let dirX = mm.routeEndXpos - re.xPos;
                 let dirZ = mm.routeEndZpos - re.zPos;

                 //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                 let hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);


                 let angR = Math.atan2(dirX, dirZ);
                 let deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);

                 dirX /= hyp;
                 dirZ /= hyp;


                 //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                 re.xPos += dirX * mm.speed * (deltatime / 1000);
                 re.zPos += dirZ * mm.speed * (deltatime / 1000);
                 re.yPos = 1;

                 re.angleY = deg;

                 }

                 */
                //console.log(re.angleY);
                if (mm.accelerationOn) {


                    let dirVectorX = Math.cos(degToRad(re.angleY));
                    //result works but re.zPos is minus instead of addition in the end
                    let dirVectorZ = Math.sin(degToRad(re.angleY));

                    let tx = mm.velocityX;
                    let tz = mm.velocityZ;

                    tx += mm.acceleration * dirVectorX * (deltatime / 1000);
                    tz += mm.acceleration * dirVectorZ * (deltatime / 1000);
                    let posX = (tx < 0) ? tx * -1 : tx;
                    let posZ = (tz < 0) ? tz * -1 : tz;

                    //we cant go past top speed on x or z axel but allow deasselerating
                    if (posX < mm.speed && posZ < mm.speed) {
                        mm.velocityX = tx;
                        mm.velocityZ = tz;
                    }

                    //console.log(mm.acceleration);
                }
                if (mm.rotateRight) {

                    if (re.angleY >= 360)
                        re.angleY = 0;

                    if (re.angleY < 0)
                        re.angleY = 360;

                    re.angleY -= mm.turnSpeed * (deltatime / 1000);
                }
                if (mm.rotateLeft) {

                    if (re.angleY >= 360)
                        re.angleY = 0;

                    if (re.angleY < 0)
                        re.angleY = 360;
                    re.angleY += mm.turnSpeed * (deltatime / 1000);
                }

                re.xPos += mm.velocityX * (deltatime / 1000);
                re.zPos -= mm.velocityZ * (deltatime / 1000);
            }

        }
    }


    return {}

}