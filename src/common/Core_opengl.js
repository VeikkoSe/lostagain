function Core(width, height) {
    'use strict';

    this.modules = [];
    this.gl = null;

    this.camera = null;
    this.sm = null;
    this.text = null;

    this.topics = {};

    // An topic identifier
    this.subUid = -1;

    this.assetManager = null;
    this.entityManager = null;
    this.actionMapper = null;

    this.createModule(actionMapper());
    this.createModule(entityManager());
    this.createModule(assetManager());
    this.createModule(loader());
    this.createModule(camera());
    this.createModule(shaderManager());
    this.createModule(layout());
    this.createModule(text());
    this.createModule(entityCreator());
    this.createModule(stateEngine());

    this.width = width;
    this.height = height;

    var canvas = this.find('canvas');
    canvas.width = width;
    canvas.height = height;

    try {

        //this.gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));
        this.gl = WebGLUtils.setupWebGL(canvas);

    } catch (e) {

    }
    if (!this.gl) {
        alert('Could not initialise WebGL');
    }

    //sm = shader_manager_constuctor(gl);

}

Core.prototype.createModule = function(func) {
    'use strict';

    this.modules.push(func);
};

Core.prototype.startModules = function() {
    'use strict';

    /*
     for (var i = 0; i < modules.length; i++) {
     modules[i].subscribe();
     }
     */
    for (var i = 0; i < this.modules.length; i++) {
        this.modules[i].init(sandbox(this));
    }

    this.initModules();

    this.startSandbox();

};

Core.prototype.startSandbox = function() {
    'use strict';
    for (var i = 0; i < this.modules.length; i++) {
        this.modules[i].start();
    }

};

Core.prototype.initModules = function() {
    'use strict';

    this.actionMapper = this.modules[0];
    this.entityManager = this.modules[1];
    this.assetManager = this.modules[2];
    this.camera = this.modules[4];
    this.sm = this.modules[5];
    this.text = this.modules[7];
    this.stateEngine = this.modules[9];
    this.entityCreator = this.modules[8];

};

Core.prototype.find = function(elem) {
    'use strict';
    return document.getElementById(elem);
};

Core.prototype.getModule = function(index) {
    'use strict';
    return this.modules[index];
};

Core.prototype.startGame = function() {
    'use strict';
    this.stateEngine.startState();
};

Core.prototype.getShaderManager = function() {
    'use strict';
    return this.sm;
};

Core.prototype.getEntityCreator = function() {
    'use strict';
    return this.entityCreator;
};

Core.prototype.getCamera = function() {
    'use strict';
    return this.camera;
};

Core.prototype.getCurrentlyPressedKeys = function() {
    'use strict';
    return this.camera;
};

Core.prototype.getAssetManager = function() {
    'use strict';
    return this.assetManager;
};

Core.prototype.getEntityManager = function() {
    'use strict';
    return this.entityManager;
};

Core.prototype.getActionMapper = function() {
    'use strict';
    return this.actionMapper;
};

Core.prototype.getGL = function() {
    'use strict';
    return this.gl;
};

Core.prototype.getText = function() {
    'use strict';
    return this.text;
};

Core.prototype.getResolutionWidth = function() {
    'use strict';
    return this.width;
};

Core.prototype.getResolutionHeight = function() {
    'use strict';
    return this.height;
};
Core.prototype.getTopics = function() {
    'use strict';
    return this.topics;
};

// Publish or broadcast events of interest
// with a specific topic name and arguments
// such as the data to pass along
Core.prototype.publish = function(topic, args) {
    'use strict';

    if (!this.topics[topic]) {
        return false;
    }

    var subscribers = this.topics[topic],
        len = subscribers ? subscribers.length : 0;

    while (len--) {
        subscribers[len].func(topic, args);
    }

    //return this;
};

// Subscribe to events of interest
// with a specific topic name and a
// callback function, to be executed
// when the topic/event is observed
Core.prototype.subscribe = function(topic, func) {
    'use strict';

    if (!this.topics[topic]) {
        this.topics[topic] = [];
    }

    var token = ( ++this.subUid ).toString();
    this.topics[topic].push({
        token: token,
        func: func
    });
    return token;
};

// Unsubscribe from a specific
// topic, based on a tokenized reference
// to the subscription
Core.prototype.unsubscribe = function(token) {
    'use strict';

    for (var m in this.topics) {
        if (this.topics[m]) {
            for (var i = 0, j = this.topics[m].length; i < j; i++) {
                if (this.topics[m][i].token === token) {
                    this.topics[m].splice(i, 1);
                    return token;
                }
            }
        }
    }
    //return this;
};




