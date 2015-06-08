class EnemyProcess extends Processor {
    constructor() {
        this.routeDone = false;


    }

    update(deltatime, timeFromStart) {

        //we don't instantly harass the player
        if (timeFromStart < 20000) {
            return false;
        }


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.Renderable && le.components.MeshComponent && le.components.EnemyComponent) {

                var ship = em.getEntityByName('ship');
                //if normal ship is dead we target the mothership
                if (ship.components.HealthComponent.amount < 1) {
                    ship = em.getEntityByName('mothership');
                }
                var re = le.components.Renderable;
                //var enemyHp = le.components.HealthComponent;

                /*
                 if (enemyHp.amount > 0) {
                 if (
                 (helpers.isClose(re.xPos, ship.components.Renderable.xPos) && helpers.isClose(re.zPos, ship.components.Renderable.zPos))) {

                 //this.routeDone = true;

                 if (ship.components.HealthComponent.amount < 1 && ship.components.ShieldComponent.amount < 1) {
                 //game.stateEngine.changeState("gamestate");
                 }

                 if (ship.components.ShieldComponent.amount < 1)
                 ship.components.HealthComponent.amount--;
                 else
                 ship.components.ShieldComponent.amount--;


                 }
                 }
                 */

                //newX and newZ are false by default so we don't move anywhere if newpos is not set
                if (!this.routeDone) {


                    //Create a vector in the direction

                    var dirZ = ship.components.Renderable.xPos - re.xPos;
                    var dirX = ship.components.Renderable.zPos - re.zPos;

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);


                    var angR = Math.atan2(dirX, dirZ);
                    var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);

                    dirX /= hyp;
                    dirZ /= hyp;


                    //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                    re.zPos += dirX * le.components.EnemyComponent.speed * (deltatime / 1000);
                    re.xPos += dirZ * le.components.EnemyComponent.speed * (deltatime / 1000);
                    //re.yPos = 0;
                    //console.log(deg);
                    re.angleY = deg;

                }
            }
        }
    }


    draw() {

    }
}