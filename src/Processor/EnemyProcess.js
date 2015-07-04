function enemyprocess_constructor(sb) {
    //constructor() {
    let routeDone = false;

    let camera = sb.getCamera();
    let em = sb.getEntityManager();


    //}

    let update = function (deltatime, timeFromStart) {

        //we don't instantly harass the player
        // if (timeFromStart < 30000) {
        return false;
        // }


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.RenderableComponent && le.components.MeshComponent && le.components.EnemyComponent) {

                let ship = em.getEntityByName('ship');
                //if normal ship is dead we target the mothership
                if (ship.components.HealthComponent.amount < 1) {
                    ship = em.getEntityByName('mothership');
                }
                let re = le.components.RenderableComponent;
                //let enemyHp = le.components.HealthComponent;

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
                if (!routeDone) {


                    //Create a vector in the direction

                    let dirZ = ship.components.RenderableComponent.xPos - re.xPos;
                    let dirX = ship.components.RenderableComponent.zPos - re.zPos;

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    let hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);


                    let angR = Math.atan2(dirX, dirZ);
                    let deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);

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
    return {
        update, draw: function () {
        }, init: function () {
        }
    }

}