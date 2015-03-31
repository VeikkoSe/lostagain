class IntroStateActionMapper {

    constructor() {

    }


    handleKeyDown(event) {

        currentlyPressedKeys[event.keyCode] = true;
    }


    handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


    handleKeys() {


        if (currentlyPressedKeys[32]) {

            game.stateEngine.changeState("loadstate");

        }


    }

    handleMouseDown(event) {

        game.stateEngine.changeState("loadstate");
    }


}

