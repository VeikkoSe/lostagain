class TeleportProcess extends Processor {


    update(deltatime) {

    }

    isInRectangle(centerX, centerY, radius, x, y) {
        return x >= centerX - radius && x <= centerX + radius &&
            y >= centerY - radius && y <= centerY + radius;
    }
}



