class DrivingMovementProcess extends Processor {
    constructor() {


    }


    update(deltatime) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];



            if (le.components.Drivable) {

                var mm = le.components.Drivable;
                var re = le.components.Renderable;


                var dirVectorX = Math.cos(helpers.degToRad(re.angleY));
                var dirVectorZ = Math.sin(helpers.degToRad(re.angleY));

                if (mm.addSpeed) {

                    mm.velocityX += mm.acceleration * dirVectorX * (deltatime / 1000);
                    mm.velocityZ += mm.acceleration * dirVectorZ * (deltatime / 1000);

                }

                if (mm.reduceSpeed) {

                    mm.velocityX -= mm.acceleration * dirVectorX * (deltatime / 1000);
                    mm.velocityZ -= mm.acceleration * dirVectorZ * (deltatime / 1000);

                }

                if (mm.rotateRight) {

                    if (re.angleY >= 360)
                        re.angleY = 0;

                    if (re.angleY < 0)
                        re.angleY = 360;

                    re.angleY -= 600 * (deltatime / 1000);
                }
                if (mm.rotateLeft) {

                    if (re.angleY >= 360)
                        re.angleY = 0;

                    if (re.angleY < 0)
                        re.angleY = 360;
                    re.angleY += 600 * (deltatime / 1000);
                }

                re.xPos += mm.velocityX * (deltatime / 1000);
                re.zPos -= mm.velocityZ * (deltatime / 1000);

                //console.log(re.xPos);
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