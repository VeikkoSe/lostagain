function PubSub() {
    'use strict';

    this.subUid = -1;
    this.topics = {};
}
PubSub.prototype.getTopics = function() {
    'use strict';
    return this.topics;
};

// Publish or broadcast events of interest
// with a specific topic name and arguments
// such as the data to pass along
PubSub.prototype.publish = function(topic, args) {
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
PubSub.prototype.subscribe = function(topic, func) {
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
PubSub.prototype.unsubscribe = function(token) {
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