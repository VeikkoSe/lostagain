function stateEngine() {
    'use strict';

    var iState;
    var gState;
    var lState;
    var mState;
    var meState;
    var eState;
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
                return iState;
            case 'gamestate':
                return gState;
            case 'loadstate':
                return lState;
            case 'menustate':
                return meState;
            case 'endstate':
                return eState;
            case 'mapstate':
                return mState;
        }
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

    var loadNewState = function(wantedState) {

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

        iState = introState(sb);
        gState = gameState(sb);

        lState = loadState(sb);
        mState = mapState(sb);
        meState = menuState(sb);
        eState = endState(sb);
        actionMapper = sb.getActionMapper();

        loadNewState('gamestate');

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
