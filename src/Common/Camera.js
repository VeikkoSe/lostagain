class Camera {
    constructor() {


        this.drawCalls = 0;


        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.cMatrix = mat4.create();

        this.pvMatrix = mat4.create();
        this.pvMatrixInverse = mat4.create();

        this.mvMatrixStack = [];
        this.eye = vec3.create([0, 0, 0]);  // negation of actual eye position
        this.clickPosition = null;

        this.distance = 500;

        //initial pos
        this.x = 0;
        this.y = -1 * this.distance;
        this.z = -1 * this.distance;


        this.rotation = helpers.degToRad(60);


        this.slideLeft = false;
        this.slideRight = false;
        this.slideUp = false;
        this.slideDown = false;

        //this.rotation = 0;
        this.centerPosition = false;

        this.home = [this.x, this.y, this.z];

        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, this.home);

        //Initialize Camera matrix as the inverse of the Model-View Matrix
        mat4.identity(this.cMatrix);
        mat4.inverse(this.mvMatrix, this.cMatrix);

        //Initialize Perspective matrix
        mat4.identity(this.pMatrix);


    }

    setDistance(d) {
        this.distance = d;

        this.x = 0;
        this.y = -1 * this.distance;
        this.z = -1 * this.distance;

    }

    setRotation(rot) {

        this.rotation = rot;
    }

    setPos(x, y, z, rot) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rot;
        this.distance = z;
    }


    setPerspective() {
        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 20000.0, camera.pMatrix);
    }

    slideCameraLeft(xAddition) {
        this.x += xAddition;
    }

    slideCameraRight(xDecrease) {
        this.x -= xDecrease;
    }

    slideCameraUp(zAddition) {
        this.z += zAddition;

    }

    slideCameraDown(zDecrease) {
        this.z -= zDecrease;

    }


    move() {

        mat4.identity(camera.mvMatrix);
        //orbit camera rotate before translate
        //tracking camera translate before rotate
        mat4.rotate(this.mvMatrix, this.rotation, [1, 0, 0]);
        mat4.translate(this.mvMatrix, [this.x, this.y, this.z]);

    }


    mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(this.mvMatrix, copy);
        this.mvMatrixStack.push(copy);
    }


    mvPopMatrix() {
        if (this.mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        this.mvMatrix = this.mvMatrixStack.pop();
    }


}