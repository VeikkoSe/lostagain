function linearmovementprocess_construcotr(sb) {

    let em = sb.getEntityManager();


    let isClose = function (currentCoord, newCoord) {


        if (currentCoord < newCoord + 0.1 && currentCoord > newCoord - 0.1) {

            return true;
        }


        return false;
    }

    let update = function (deltatime) {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            //for (let e = 0; e < foundMoveEntities.length; e++) {


            if (le.components.Selectable && le.components.Renderable && le.components.Movable) {

                let se = le.components.Selectable;
                let re = le.components.Renderable;
                let me = le.components.Movable;

                //let re = em.searchComponentForEntity(foundMoveEntities[e], "Renderable");

                //let me = em.searchComponentForEntity(foundMoveEntities[e], "Movable");
                //console.log(se.selected);
                if (me && se.selected && camera.clickPosition) {


                    me.newXpos = camera.clickPosition[0];
                    me.newYpos = camera.clickPosition[1];
                    me.newZpos = camera.clickPosition[2];

                }


                //newX and newZ are false by default so we don't move anywhere if newpos is not set
                if ((isNumeric(le.components.Movable.newXpos) && isNumeric(le.components.Movable.newZpos)) &&
                    (!isClose(re.xPos, le.components.Movable.newXpos) || !isClose(re.zPos, le.components.Movable.newZpos))) {

                    //Create a vector in the direction

                    let dirX = me.newXpos - re.xPos;
                    let dirZ = me.newZpos - re.zPos;

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    let hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);


                    let angR = Math.atan2(dirX, dirZ);
                    let deg = (angR / Math.PI * 180) + (angR > 0 ? 0 : 360);

                    dirX /= hyp;
                    dirZ /= hyp;


                    //if(ang<0)
                    //ang = ang+360.0;


                    //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                    re.xPos += dirX * me.speed * (deltatime / 1000);
                    re.zPos += dirZ * me.speed * (deltatime / 1000);
                    re.yPos = 0;

                    re.angleY = deg;

                }


            }
        }
    }


    return {}
}