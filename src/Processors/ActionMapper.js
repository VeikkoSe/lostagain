class ActionMapper {

    constructor() {
        this.shooting = 0;
        this.shipmode = 0;
    }




    handleKeyDown(event) {

        currentlyPressedKeys[event.keyCode] = true;
    }

    handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


    handleKeys() {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];



            if (le.components.MomentumMovable) {
                //game.ship.setAccelerationOff(elapsed);
                //up
                le.components.MomentumMovable.rotateLeft = 0;
                le.components.MomentumMovable.rotateRight = 0;
                le.components.MomentumMovable.accelerationOn = 0;

                if (currentlyPressedKeys[38]) {

                    le.components.MomentumMovable.accelerationOn = 1;
                }
                //down
                if (currentlyPressedKeys[40]) {
                    //game.ship.removeSpeed();
                }
                //left
                if (currentlyPressedKeys[37]) {
                    le.components.MomentumMovable.rotateLeft = 1;
                }
                //right
                if (currentlyPressedKeys[39]) {
                    le.components.MomentumMovable.rotateRight = 1;
                }
                //spacebar
                if (currentlyPressedKeys[32]) {
                    //game.stateEngine.gameState.gun.shootBullet(elapsed);

                }
            }
        }
    }




    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    handleMouseDown(event) {
        if (!actionMapper.setPicking(event))
            actionMapper.setClickPosition(event);
    }

    setPicking(event) {

        var x = helpers.mouseX(event);
        var y = resolutionHeight - helpers.mouseY(event);

        if (x < 0)
            x = 0;
        if (x > resolutionWidth)
            x = resolutionWidth;
        if (y < 0)
            y = 0;
        if (y > resolutionHeight)
            y = resolutionHeight;

        //console.log(x);
        //console.log(y);

        if (picker.findAndSet([x, y]))
            return true;

        return false;

    }

    setClickPosition(event) {


        var x = (helpers.mouseX(event) - resolutionWidth / 2) / (resolutionWidth / 2);
        var y = -(helpers.mouseY(event) - resolutionHeight / 2) / (resolutionHeight / 2);

        // console.log(x,y);

        var viewportArray = [
            0, 0, resolutionWidth, resolutionHeight
        ];

        // The results of the operation will be stored in this array.
        var modelPointArrayResultsNear = [];

        var success = GLU.unProject(
            x, y, 0,
            camera.mvMatrix, camera.pMatrix,
            viewportArray, modelPointArrayResultsNear);

        var modelPointArrayResultsFar = [];

        var success = GLU.unProject(
            x, y, 1,
            camera.mvMatrix, camera.pMatrix,
            viewportArray, modelPointArrayResultsFar);

        camera.clickPosition = intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);


    }


    getCenterPosition() {


        var x = 0;
        var y = 0;


        var viewportArray = [
            0, 0, resolutionWidth, resolutionHeight
        ];

        // The results of the operation will be stored in this array.
        var modelPointArrayResultsNear = [];

        var success = GLU.unProject(
            x, y, 0,
            camera.mvMatrix, camera.pMatrix,
            viewportArray, modelPointArrayResultsNear);

        var modelPointArrayResultsFar = [];

        var success = GLU.unProject(
            x, y, 1,
            camera.mvMatrix, camera.pMatrix,
            viewportArray, modelPointArrayResultsFar);

        return intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);

    }


    handleMouseMove(e) {

        var x = helpers.mouseX(e);
        var y = helpers.mouseY(e);


        camera.slideLeft = false;
        camera.slideRight = false;
        camera.slideUp = false;
        camera.slideDown = false;

        if ($('#controlEdgeMovement').prop('checked')) {

            if (x < 20) {
                camera.slideLeft = true;

            }

            if (x > (resolutionWidth - 20)) {
                camera.slideRight = true;

            }

            if (y < 20) {
                camera.slideUp = true;

            }

            if (y > (resolutionHeight - 20)) {
                camera.slideDown = true;

            }

        }
    }


}

