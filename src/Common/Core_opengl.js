class Core {
    constructor(width, height) {
        this.modules = [];
        this.gl = null;

        this.camera = null;
        this.sm = null;
        this.text = null;

        this.topics = {};


        // An topic identifier
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

        let canvas = this.find('canvas');
        canvas.width = width;
        canvas.height = height;


        try {

            this.gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));

            this.gl.viewportWidth = canvas.width;
            this.gl.viewportHeight = canvas.height;
        } catch (e) {

        }
        if (!this.gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }

        //sm = shader_manager_constuctor(gl);


    }

    create_module(func) {

        this.modules.push(func);
    }


    start_modules() {

        /*
         for (let i = 0; i < modules.length; i++) {
         modules[i].subscribe();
         }
         */
        for (let i = 0; i < this.modules.length; i++) {
            this.modules[i].init(sandbox_constructor(this));
        }

        this.initModules();

        this.startSandbox();


    }

    startSandbox() {
        for (let i = 0; i < this.modules.length; i++) {

            this.modules[i].start();
        }

    }


    initModules() {


        this.assetManager = this.modules[2];
        this.entityManager = this.modules[1];
        this.actionMapper = this.modules[0];
        this.camera = this.modules[4];
        this.text = text_constructor();
        this.text.init();

        this.sm = this.modules[5];
        this.stateEngine = this.modules[8];

    }


    find(elem) {
        return document.getElementById(elem);
    }

    getModule(index) {
        return this.modules[index];
    }

    start_game() {
        this.stateEngine.startState();
    }


    getShaderManager() {
        return this.sm;
    }

    getCamera() {
        return this.camera;
    }

    getCurrentlyPressedKeys() {
        return this.camera;
    }

    getAssetManager() {
        return this.assetManager;
    }

    getEntityManager() {
        //console.log('a',entityManager);
        return this.entityManager;
    }



    getActionMapper() {
        return this.actionMapper;
    }

    getGL() {
        return this.gl;
    }

    getText() {
        return this.text;
    }

    getResolutionWidth() {
        return this.width;
    }

    getResolutionHeight() {
        return this.height;
    }


    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    publish(topic, args) {

        if (!this.topics[topic]) {
            return false;
        }

        let subscribers = this.topics[topic],
            len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }

        //return this;
    }

    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    subscribe(topic, func) {


        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        let token = ( ++this.subUid ).toString();
        this.topics[topic].push({
            token: token,
            func: func
        });
        return token;
    }

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    unsubscribe(token) {

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
    }

;


}