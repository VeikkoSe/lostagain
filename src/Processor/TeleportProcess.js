class TeleportProcess extends Processor {


    update(deltatime) {
        var ms = em.getEntityByName('mothership');
        var ship = em.getEntityByName('ship');

        if (ms && ship) {

            if (!this.isInCircle(ms.components.Renderable.xPos,
                    ms.components.Renderable.zPos,
                    ms.components.JumpArea.radius,
                    ship.components.Renderable.xPos,
                    ship.components.Renderable.zPos)
            ) {
                var dirX = ms.components.Renderable.xPos - ship.components.Renderable.xPos;
                var dirZ = ms.components.Renderable.zPos - ship.components.Renderable.zPos;

                var origHyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                //normalize
                var dirXnormal = dirX / origHyp;
                var dirZnormal = dirZ / origHyp;

                //we get new vector that is in same direction but always inside the circle
                dirX = (ms.components.JumpArea.radius - 1) * dirXnormal;
                dirZ = (ms.components.JumpArea.radius - 1) * dirZnormal;


                var posx = dirX + ms.components.Renderable.xPos;
                var posZ = dirZ + ms.components.Renderable.zPos;


                ship.components.Renderable.xPos = posx;
                ship.components.Renderable.zPos = posZ;

            }
        }
    }


    isInCircle(centerX, centerY, radius, x, y) {
        return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
    }

    isInRectangle(centerX, centerY, radius, x, y) {
        return x >= centerX - radius && x <= centerX + radius &&
            y >= centerY - radius && y <= centerY + radius;
    }

    getOppositeAngle(angle) {
        //angle = angle * Math.PI/180;
        var ret = false;
        if (angle > 180)
            ret = angle - 180;
        else if (angle < 180)
            ret = angle + 180;


        return ret;

    }


}



