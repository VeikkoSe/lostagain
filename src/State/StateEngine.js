class StateEngine {


    constructor() {


        this.introState = new IntroState();
        this.endState = new EndState();
        this.menuState = new MenuState();
        this.loadState = new LoadState();
        this.gameState = new GameState();
        this.mapState = new MapState();
        // this.warpRoomState = new WarpRoomState();

        // this.pauseState = new PauseState();


        this.running = true;
        this.states = [];
        this.currentState = null;


        //this.init();
    }

    init() {

    }

    update() {

    }

    cleanup() {

        document.onkeydown = null;
        document.onkeyup = null;
    }

    determineState(stateStr) {
        var state = false;

        if (stateStr == "introstate") {

            state = this.introState;
        }
        if (stateStr == "gamestate") {
            state = this.gameState;
        }
        if (stateStr == "menustate") {
            state = this.menuState;
        }

        if (stateStr == "pausestate") {
            state = this.pauseState;
        }
        if (stateStr == "endstate") {
            state = this.endState;
        }
        if (stateStr == "mapstate") {

            state = this.mapState;

        }

        if (stateStr == "loadstate") {

            state = this.loadState;

        }


        return state;
    }


    changeState(stateStr) {

        var state = this.determineState(stateStr);

        // cleanup the current state
        if (this.states.length > 0) {

            this.states[this.states.length - 1].cleanup();
            this.states.pop();
        }

        // store and init the new state
        this.states.push(state);
        this.currentState = state;
        this.states[this.states.length - 1].init();
    }

    pushState(stateStr) {
        var state = this.determineState(stateStr);

        // pause current state
        if (this.states.length > 0) {
            this.states[this.states.length - 1].pause();
        }

        // store and init the new state
        this.states.push(state);
        this.states[this.states.length - 1].init();
    }


    popState() {
        // cleanup the current state
        if (this.states.length > 0) {
            this.states[this.states.length - 1].cleanup();
            this.states.pop();
        }

        // resume previous state
        if (!this.states.empty()) {
            this.states[this.states.length - 1].resume();
        }
    }


    handleEvents() {
        // let the state handle events
        //this.states[this.states.length - 1].handleEvents();
    }


    draw() {
        // let the state draw the screen
        //this.states[this.states.length - 1].draw();
    }


}

