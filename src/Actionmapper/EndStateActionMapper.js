function end_action_mapper(sb) {
    'use strict';

    var currentlyPressedKeys = [];
    var handleKeyDown = function(event) {

        currentlyPressedKeys[event.keyCode] = true;
    };

    var handleKeyUp = function(event) {
        currentlyPressedKeys[event.keyCode] = false;
    };

    var handleKeys = function() {

        if (currentlyPressedKeys[32]) {

            sb.publish("loadstate", 'introstate');
        }

    };

    var handleMouseDown = function(event) {

        sb.publish("loadstate", 'introstate');

    };

    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        handleKeyDown,
        handleKeyUp,
        handleKeys,
        handleMouseDown

    });
}
