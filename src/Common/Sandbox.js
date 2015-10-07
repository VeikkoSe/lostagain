//http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
function sandbox_constructor(CORE) {
    'use strict';

    var core = CORE;
    // Storage for topics that can be broadcast
    // or listened to

    var publish = function(topic, args) {
        core.publish(topic, args);
    };

    var subscribe = function(topic, func) {
        core.subscribe(topic, func);
    };

    var unsubscribe = function(token) {
        core.unsubscribe(token);
    };

    var find = function(element) {
        return core.find(element);
    };

    return {
        unsubscribe,
        subscribe,
        publish,
        find,

        getGL: function() {
            return core.getGL();
        },
        getCamera: function() {
            return core.getCamera();
        },
        getEntityManager: function() {
            var cm = core.getEntityManager();

            return cm;
        },
        getAssetManager: function() {
            return core.getAssetManager();
        },
        getShaderManager: function() {

            return core.getShaderManager();
        },
        getText: function() {
            return core.getText();
        },

        getResolutionWidth: function() {
            return core.getResolutionWidth();
        },
        getResolutionHeight: function() {
            return core.getResolutionHeight();
        },

        getActionMapper: function() {
            return core.getActionMapper();
        },

        getCurrentlyPressedKeys: function() {
            return core.getCurrentlyPressedKeys();
        },
        getEntityCreator: function() {
        return core.getEntityCreator();
    }

    };
}