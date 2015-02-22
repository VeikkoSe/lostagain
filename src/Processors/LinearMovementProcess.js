class LinearMovementProcess extends Processor {

    isClose(currentCoord, newCoord) {


        if (currentCoord < newCoord + 0.1 && currentCoord > newCoord - 0.1) {

            return true;
        }


        return false;
    }

    update(deltatime) {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            //for (var e = 0; e < foundMoveEntities.length; e++) {


            if (le.components.Selectable && le.components.Renderable && le.components.Movable) {

                var se = le.components.Selectable;
                var re = le.components.Renderable;
                var me = le.components.Movable;

                //var re = em.searchComponentForEntity(foundMoveEntities[e], "Renderable");

                //var me = em.searchComponentForEntity(foundMoveEntities[e], "Movable");

                if (me && se.selected && camera.clickPosition) {


                    me.newXpos = camera.clickPosition[0];
                    me.newYpos = camera.clickPosition[1];
                    me.newZpos = camera.clickPosition[2];

                }


                //newX and newZ are false by default so we don't move anywhere if newpos is not set
                if ((helpers.isNumeric(le.components.Movable.newXpos) && helpers.isNumeric(le.components.Movable.newZpos)) &&
                    (!this.isClose(re.xPos, le.components.Movable.newXpos) || !this.isClose(re.zPos, le.components.Movable.newZpos))) {

                    //Create a vector in the direction

                    var dirX = me.newXpos - re.xPos;
                    var dirZ = me.newZpos - re.zPos;

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);


                    var angR = Math.atan2(dirX, dirZ);
                    var deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);

                    dirX /= hyp;
                    dirZ /= hyp;


                    //if(ang<0)
                    //ang = ang+360.0;


                    //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                    re.xPos += dirX * me.speed * (deltatime / 1000);
                    re.zPos += dirZ * me.speed * (deltatime / 1000);
                    re.yPos = 1;

                    re.angleY = deg;

                }


            }
        }
    }


    checkCollision() {

    }
}