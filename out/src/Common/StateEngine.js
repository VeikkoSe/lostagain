function stateengine_constructor() {
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
  var subscribe = function() {};
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
  return Object.freeze({
    tick: tick,
    init: init,
    subscribe: subscribe,
    start: start,
    startState: startState
  });
}
