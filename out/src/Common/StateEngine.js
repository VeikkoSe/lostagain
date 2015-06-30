function stateengine_constructor(sb) {
  var introState = introstate_constructor(sb);
  var gameState = gamestate_constructor(sb);
  var lState = loadstate_constructor(sb);
  var mapState = mapstate_constructor(sb);
  var menuState = menustate_constructor(sb);
  var endState = endstate_constructor(sb);
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
  };
  var moveToLoadedStage = function(stateStr) {
    var state = getState(stateStr);
    if (states.length > 0) {
      states[$traceurRuntime.toProperty(states.length - 1)].cleanup();
      states.pop();
    }
    states.push(state);
    currentState = state;
    states[$traceurRuntime.toProperty(states.length - 1)].init();
  };
  var loadState = function(wantedState) {
    if (states.length > 0) {
      states[$traceurRuntime.toProperty(states.length - 1)].cleanup();
      states.pop();
    }
    var ls = getState('loadstate');
    states.push(ls);
    currentState = ls;
    states[$traceurRuntime.toProperty(states.length - 1)].init(wantedState);
  };
  var getCurrentState = function() {
    return currentState;
  };
  var tick = function() {
    requestAnimFrame(function() {
      tick();
    });
    var cs = getCurrentState();
    cs.update();
    cs.draw();
  };
  var subscribe = function() {
    introState.subscribe();
    lState.subscribe();
    gameState.subscribe();
    sb.subscribe("movetoloadstate", function(name, wantedstate) {
      moveToLoadedStage(wantedstate);
    });
    sb.subscribe("loadstate", function(name, wantedstate) {
      loadState(wantedstate);
    });
  };
  var init = function() {
    loadState('gamestate');
    tick();
  };
  return Object.freeze({
    tick: tick,
    init: init,
    subscribe: subscribe
  });
}
