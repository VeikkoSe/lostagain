var StateEngine = function StateEngine() {
  "use strict";
  this.introState = new IntroState();
  this.endState = new EndState();
  this.menuState = new MenuState();
  this.loadState = new LoadState();
  this.gameState = new GameState();
  this.mapState = new MapState();
  this.running = true;
  this.states = [];
  this.currentState = null;
};
($traceurRuntime.createClass)(StateEngine, {
  init: function() {
    "use strict";
  },
  update: function() {
    "use strict";
  },
  cleanup: function() {
    "use strict";
    document.onkeydown = null;
    document.onkeyup = null;
  },
  determineState: function(stateStr) {
    "use strict";
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
  },
  changeState: function(stateStr) {
    "use strict";
    var state = this.determineState(stateStr);
    if (this.states.length > 0) {
      this.states[$traceurRuntime.toProperty(this.states.length - 1)].cleanup();
      this.states.pop();
    }
    this.states.push(state);
    this.currentState = state;
    this.states[$traceurRuntime.toProperty(this.states.length - 1)].init();
  },
  loadS: function(nextState) {
    "use strict";
    if (this.states.length > 0) {
      this.states[$traceurRuntime.toProperty(this.states.length - 1)].cleanup();
      this.states.pop();
    }
    this.states.push(this.loadState);
    this.currentState = this.loadState;
    this.states[$traceurRuntime.toProperty(this.states.length - 1)].init(nextState);
  },
  pushState: function(stateStr) {
    "use strict";
    var state = this.determineState(stateStr);
    if (this.states.length > 0) {
      this.states[$traceurRuntime.toProperty(this.states.length - 1)].pause();
    }
    this.states.push(state);
    this.states[$traceurRuntime.toProperty(this.states.length - 1)].init();
  },
  popState: function() {
    "use strict";
    if (this.states.length > 0) {
      this.states[$traceurRuntime.toProperty(this.states.length - 1)].cleanup();
      this.states.pop();
    }
    if (!this.states.empty()) {
      this.states[$traceurRuntime.toProperty(this.states.length - 1)].resume();
    }
  },
  handleEvents: function() {
    "use strict";
  },
  draw: function() {
    "use strict";
  }
}, {});
