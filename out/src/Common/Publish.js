var Publish = function Publish() {
  "use strict";
  this.topics = {};
  this.subUid = -1;
};
($traceurRuntime.createClass)(Publish, {
  publish: function(topic, args) {
    "use strict";
    if (!this.topics[$traceurRuntime.toProperty(topic)]) {
      return false;
    }
    var subscribers = this.topics[$traceurRuntime.toProperty(topic)],
        len = subscribers ? subscribers.length : 0;
    while (len--) {
      subscribers[$traceurRuntime.toProperty(len)].func(topic, args);
    }
    return this;
  },
  subscribe: function(topic, func) {
    "use strict";
    if (!this.topics[$traceurRuntime.toProperty(topic)]) {
      $traceurRuntime.setProperty(this.topics, topic, []);
    }
    var token = (++this.subUid).toString();
    this.topics[$traceurRuntime.toProperty(topic)].push({
      token: token,
      func: func
    });
    return token;
  },
  unsubscribe: function(token) {
    "use strict";
    for (var m in topics) {
      if (this.topics[$traceurRuntime.toProperty(m)]) {
        for (var i = 0,
            j = this.topics[$traceurRuntime.toProperty(m)].length; i < j; i++) {
          if (this.topics[$traceurRuntime.toProperty(m)][$traceurRuntime.toProperty(i)].token === token) {
            this.topics[$traceurRuntime.toProperty(m)].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  }
}, {});
