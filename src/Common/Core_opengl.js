function core_opengl_constructor() {
    let modules = [];
    let gl;
    let em = entity_manager_constructor();
    let am = asset_manager_constructor();
    let camera;
    let sm;
    let text;
    let canvas;


    let create_module = function (name, func) {
        modules.push(func);
    }
    let start_all = function () {

        for (let i = 0; i < modules.length; i++) {
            modules[i].subscribe();
        }

        for (let i = 0; i < modules.length; i++) {
            modules[i].init();
        }
    }
    let find = function (elem) {
        return document.getElementById(elem);
    }
    let init = function (params) {
        let {width,height} = params;

        canvas = find('canvas');
        canvas.width = width;
        canvas.height = height;
        //console.log(canvas);
        try {


            gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));
//
            //          else {
            //            gl = canvas.getContext("webgl");
            //      }

            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {

        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }

        sm = shader_manager_constuctor(gl);
        camera = camera_constructor(gl);

        text = text_constructor();
        text.init();


    }


    return {

        create_module,
        start_all,
        find,
        init,
        getShaderManager: function () {
            return sm;
        },
        getCamera: function () {
            return camera;
        },
        getAssetManager: function () {
            return am;
        },
        getEntityManager: function () {
            return em;
        },
        getGL: function () {
            return gl;
        },
        getText: function () {
            return text;
        },

        getResolutionWidth: function () {
            return canvas.width;
        },

        getResolutionHeight: function () {
            return canvas.height;
        }

    }

}