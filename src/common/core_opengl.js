function core(gl, resolutionWidth, resolutionHeight) {
    'use strict';

    //var modules = [];
    //this.gl = null;

    //var camera = null;
    //var shaderManager = null;
    //var text = null;
    //var loader = null;

    //this.topics = {};

    // An topic identifier
    //this.subUid = -1;

    var entityManagerModule;

    var entityCreatorModule;

    var assetManagerModule;

    var actionMapperModule;

    var cameraModule;

    var textModule;
    var shaderManagerModule;
    var audioModule;

    //var assetManager = null;
    //var entityManager = null;
    //var actionMapper = null;
    //this.map = null;

    //this.createModule(audio());

    //this.width = width;
    //this.height = height;

    //var canvas = this.find('canvas');
    //canvas.width = width;
    //canvas.height = height;

    //try {

    // this.gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));
    //this.gl = WebGLUtils.setupWebGL(canvas);

    // } catch (e) {

    //}
    //if (!this.gl) {
    //    alert('Could not initialise WebGL');
    //}

    //sm = shader_manager_constuctor(gl);

//}
    /*
     Core.prototype.createModule = function(func) {
     'use strict';

     this.modules.push(func);
     };
     */

    var startModules = function(callback) {

        if (typeof entityCreatorModule === 'undefined' ||
            typeof entityCreatorModule === 'undefined' ||
            typeof assetManagerModule === 'undefined' ||
            typeof actionMapperModule === 'undefined' ||
            typeof cameraModule === 'undefined' ||
            typeof textModule === 'undefined' ||
            typeof shaderManagerModule === 'undefined' ||
            typeof audioModule === 'undefined'
        ) {
            alert('Core modules missing!');
        }

        entityManagerModule.init();
        entityCreatorModule.init();
        assetManagerModule.init();
        actionMapperModule.init();
        cameraModule.init();
        textModule.init();
        shaderManagerModule.init();
        audioModule.init();

        callback();
    };

//Core.prototype.startSandbox = function() {
    // 'use strict';
//    for (var i = 0; i < this.modules.length; i++) {
    //       this.modules[i].start();
//    }

//};
    /*
     Core.prototype.initModules = function() {
     'use strict';
     //TODO: REFACTOR
     this.actionMapper = this.modules[0];
     this.entityManager = this.modules[1];
     this.assetManager = this.modules[2];

     this.camera = this.modules[3];
     this.sm = this.modules[4];
     this.text = this.modules[5];
     this.entityCreator = this.modules[6];
     this.stateEngine = this.modules[7];
     //this.map = this.modules[8];

     };

     Core.prototype.find = function(elem) {
     'use strict';
     return document.getElementById(elem);
     };
     */
//Core.prototype.getModule = function(index) {
    //   'use strict';
//    return this.modules[index];
//};

//Core.prototype.startGame = function() {
//    'use strict';
//    this.stateEngine.startState();
//};

    /*

     // modules.push(loader());
     CORE.setShaderManager(shaderManager(gl));


     Core.prototype.getStateEngine = function() {
     'use strict';
     return this.stateEngine;
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

     Core.prototype.getLoader = function() {
     'use strict';
     return this.loader;
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
     */

    return {
        setEntityManagerModule: function(v) {
            entityManagerModule = v;
        },

        setEntityCreatorModule: function(v) {
            entityCreatorModule = v;
        },
        setAssetManagerModule: function(v) {
            assetManagerModule = v;
        },
        setActionMapperModule: function(v) {
            actionMapperModule = v;
        },
        setCameraModule: function(v) {
            cameraModule = v;
        },
        setTextModule: function(v) {
            textModule = v;
        },
        setShaderManagerModule: function(v) {
            shaderManagerModule = v;
        },
        setAudioModule: function(v) {
            audioModule = v;
        },
        startModules,
        getGL: function() {
            return gl;
        },
        getCamera: function() {
            return cameraModule;
        },
        getEntityManager: function() {
            return entityManagerModule;
        },
        getEntityCreator: function() {
            return entityCreatorModule;
        },
        getShaderManager: function() {
            return shaderManagerModule;
        },
        getAssetManager: function() {
            return assetManagerModule;
        },
        getResolutionWidth: function() {
            return resolutionWidth;
        },
        getResolutionHeight: function() {
            return resolutionHeight;
        },
        getText: function() {
            return textModule;
        },
        getActionMapper: function() {
            return actionMapperModule;
        },
        getAudio: function() {
            return audioModule;
        },
        setAudioMasterVolume: function(percent) {

            audioModule.setMasterVolume(percent);
        }
        /*
         ,
         geetEntityManagerModule(entityManager());
         CORE.setEntityCreatorModule(entityCreator());
         CORE.setAssetManagerModule(assetManager());
         CORE.setActionMapperModule(actionMapper(pubsub));
         CORE.setCameraModule(camera(w,h));
         CORE.setTextModule(text(w,h));
         */

    };
}








