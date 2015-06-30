function camera_constructor(gl) {
    // constructor() {

    //let gl = sb.getGl();
    let drawCalls = 0;


    let mvMatrix = mat4.create();
    let pMatrix = mat4.create();
    let cMatrix = mat4.create();

    let pvMatrix = mat4.create();
    let pvMatrixInverse = mat4.create();

    let mvMatrixStack = [];
    let eye = vec3.create([0, 0, 0]);  // negation of actual eye position
    //let clickPosition = null;

    let distance = 500;

    //initial pos
    let x = 0;
    let y = -1 * distance;
    let z = -1 * distance;


    let rotation = degToRad(60);


    let slideLeft = false;
    let slideRight = false;
    let slideUp = false;
    let slideDown = false;

    //this.rotation = 0;
    let centerPosition = false;

    let home = [x, y, z];

    let init = function () {
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, home);

        //Initialize Camera matrix as the inverse of the Model-View Matrix
        mat4.identity(cMatrix);
        mat4.inverse(mvMatrix, cMatrix);

        //Initialize Perspective matrix
        mat4.identity(pMatrix);

    };


    let setDistance = function (d) {
        distance = d;

        //this.x = 0;
        y = -1 * distance;
        z = -1 * distance;

    }

    let setRotation = function (rot) {

        rotation = rot;
    }

    let setPos = function (xp, yp, zp, rot) {
        x = xp;
        y = yp;
        z = zp;
        rotation = rot;
        distance = z;
    };


    let setPerspective = function () {
        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 20000.0, pMatrix);
    };

    let slideCameraLeft = function (xAddition) {
        x += xAddition;
    };

    let slideCameraRight = function (xDecrease) {
        x -= xDecrease;
    };

    let slideCameraUp = function (zAddition) {
        z += zAddition;

    };

    let slideCameraDown = function (zDecrease) {
        z -= zDecrease;

    };


    let move = function () {

        mat4.identity(mvMatrix);
        //orbit camera rotate before translate
        //tracking camera translate before rotate
        mat4.rotate(mvMatrix, rotation, [1, 0, 0]);
        mat4.translate(mvMatrix, [x, y, z]);

    };

    let getMVMatrix = function () {
        return mvMatrix;
    };

    let getPMatrix = function () {
        return pMatrix;
    };

    let mvPushMatrix = function () {
        let copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    };


    let mvPopMatrix = function () {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    };

    let subscribe = function () {

    }

    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        mvPopMatrix,
        mvPushMatrix,
        setPerspective,
        setDistance,
        init,


        getMVMatrix,
        getPMatrix,
        move,
        getX: function () {
            return x
        },
        getY: function () {
            return y
        },
        getZ: function () {
            return z
        },
        init: function () {
        },
        subscribe


    });

}