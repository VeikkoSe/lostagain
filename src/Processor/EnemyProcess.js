function enemyprocess_constructor(sb) {
    "use strict";

    //constructor() {
    var routeDone = false;

    var camera = sb.getCamera();
    var em = sb.getEntityManager();


    //}

    var update = function (deltatime, timeFromStart) {

        //we don't instantly harass the player
        // if (timeFromStart < 30000) {
        //return false;
        // }


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.RenderableComponent && le.components.MeshComponent && le.components.EnemyComponent) {

                var ship = em.getEntityByName('ship');
                //if normal ship is dead we target the mothership
                if (ship.components.HealthComponent.amount < 1) {
                    ship = em.getEntityByName('mothership');
                }
                var re = le.components.RenderableComponent;
                var enemyHp = le.components.HealthComponent;


                if (enemyHp.getAmount() > 0) {

                    if (
                        (isClose(re.xPos, ship.components.RenderableComponent.getXPos()) && isClose(re.getZPos(), ship.components.RenderableComponent.getZPos()))) {

                        //this.routeDone = true;

                        if (ship.components.HealthComponent.getAmount() < 1 && ship.components.ShieldComponent.getAmount() < 1) {
                            //game.stateEngine.changeState("gamestate");
                        }

                        if (ship.components.ShieldComponent.amount < 1)
                            ship.components.HealthComponent.setAmount(ship.components.HealthComponent.getAmount() - 1);
                        else
                            ship.components.ShieldComponent.setAmount(ship.components.ShieldComponent.getAmount() - 1);


                    }
                }


                //newX and newZ are false by default so we don't move anywhere if newpos is not set
                if (!routeDone) {


                    //Create a vector in the direction

                    var dirZ = ship.components.RenderableComponent.getZPos() - re.getXPos();
                    var dirX = ship.components.RenderableComponent.getXPos() - re.getZPos();

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);


                    var angR = Math.atan2(dirX, dirZ);
                    var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);

                    dirX /= hyp;
                    dirZ /= hyp;


                    //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                    re.setZPos(re.getZPos() + dirX * le.components.EnemyComponent.getSpeed() * (deltatime / 1000));
                    re.setXPos(re.getXPos() + dirZ * le.components.EnemyComponent.getSpeed() * (deltatime / 1000));
                    //re.yPos = 0;

                    re.setAngleY(deg);

                }
            }
        }
    };
    return {
        update, draw: function () {
        }, init: function () {
        }
    }

}