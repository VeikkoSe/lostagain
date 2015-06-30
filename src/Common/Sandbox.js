//http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
function sandbox_constructor(core) {


    // Storage for topics that can be broadcast
    // or listened to
    let topics = {};

    // An topic identifier
    let subUid = -1;
    let gl = null;
    let camera = null;


    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    let publish = function (topic, args) {

        if (!topics[topic]) {
            return false;
        }

        let subscribers = topics[topic],
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
    let subscribe = function (topic, func) {


        if (!topics[topic]) {
            topics[topic] = [];
        }

        let token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    let unsubscribe = function (token) {

        for (let m in topics) {
            if (topics[m]) {
                for (let i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        //return this;
    };


    let find = function (element) {
        return core.find(element);
    };

    let init = function () {


    };

    return Object.freeze({
        unsubscribe,
        subscribe,
        publish,
        find,
        init,
        getGL: function () {
            return core.getGL();
        },
        getCamera: function () {
            return core.getCamera();
        },
        getEntityManager: function () {
            return core.getEntityManager();
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
        }


    });
}