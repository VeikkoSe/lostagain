function sandbox_constructor(core) {
  var topics = {};
  var subUid = -1;
  var gl = null;
  var camera = null;
  var publish = function(topic, args) {
    if (!topics[$traceurRuntime.toProperty(topic)]) {
      return false;
    }
    var subscribers = topics[$traceurRuntime.toProperty(topic)],
        len = subscribers ? subscribers.length : 0;
    while (len--) {
      subscribers[$traceurRuntime.toProperty(len)].func(topic, args);
    }
  };
  var subscribe = function(topic, func) {
    if (!topics[$traceurRuntime.toProperty(topic)]) {
      $traceurRuntime.setProperty(topics, topic, []);
    }
    var token = (++subUid).toString();
    topics[$traceurRuntime.toProperty(topic)].push({
      token: token,
      func: func
    });
    return token;
  };
  var unsubscribe = function(token) {
    for (var $m in topics) {
      try {
        throw undefined;
      } catch (m) {
        {
          m = $m;
          if (topics[$traceurRuntime.toProperty(m)]) {
            {
              try {
                throw undefined;
              } catch ($j) {
                try {
                  throw undefined;
                } catch ($i) {
                  {
                    {
                      $i = 0;
                      $j = topics[$traceurRuntime.toProperty(m)].length;
                    }
                    for (; $i < $j; $i++) {
                      try {
                        throw undefined;
                      } catch (j) {
                        try {
                          throw undefined;
                        } catch (i) {
                          {
                            {
                              i = $i;
                              j = $j;
                            }
                            try {
                              if (topics[$traceurRuntime.toProperty(m)][$traceurRuntime.toProperty(i)].token === token) {
                                topics[$traceurRuntime.toProperty(m)].splice(i, 1);
                                return token;
                              }
                            } finally {
                              $i = i;
                              $j = j;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  var find = function(element) {
    return core.find(element);
  };
  var init = function() {};
  return Object.freeze({
    unsubscribe: unsubscribe,
    subscribe: subscribe,
    publish: publish,
    find: find,
    init: init,
    getGL: function() {
      return core.getGL();
    },
    getCamera: function() {
      return core.getCamera();
    },
    getEntityManager: function() {
      return core.getEntityManager();
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
    }
  });
}
