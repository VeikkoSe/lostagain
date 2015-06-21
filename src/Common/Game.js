function game_constuctor(sb) {
    //constructor(canvas) {
    let sb = sb;
    //resolutionWidth = 640;
    //resolutionHeight = 480;

    //canvas.width = resolutionWidth;
    //canvas.height = resolutionHeight;


    //let am = asset_manager_constructor();

    //let {initGL} = initGL(canvas);
    //let running = true;
    //let currentLevel = 1;
    //let debug = true;

    //let {sm} = shader_manager_constuctor();

    //let {em} = entity_manager_constructor();

    //let {camera} = camera_constructor();
    // let {ef} = entityfactory_constructor();
    // let {loadmanager} = loadmanager_constructor();
    // let {pub} = pub_constructor();

    // let {hexagon} = hexagon_constructor();


    //let stateengine = stateengine_constructor();


    //this.running = true;
    //this.currentLevel = null;
    /*

     this.sm           = new ShaderManager(this);
     this.em           = new EntityManager(this);
     this.mm           = new AssetManager(this);

     this.camera       = new Camera(this);
     this.ef           = new EntityFactory(this);




     this.loadManager  = new LoadManager(this);

     this.pub          = new Publish();

     this.stateEngine  = new StateEngine();

     this.map          = new Hexagon(4);


     this.debug = true;


     */
    /*
     this.pub.subscribe("gameover", function (val) {
     game.stateEngine.changeState("endstate");
     });


     this.stateEngine.changeState("introstate");
     */
    //this.tick();

    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        init
        //event,
        //em,
        //camera
    });


};


