function stateengine_constructor(sb) {


    let introState = introstate_constructor(sb);
    let gameState = gamestate_constructor(sb);
    let lState = loadstate_constructor(sb);
    let mapState = mapstate_constructor(sb);
    let menuState = menustate_constructor(sb);
    let endState = endstate_constructor(sb);
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

        cs.update();
        cs.draw();

    };

    let subscribe = function () {
        introState.subscribe();
        lState.subscribe();
        gameState.subscribe();

        sb.subscribe("movetoloadstate", function (name, wantedstate) {

            moveToLoadedStage(wantedstate);
        });


        sb.subscribe("loadstate", function (name, wantedstate) {
            loadState(wantedstate);
        });

        // sb.subscribe("allassetsloaded", function (name, assetname) {
//alert('h');
        //     sb.publish("movetoloadstate", assetname);
        // });

    }

    let init = function () {


        loadState('gamestate');

        tick();

    };


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

        tick,
        init,
        subscribe


    });


}

