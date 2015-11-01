function stateEngine(pubsub, possibleStates, loader) {
    'use strict';

    //var iState;
    //var gState;
    // var lState;
    //var lUpState;
    //var meState;
    //var eState;
    //var sb;
    var elapsedTotal = 0;
    var rotationAngle = 0;
    var lastTime;

    var states = [];
    //var allStates = [];
    var currentState = null;

    var cleanup = function() {

        // document.onkeydown = null;
        // document.onkeyup = null;
    };

    var getState = function(sn) {

        return possibleStates[sn];
        /* switch (sn) {
         case 'introstate':
         return iState;
         case 'gamestate':
         return gState;
         //case 'loadstate':
         //    return lState;
         case 'menustate':
         return meState;
         case 'endstate':
         return eState;
         case 'levelupstate':
         return lUpState;
         }
         */

    };

    var loadStage = function(stateStr) {

        var state = getState(stateStr);

        // cleanup the current state
        if (states.length > 0) {

            states[states.length - 1].cleanup();
            states.pop();
        }

        loader.loadAllAssets(stateStr);

        // store and init the new state
        states.push(state);
        currentState = state;

        states[states.length - 1].init();

    };

    //var loadNewState = function(wantedState) {

    //if (states.length > 0) {

    //   states[states.length - 1].cleanup();
    //   states.pop();
    //}

    // store and init the new state

    //var ls = getState('loadstate');
    //states.push(ls);
    //currentState = ls;
    //states[states.length - 1].init(wantedState);

    //};
    //var getCurrentState = function() {
    //    return currentState;
    //};

    var tick = function() {

        requestAnimFrame(function() {
            tick();
        });
        //var cs = getCurrentState();

        //if(loader.getLoading()!==false) {
        //    return;
        //}

        currentState.update();
        currentState.draw();

    };

    var init = function(sandbox) {

        //sb = sandbox;

        pubsub.subscribe('loadstage', function(name, wantedstate) {
            loadStage(wantedstate);
        });

        //loadStage('gamestate');
        loadStage('introstate');

        tick();

    };

    //var startState = function() {

    //sb.subscribe('movetoloadstate', function(name, wantedstate) {

    //    moveToLoadedStage(wantedstate);
    //});

    //};
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    return Object.freeze({
        tick,
        init,
        subscribe: function() {
        },

        loadStage

    });

}
