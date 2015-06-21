function end_action_mapper(sb) {


    let currentlyPressedKeys = [];
    let handleKeyDown = function (event) {

        currentlyPressedKeys[event.keyCode] = true;
    }


    let handleKeyUp = function (event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


    let handleKeys = function () {

        if (currentlyPressedKeys[32]) {

            sb.publish("loadstate", 'introstate');
        }


    };


    let handleMouseDown = function (event) {

        sb.publish("loadstate", 'introstate');

    }


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        handleKeyDown,
        handleKeyUp,
        handleKeys,
        handleMouseDown


    });
}
