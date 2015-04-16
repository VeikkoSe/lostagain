var StateEngine = function StateEngine() {
  "use strict";
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
  getState: function(sn) {
    "use strict";
    if (this.allStates[$traceurRuntime.toProperty(sn)]) {
      return this.allStates[$traceurRuntime.toProperty(sn)];
    }
    switch (sn) {
      case 'introstate':
        $traceurRuntime.setProperty(this.allStates, sn, new IntroState());
        break;
      case 'gamestate':
        $traceurRuntime.setProperty(this.allStates, sn, new GameState());
        break;
      case 'menustate':
        $traceurRuntime.setProperty(this.allStates, sn, new MenuState());
        break;
      case 'endstate':
        $traceurRuntime.setProperty(this.allStates, sn, new EndState());
        break;
      case 'mapstate':
        $traceurRuntime.setProperty(this.allStates, sn, new MapState());
        break;
      case 'loadstate':
        $traceurRuntime.setProperty(this.allStates, sn, new LoadState());
        break;
    }
    return this.allStates[$traceurRuntime.toProperty(sn)];
  },
  changeState: function(stateStr) {
    "use strict";
    var state = this.getState(stateStr);
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
    var ls = this.getState('loadstate');
    this.states.push(ls);
    this.currentState = ls;
    this.states[$traceurRuntime.toProperty(this.states.length - 1)].init(nextState);
  },
  pushState: function(stateStr) {
    "use strict";
    var state = this.getState(stateStr);
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
