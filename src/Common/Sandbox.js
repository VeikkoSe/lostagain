//http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
function sandbox_constructor(CORE) {

    let core = CORE;
    // Storage for topics that can be broadcast
    // or listened to


    let publish = function (topic, args) {
        core.publish(topic, args);
    }

    let subscribe = function (topic, func) {
        core.subscribe(topic, func);
    }

    let unsubscribe = function (token) {
        core.unsubscribe(token);
    }


    let find = function (element) {
        return core.find(element);
    };


    return {
        unsubscribe,
        subscribe,
        publish,
        find,

        getGL: function () {
            return core.getGL();
        },
        getCamera: function () {
            return core.getCamera();
        },
        getEntityManager: function () {
            let cm = core.getEntityManager();

            return cm;
        },
        getAssetManager: function () {
            return core.getAssetManager();
        },
        getShaderManager: function () {

            return core.getShaderManager();
        },
        getText: function () {
            return core.getText();
        },

        getResolutionWidth: function () {
            return core.getResolutionWidth();
        },
        getResolutionHeight: function () {
            return core.getResolutionHeight();
        },

        getActionMapper: function () {
            return core.getActionMapper();
        },


        getCurrentlyPressedKeys: function () {
            return core.getCurrentlyPressedKeys();
        }


    };
}