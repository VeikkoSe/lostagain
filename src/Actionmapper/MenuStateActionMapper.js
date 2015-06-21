function menu_action_mapper(sb) {


    let handleKeyDown = function (event) {

        currentlyPressedKeys[event.keyCode] = true;
    }


    let handleKeyUp = function (event) {

        currentlyPressedKeys[event.keyCode] = false;
    }


    let handleKeys = function () {


        if (currentlyPressedKeys[32]) {

            // game.stateEngine.changeState("loadtate");
        }
    }

    let handleMouseDown = function (event) {

        //game.stateEngine.changeState("gamestate");
    }


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        handleKeyDown,
        handleKeyUp,
        handleKeys,
        handleMouseDown


    });


}

