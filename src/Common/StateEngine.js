function stateengine_constructor() {


    let introState;
    let gameState;
    let lState;
    let mapState;
    let menuState;
    let endState;
    let actionMapper;
    let sb;

    //this.endState = null;
    //this.menuState = null;


    //this.mapState = null;

    //let running = true;
    let states = [];
    let allStates = [];
    let currentState = null;


    let cleanup = function () {

        document.onkeydown = null;
        document.onkeyup = null;
    };


    //let introstate =

    let getState = function (sn) {


        //if (allStates[sn]) {
        //    return allStates[sn];
        //}
        //alert(sn);

        switch (sn) {
            case 'introstate':
                return introState;
                break;

            case 'gamestate':

                return gameState;
                break;
            case 'loadstate':

                return lState;
                break;

            case 'menustate':
                return menuState;
                break;
            case 'endstate':
                return endState;
                break;
            case 'mapstate':
                return mapState;
                break;


        }
        //currentState = allStates[sn];
        //return allStates[sn];


    };


    let moveToLoadedStage = function (stateStr) {

        let state = getState(stateStr);

        // cleanup the current state
        if (states.length > 0) {

            states[states.length - 1].cleanup();
            states.pop();
        }

        // store and init the new state
        states.push(state);
        //console.log(stateStr);
        currentState = state;

        states[states.length - 1].init();

    };


    let loadState = function (wantedState) {

        //let state = this.determineState(stateStr);

        // cleanup the current state
        if (states.length > 0) {

            states[states.length - 1].cleanup();
            states.pop();
        }

        // store and init the new state

        let ls = getState('loadstate');
        states.push(ls);
        currentState = ls;
        states[states.length - 1].init(wantedState);

    };
    let getCurrentState = function () {
        return currentState;
    };


    let tick = function () {

        requestAnimFrame(function () {
            tick();
        });
        let cs = getCurrentState();
        //actionMapper.handleKeys();
        cs.update();
        cs.draw();

    };

    let subscribe = function () {


    }

    let start = function () {
        introState = introstate_constructor(sb);
        gameState = gamestate_constructor(sb);

        lState = loadstate_constructor(sb);
        mapState = mapstate_constructor(sb);
        menuState = menustate_constructor(sb);
        endState = endstate_constructor(sb);
        actionMapper = sb.getActionMapper();


        loadState('gamestate');

        tick();

    }

    let init = function (sandbox) {


        sb = sandbox;


    };

    let startState = function () {

        sb.subscribe("movetoloadstate", function (name, wantedstate) {

            moveToLoadedStage(wantedstate);
        });


        sb.subscribe("loadstate", function (name, wantedstate) {
            loadState(wantedstate);
        });
    }


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

        tick,
        init,
        subscribe,
        start,
        startState


    });


}

