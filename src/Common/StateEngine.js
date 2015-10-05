function stateengine_constructor() {
    'use strict';

    var introState;
    var gameState;
    var lState;
    var mapState;
    var menuState;
    var endState;
    var actionMapper;
    var sb;

    //this.endState = null;
    //this.menuState = null;

    //this.mapState = null;

    //var running = true;
    var states = [];
    var allStates = [];
    var currentState = null;

    var cleanup = function() {

        document.onkeydown = null;
        document.onkeyup = null;
    };

    //var introstate =

    var getState = function(sn) {


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

    var moveToLoadedStage = function(stateStr) {

        var state = getState(stateStr);

        // cleanup the current state
        if (states.length > 0) {

            states[states.length - 1].cleanup();
            states.pop();
        }

        // store and init the new state
        states.push(state);
        currentState = state;

        states[states.length - 1].init();

    };

    var loadState = function(wantedState) {

        if (states.length > 0) {

            states[states.length - 1].cleanup();
            states.pop();
        }

        // store and init the new state

        var ls = getState('loadstate');
        states.push(ls);
        currentState = ls;
        states[states.length - 1].init(wantedState);

    };
    var getCurrentState = function() {
        return currentState;
    };

    var tick = function() {

        requestAnimFrame(function() {
            tick();
        });
        var cs = getCurrentState();
        //actionMapper.handleKeys();
        cs.update();
        cs.draw();

    };

    var subscribe = function() {

    };

    var start = function() {
        introState = introstate_constructor(sb);
        gameState = gamestate_constructor(sb);

        lState = loadstate_constructor(sb);
        mapState = mapstate_constructor(sb);
        menuState = menustate_constructor(sb);
        endState = endstate_constructor(sb);
        actionMapper = sb.getActionMapper();

        loadState('gamestate');

        tick();

    };

    var init = function(sandbox) {

        sb = sandbox;

    };

    var startState = function() {

        sb.subscribe("movetoloadstate", function(name, wantedstate) {

            moveToLoadedStage(wantedstate);
        });

        sb.subscribe("loadstate", function(name, wantedstate) {
            loadState(wantedstate);
        });
    };

    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

        tick,
        init,
        subscribe,
        start,
        startState

    });

}

