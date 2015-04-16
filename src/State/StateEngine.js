class StateEngine {


    constructor() {

        this.introState = null;
        this.endState = null;
        this.menuState = null;
        this.loadState = null;
        this.gameState = null;
        this.mapState = null;

        this.running = true;
        this.states = [];
        this.allStates = [];
        this.currentState = null;

    }

    init() {
    }

    update() {
    }

    cleanup() {

        document.onkeydown = null;
        document.onkeyup = null;
    }

    getState(sn) {


        if (this.allStates[sn]) {
            return this.allStates[sn];
        }

        switch (sn) {
            case 'introstate':
                this.allStates[sn] = new IntroState();
                break;
            case 'gamestate':

                this.allStates[sn] = new GameState();
                break;
            case 'menustate':
                this.allStates[sn] = new MenuState();
                break;
            case 'endstate':
                this.allStates[sn] = new EndState();
                break;
            case 'mapstate':
                this.allStates[sn] = new MapState();
                break;
            case 'loadstate':
                this.allStates[sn] = new LoadState();
                break;

        }
        return this.allStates[sn];


    }

    changeState(stateStr) {

        var state = this.getState(stateStr);

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


    loadS(nextState) {

        //var state = this.determineState(stateStr);

        // cleanup the current state
        if (this.states.length > 0) {

            this.states[this.states.length - 1].cleanup();
            this.states.pop();
        }

        // store and init the new state
        var ls = this.getState('loadstate');
        this.states.push(ls);
        this.currentState = ls;
        this.states[this.states.length - 1].init(nextState);
    }


    pushState(stateStr) {
        //var state = this.determineState(stateStr);
        var state = this.getState(stateStr);

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

