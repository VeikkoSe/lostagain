function core(resolutionWidth, resolutionHeight) {
    'use strict';


    var entityManagerModule;

    var entityCreatorModule;

    var assetManagerModule;

    var actionMapperModule;

    var cameraModule;

    var textModule;
    var materialModule;
    var audioModule;

    var gl;

    var isInt = function(value) {
        var x = parseFloat(value);
        return !isNaN(value) && (x | 0) === x;
    };

    var init = function() {


            var canvas = document.getElementById('canvas');

            canvas.width = resolutionWidth;
            canvas.height = resolutionHeight;

            gl = WebGLDebugUtils.makeDebugContext(canvas.getContext('webgl', {alpha: false}));
            //gl = WebGLUtils.setupWebGL(canvas);


    };



    var startModules = function(callback) {




        if (typeof entityCreatorModule === 'undefined' ||
            typeof entityCreatorModule === 'undefined' ||
            typeof assetManagerModule === 'undefined' ||
            typeof actionMapperModule === 'undefined' ||
            typeof cameraModule === 'undefined' ||
            typeof textModule === 'undefined' ||
            typeof materialModule === 'undefined' ||
            typeof audioModule === 'undefined'
        ) {
            throw 'core: starting without mandatory modules';
        }

        entityManagerModule.init();
        entityCreatorModule.init();
        assetManagerModule.init();
        actionMapperModule.init();
        cameraModule.init();
        textModule.init();
        materialModule.init();
        audioModule.init();

        callback();
    };


    return {
        init,
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
        setMaterialModule: function(v) {
            materialModule = v;
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
        getMaterial: function() {
            return materialModule;
        },
        getAssetManager: function() {
            return assetManagerModule;
        },
        getResolutionWidth: function() {
            if(!isInt(resolutionWidth)) {
                throw Error('Core:Width is not a number');
            }

            return resolutionWidth;
        },
        getResolutionHeight: function() {
            if(!isInt(resolutionHeight)) {
                throw Error('Core:Height is not a number');
            }
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
        }


    };
}








