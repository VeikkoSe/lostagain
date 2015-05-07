class MomentumMovementProcess extends Processor {
    constructor() {


    }


    update(deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];


            if (le.components.MomentumMovable && le.components.Renderable) {

                var mm = le.components.MomentumMovable;
                var re = le.components.Renderable;
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
                //console.log(re.angleY);
                if (mm.accelerationOn) {


                    var dirVectorX = Math.cos(helpers.degToRad(re.angleY));
                    //result works but re.zPos is minus instead of addition in the end
                    var dirVectorZ = Math.sin(helpers.degToRad(re.angleY));

                    var tx = mm.velocityX;
                    var tz = mm.velocityZ;

                    tx += mm.acceleration * dirVectorX * (deltatime / 1000);
                    tz += mm.acceleration * dirVectorZ * (deltatime / 1000);
                    var posX = (tx < 0) ? tx * -1 : tx;
                    var posZ = (tz < 0) ? tz * -1 : tz;

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


    /*
     checkHit() {


     for (var j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {

     if (game.stateEngine.gameState.asteroids.asteroids[j].visible == 1 &&
     this.xPos > game.stateEngine.gameState.asteroids.asteroids[j].xPos - 4 &&
     this.xPos < game.stateEngine.gameState.asteroids.asteroids[j].xPos + 4 &&
     this.yPos > game.stateEngine.gameState.asteroids.asteroids[j].yPos - 4 &&
     this.yPos < game.stateEngine.gameState.asteroids.asteroids[j].yPos + 4
     ) {
     this.ships--;

     }
     }

     if (this.ships < 1) {

     game.stateEngine.changeState("endstate");
     }


     }

     */
    /*
     newEngineSmoke(y, x) {

     var particle = new EngineSmoke(this.angle);


     particle.xPos = this.xPos;
     particle.yPos = this.yPos;

     particle.time = 0;
     this.engineSmoke.push(particle);


     }

     */


}