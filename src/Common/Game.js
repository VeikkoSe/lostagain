class Game {
    constructor(canvas) {

        this.running = true;
        this.currentLevel = null;
        this.stateEngine = null;


        this.camera = new Camera();
        this.stateEngine = new StateEngine();


        this.stateEngine.changeState("introstate");
        this.tick();

    }


    tick() {

        var that = this;
        requestAnimFrame(function () {
            that.tick()
        });

        this.stateEngine.currentState.update();

        this.stateEngine.currentState.draw();

    }


}