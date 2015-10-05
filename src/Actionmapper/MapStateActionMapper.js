function map_action_mapper(sb) {
    'use strict';

    var handleKeyDown = function(event) {

        currentlyPressedKeys[event.keyCode] = true;
    };

    var handleKeyUp = function(event) {

        currentlyPressedKeys[event.keyCode] = false;
    };

    var handleKeys = function() {

        if (currentlyPressedKeys[49]) {

            // loadManager.loadLevel('first');
            //sb.currentLevel = 'first';
        }
        if (currentlyPressedKeys[50]) {

            //loadManager.loadLevel('second');
            //game.currentLevel = 'second';
        }

        if (currentlyPressedKeys[51]) {

            //loadManager.loadLevel('third');
            //game.currentLevel = 'third';
        }

        if (currentlyPressedKeys[52]) {

            //game.stateEngine.changeState("mapstate");
        }

        var map = em.getEntityByName('map');
        if (map) {

            map.components.MapComponent.movingUp = 0;
            map.components.MapComponent.movingLeft = 0;
            map.components.MapComponent.movingRight = 0;
            map.components.MapComponent.movingDown = 0;
            map.components.MapComponent.selecting = false;

            //w
            if (currentlyPressedKeys[87]) {
                map.components.MapComponent.movingUp = 1;
            }
            //a
            if (currentlyPressedKeys[65]) {

                map.components.MapComponent.movingLeft = 1;
            }
            //d
            if (currentlyPressedKeys[68]) {

                map.components.MapComponent.movingRight = 1;
            }
            //s
            if (currentlyPressedKeys[83]) {

                map.components.MapComponent.movingDown = 1;
            }

            //spacebar
            if (currentlyPressedKeys[32]) {
                map.components.MapComponent.selecting = true;
            }

            //spacebar
            if (currentlyPressedKeys[32]) {
                map.components.MapComponent.selectMap = true;
            }

        }

        //console.log(currentlyPressedKeys);

        if (currentlyPressedKeys[77]) {

            //game.stateEngine.changeState("gamestate");
            sb.publish("loadstate", 'gamestate');
        }
    };

    var handleMouseDown = function(event) {

        //game.stateEngine.changeState("gamestate");
        sb.publish("loadstate", 'gamestate');
    }

}

