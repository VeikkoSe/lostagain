function StateEngine() {
    'use strict';

    var introState;
    var gameState;
    var lState;
    var mapState;
    var menuState;
    var endState;
    var actionMapper;
    var sb;

    var states = [];
    var allStates = [];
    var currentState = null;

    var cleanup = function() {

        document.onkeydown = null;
        document.onkeyup = null;
    };

    var getState = function(sn) {

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

        introState = IntroState(sb);
        gameState = GameState(sb);

        lState = LoadState(sb);
        mapState = MapState(sb);
        menuState = MenuState(sb);
        endState = EndState(sb);
        actionMapper = sb.getActionMapper();

        loadState('gamestate');

        tick();

    };

    var init = function(sandbox) {

        sb = sandbox;

    };

    var startState = function() {

        sb.subscribe('movetoloadstate', function(name, wantedstate) {

            moveToLoadedStage(wantedstate);
        });

        sb.subscribe('loadstate', function(name, wantedstate) {
            loadState(wantedstate);
        });
    };
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    return Object.freeze({

        tick,
        init,
        subscribe,
        start,
        startState

    });

}
