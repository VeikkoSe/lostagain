class MapStateActionMapper {

    constructor() {

    }


    handleKeyDown(event) {

        currentlyPressedKeys[event.keyCode] = true;
    }


    handleKeyUp(event) {

        currentlyPressedKeys[event.keyCode] = false;
    }


    handleKeys() {

        //console.log(currentlyPressedKeys);

        if (currentlyPressedKeys[77]) {

            game.stateEngine.changeState("gamestate");
        }
    }

    handleMouseDown(event) {

        //game.stateEngine.changeState("gamestate");
    }


}

