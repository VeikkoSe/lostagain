function core_opengl_constructor() {
  var modules = [];
  var gl;
  var em = entity_manager_constructor();
  var am = asset_manager_constructor();
  var camera;
  var sm;
  var text;
  var canvas;
  var create_module = function(name, func) {
    modules.push(func);
  };
  var start_all = function() {
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < modules.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  modules[$traceurRuntime.toProperty(i)].subscribe();
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < modules.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  modules[$traceurRuntime.toProperty(i)].init();
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
  };
  var find = function(elem) {
    return document.getElementById(elem);
  };
  var init = function(params) {
    var $__0 = $traceurRuntime.assertObject(params),
        width = $__0.width,
        height = $__0.height;
    canvas = find('canvas');
    canvas.width = width;
    canvas.height = height;
    try {
      gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) {}
    if (!gl) {
      alert("Could not initialise WebGL, sorry :-(");
    }
    sm = shader_manager_constuctor(gl);
    camera = camera_constructor(gl);
    text = text_constructor();
    text.init();
  };
  return {
    create_module: create_module,
    start_all: start_all,
    find: find,
    init: init,
    getShaderManager: function() {
      return sm;
    },
    getCamera: function() {
      return camera;
    },
    getAssetManager: function() {
      return am;
    },
    getEntityManager: function() {
      return em;
    },
    getGL: function() {
      return gl;
    },
    getText: function() {
      return text;
    },
    getResolutionWidth: function() {
      return canvas.width;
    },
    getResolutionHeight: function() {
      return canvas.height;
    }
  };
}
