function menu_action_mapper(sb) {
    'use strict';

    var handleKeyDown = function(event) {

        currentlyPressedKeys[event.keyCode] = true;
    };

    var handleKeyUp = function(event) {

        currentlyPressedKeys[event.keyCode] = false;
    };

    var handleKeys = function() {

        if (currentlyPressedKeys[32]) {

            // game.stateEngine.changeState("loadtate");
        }
    };

    var handleMouseDown = function(event) {

        //game.stateEngine.changeState("gamestate");
    };

    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        handleKeyDown,
        handleKeyUp,
        handleKeys,
        handleMouseDown

    });

}

