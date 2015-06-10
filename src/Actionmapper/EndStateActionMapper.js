class EndStateActionMapper {

    constructor() {

    }


    handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }


    handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }


    handleKeys() {

       // if (currentlyPressedKeys[32]) {

       //     game.stateEngine.changeState("gamestate");

      //  }

    }

    handleMouseDown(event) {

   //     game.stateEngine.changeState("gamestate");
    }


}

