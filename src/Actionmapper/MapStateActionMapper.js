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









        //console.log(currentlyPressedKeys);

        if (currentlyPressedKeys[77]) {

            game.stateEngine.changeState("gamestate");
        }
    }

    handleMouseDown(event) {

        //game.stateEngine.changeState("gamestate");
    }


}

