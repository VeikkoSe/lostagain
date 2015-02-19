/*
class Character extends Processor {

    isClose(currentCoord, newCoord) {


        if (currentCoord < newCoord + 0.1 && currentCoord > newCoord - 0.1)
        {

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



                    //if (me.newXpos > 0 && me.newZpos > 0) {

                    //var start = {x: re.xPos, y: re.zPos};
                    //var end = {x: me.newXpos, y: me.newZpos};

                    //me.path = astarManager.move(start, end);
                    //me.pathPosition = 0;
                    //}
                }

//console.log(re.xPos, me.newXpos,!this.isClose(re.xPos, me.newXpos));

                if (!this.isClose(re.xPos, le.components.Movable.newXpos) || !this.isClose(re.zPos, le.components.Movable.newZpos)) {

                    //Create a vector in the direction

                    var dirX = me.newXpos - re.xPos;
                    var dirZ = me.newZpos - re.zPos;

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
                    //console.log(hyp);
                    //console.log = function () {
                    dirX /= hyp;
                    dirZ /= hyp;

                    //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                    re.xPos += dirX * me.speed * deltatime;
                    re.zPos += dirZ * me.speed * deltatime;
                    re.yPos = 1;

                }


            }
        }
    }


    checkCollision() {

    }
}*/
