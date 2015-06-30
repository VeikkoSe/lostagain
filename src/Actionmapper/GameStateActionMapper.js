function game_action_mapper(sb) {


    let currentlyPressedKeys = [];
    let camera = sb.getCamera();
    let handleKeyDown = function (event) {

        currentlyPressedKeys[event.keyCode] = true;
    }


    let handleKeyUp = function (event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


    let handleKeys = function () {

        if (currentlyPressedKeys[32]) {

            // sb.publish("loadstate", 'introstate');
        }


    };


    let handleMouseDown = function (event) {

        //sb.publish("loadstate", 'introstate');

    }


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        handleKeyDown,
        handleKeyUp,
        handleKeys,
        handleMouseDown


    });
}


if (false) {
    class GameStateActionMapper {

        constructor() {


        }


        handleKeyDown(event) {

            currentlyPressedKeys[event.keyCode] = true;
        }

        handleKeyUp(event) {
            currentlyPressedKeys[event.keyCode] = false;
        }

        handleMouseWheel(event) {
            //http://jsfiddle.net/BXhzD/
            let normalized;
            if (event.wheelDelta) {
                normalized = (event.wheelDelta % 120 - 0) == -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
            } else {
                let rawAmmount = event.deltaY ? event.deltaY : event.detail;
                normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
            }


            if (normalized == -1) {
                camera.distance += 10;
            }

            if (normalized == 1) {
                camera.distance -= 10;

            }
        }

        handleKeys() {
            //temp levl changing
            if (currentlyPressedKeys[49]) {

                loadManager.loadLevel('first');
                game.currentLevel = 'first';
            }
            if (currentlyPressedKeys[50]) {

                loadManager.loadLevel('second');
                game.currentLevel = 'second';
            }

            if (currentlyPressedKeys[51]) {

                loadManager.loadLevel('third');
                game.currentLevel = 'third';
            }

            if (currentlyPressedKeys[52]) {

                game.stateEngine.changeState("mapstate");
            }


            let ms = em.getEntityByName('mothership');
            if (ms) {

                ms.components.MomentumMovable.rotateLeft = 0;
                ms.components.MomentumMovable.rotateRight = 0;
                ms.components.MomentumMovable.accelerationOn = 0;

                //w
                if (currentlyPressedKeys[87]) {
                    ms.components.MomentumMovable.accelerationOn = 1;
                }
                //a
                if (currentlyPressedKeys[65]) {
                    ms.components.MomentumMovable.rotateLeft = 1;
                }
                //d
                if (currentlyPressedKeys[68]) {
                    ms.components.MomentumMovable.rotateRight = 1;
                }
            }


            let ship = em.getEntityByName('ship');
            if (ship) {
                ship.components.MomentumMovable.rotateLeft = 0;
                ship.components.MomentumMovable.rotateRight = 0;
                ship.components.MomentumMovable.accelerationOn = 0;
                ship.components.GunComponent.shooting = false;

                if (currentlyPressedKeys[38]) {
                    ship.components.MomentumMovable.accelerationOn = 1;
                }
                //left
                if (currentlyPressedKeys[37]) {
                    ship.components.MomentumMovable.rotateLeft = 1;
                }
                //right
                if (currentlyPressedKeys[39]) {
                    ship.components.MomentumMovable.rotateRight = 1;
                }
                //spacebar
                if (currentlyPressedKeys[32]) {
                    ship.components.GunComponent.shooting = true;
                }
            }


            /*
             for (let e = 0; e < em.entities.length; e++) {
             let le = em.entities[e];


             if (le.components.GunComponent)
             le.components.GunComponent.shooting = false;





             if (le.components.Drivable) {


             le.components.Drivable.rotateLeft = 0;
             le.components.Drivable.rotateRight = 0;


             //w
             if (currentlyPressedKeys[87]) {

             le.components.Drivable.addSpeed = 1;
             }
             //s
             if (currentlyPressedKeys[83]) {

             le.components.Drivable.reduceSpeed = 1;
             }


             //a
             if (currentlyPressedKeys[65]) {
             le.components.Drivable.rotateLeft = 1;
             }
             //d
             if (currentlyPressedKeys[68]) {
             le.components.Drivable.rotateRight = 1;
             }


             }
             */
            /*
             if (le.components.MomentumMovable && ) {
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
             le.components.GunComponent.shooting = true;
             //game.stateEngine.gameState.gun.shootBullet(elapsed);

             }
             }
             }*/
        }


        getMousePos(canvas, evt) {
            let rect = canvas.getBoundingClientRect();
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

            let x = mouseX(event);
            let y = resolutionHeight - mouseY(event);

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


            let x = (mouseX(event) - resolutionWidth / 2) / (resolutionWidth / 2);
            let y = -(mouseY(event) - resolutionHeight / 2) / (resolutionHeight / 2);

            // console.log(x,y);

            let viewportArray = [
                0, 0, resolutionWidth, resolutionHeight
            ];

            // The results of the operation will be stored in this array.
            let modelPointArrayResultsNear = [];

            let success = GLU.unProject(
                x, y, 0,
                camera.getMVMatrix(), camera.getPMatrix(),
                viewportArray, modelPointArrayResultsNear);

            let modelPointArrayResultsFar = [];

            let success = GLU.unProject(
                x, y, 1,
                camera.getMVMatrix(), camera.getPMatrix(),
                viewportArray, modelPointArrayResultsFar);

            camera.clickPosition = intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);


        }


        getCenterPosition() {


            let x = 0;
            let y = 0;


            let viewportArray = [
                0, 0, resolutionWidth, resolutionHeight
            ];

            // The results of the operation will be stored in this array.
            let modelPointArrayResultsNear = [];

            let success = GLU.unProject(
                x, y, 0,
                camera.getMVMatrix(), camera.getPMatrix(),
                viewportArray, modelPointArrayResultsNear);

            let modelPointArrayResultsFar = [];

            let success = GLU.unProject(
                x, y, 1,
                camera.getMVMatrix(), camera.getPMatrix(),
                viewportArray, modelPointArrayResultsFar);

            return intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);

        }


        handleMouseMove(e) {

            let x = mouseX(e);
            let y = mouseY(e);


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

}