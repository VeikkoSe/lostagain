var Core = function Core(width, height) {
  "use strict";
  this.modules = [];
  this.gl = null;
  this.camera = null;
  this.sm = null;
  this.text = null;
  this.topics = {};
  this.subUid = -1;
  this.assetManager = null;
  this.entityManager = null;
  this.actionMapper = null;
  this.create_module(action_mapper());
  this.create_module(entity_manager_constructor());
  this.create_module(asset_manager_constructor());
  this.create_module(loader_costructor());
  this.create_module(camera_constructor());
  this.create_module(shader_manager_constuctor());
  this.create_module(layout_constructor());
  this.create_module(text_constructor());
  this.create_module(stateengine_constructor());
  this.width = width;
  this.height = height;
  var canvas = this.find('canvas');
  canvas.width = width;
  canvas.height = height;
  try {
    this.gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));
    this.gl.viewportWidth = canvas.width;
    this.gl.viewportHeight = canvas.height;
  } catch (e) {}
  if (!this.gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
};
($traceurRuntime.createClass)(Core, {
  create_module: function(func) {
    "use strict";
    this.modules.push(func);
  },
  start_modules: function() {
    "use strict";
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < this.modules.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  this.modules[$traceurRuntime.toProperty(i)].init(sandbox_constructor(this));
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    this.initModules();
    this.startSandbox();
  },
  startSandbox: function() {
    "use strict";
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < this.modules.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  this.modules[$traceurRuntime.toProperty(i)].start();
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
  },
  initModules: function() {
    "use strict";
    this.assetManager = this.modules[2];
    this.entityManager = this.modules[1];
    this.actionMapper = this.modules[0];
    this.camera = this.modules[4];
    this.text = text_constructor();
    this.text.init();
    this.sm = this.modules[5];
    this.stateEngine = this.modules[8];
  },
  find: function(elem) {
    "use strict";
    return document.getElementById(elem);
  },
  getModule: function(index) {
    "use strict";
    return this.modules[$traceurRuntime.toProperty(index)];
  },
  start_game: function() {
    "use strict";
    this.stateEngine.startState();
  },
  getShaderManager: function() {
    "use strict";
    return this.sm;
  },
  getCamera: function() {
    "use strict";
    return this.camera;
  },
  getCurrentlyPressedKeys: function() {
    "use strict";
    return this.camera;
  },
  getAssetManager: function() {
    "use strict";
    return this.assetManager;
  },
  getEntityManager: function() {
    "use strict";
    return this.entityManager;
  },
  getActionMapper: function() {
    "use strict";
    return this.actionMapper;
  },
  getGL: function() {
    "use strict";
    return this.gl;
  },
  getText: function() {
    "use strict";
    return this.text;
  },
  getResolutionWidth: function() {
    "use strict";
    return this.width;
  },
  getResolutionHeight: function() {
    "use strict";
    return this.height;
  },
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
  }
}, {});
