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

    this.create_module(action_mapper()); //0
    this.create_module(entity_manager_constructor());//1
    this.create_module(asset_manager_constructor());//2
    this.create_module(loader_costructor());//3
    this.create_module(camera_constructor());//4
    this.create_module(shader_manager_constuctor());//5
    this.create_module(layout_constructor());//6
    this.create_module(text_constructor());//7
    this.create_module(entity_creator_constructor());//9

    this.create_module(stateengine_constructor());//8


    this.width = width;
    this.height = height;

    var canvas = this.find('canvas');
    canvas.width = width;
    canvas.height = height;

    try {

        this.gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));

        this.gl.viewportWidth = canvas.width;
        this.gl.viewportHeight = canvas.height;
    } catch (e) {

    }
    if (!this.gl) {
        alert('Could not initialise WebGL');
    }

    //sm = shader_manager_constuctor(gl);

}

Core.prototype.create_module = function(func) {
    'use strict';

    this.modules.push(func);
};

Core.prototype.start_modules = function() {
    'use strict';

    /*
     for (var i = 0; i < modules.length; i++) {
     modules[i].subscribe();
     }
     */
    for (var i = 0; i < this.modules.length; i++) {
        console.log('d'+i);
        this.modules[i].init(sandbox_constructor(this));
    }

    this.initModules();

    this.startSandbox();

};

Core.prototype.startSandbox = function() {
    'use strict';
    for (var i = 0; i < this.modules.length; i++) {
        console.log(i);
        this.modules[i].start();
    }

};

Core.prototype.initModules = function() {



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
    return document.getElementById(elem);
};

Core.prototype.getModule = function(index) {
    return this.modules[index];
};

Core.prototype.start_game = function() {
    this.stateEngine.startState();
};

Core.prototype.getShaderManager = function() {
    return this.sm;
};

Core.prototype.getEntityCreator = function() {
    return this.entityCreator;
}


Core.prototype.getCamera = function() {
    return this.camera;
};

Core.prototype.getCurrentlyPressedKeys = function() {
    return this.camera;
};

Core.prototype.getAssetManager = function() {
    return this.assetManager;
};

Core.prototype.getEntityManager = function() {
    return this.entityManager;
};

Core.prototype.getActionMapper = function() {
    return this.actionMapper;
};

Core.prototype.getGL = function() {
    return this.gl;
};

Core.prototype.getText = function() {
    return this.text;
};

Core.prototype.getResolutionWidth = function() {
    return this.width;
};

Core.prototype.getResolutionHeight = function() {
    return this.height;
};

// Publish or broadcast events of interest
// with a specific topic name and arguments
// such as the data to pass along
Core.prototype.publish = function(topic, args) {

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

    for (var m in topics) {
        if (topics[m]) {
            for (var i = 0, j = topics[m].length; i < j; i++) {
                if (topics[m][i].token === token) {
                    topics[m].splice(i, 1);
                    return token;
                }
            }
        }
    }
    //return this;
};




