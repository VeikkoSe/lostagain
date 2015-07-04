function camera_constructor() {

    let gl, mvMatrix, pMatrix, cMatrix, pvMatrix, pvMatrixInverse, mvMatrixStack, drawCalls, eye, distance, x, y, z;
    let rotationX,rotationY, slideLeft, slideRight, slideUp, slideDown, centerPosition, home, sb;


    let init = function (sandbox) {

        sb = sandbox;

        mvMatrix = mat4.create();
        pMatrix = mat4.create();
        cMatrix = mat4.create();

        pvMatrix = mat4.create();
        pvMatrixInverse = mat4.create();


        mat4.identity(mvMatrix);

        home = [x, y, z];

        mat4.translate(mvMatrix, home);

        //Initialize Camera matrix as the inverse of the Model-View Matrix
        mat4.identity(cMatrix);
        mat4.inverse(mvMatrix, cMatrix);

        //Initialize Perspective matrix
        mat4.identity(pMatrix);
        drawCalls = 0;

        mvMatrixStack = [];
        eye = vec3.create([0, 0, 0]);  // negation of actual eye position
        //let clickPosition = null;

        distance = 500;

        //initial pos
        x = 0;
        y = -1 * distance;
        z = -1 * distance;


        rotationX = degToRad(60);
        rotationY =0;

        slideLeft = false;
        slideRight = false;
        slideUp = false;
        slideDown = false;

        //this.rotation = 0;
        centerPosition = false;


    };

    let start = function () {
        gl = sb.getGL();
    }


    let setDistance = function (d) {
        distance = d;

        //this.x = 0;
        y = -1 * distance;
        z = -1 * distance;

    }

    let setXRotation = function (rot) {

        rotationX = rot;
    }


    let setYRotation = function (rot) {

        if(rot.charAt(0)==='-') {
            rotationY -= degToRad(parseInt(rot.substring(1),10));
        }
        else rotationY += degToRad(parseInt(rot,10));
    }

    let setPos = function (xp=false, yp=false, zp=false) {
        if(xp) {
            if(xp.charAt(0)==='-') {
        x -= parseInt(xp.substring(1),10);
            }
                else {
                x += parseInt(xp,10);
            }
        }
        if(yp) {
            if(yp.charAt(0)==='-') {
        y -= parseInt(yp.substring(1),10);
            }
            else {
            y+=parseInt(yp,10);
            }
        }
        if(zp) {
            if(zp.charAt(0)==='-') {
        z -=parseInt(zp.substring(1),10);
            }
            else {
            z+=parseInt(zp,10);
            }
        }
        //rotation = rot;
        //distance = z;
    };


    let setPerspective = function () {
        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 20000.0, pMatrix);
    };
    /*
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
     */

    let move = function () {

        mat4.identity(mvMatrix);
        //orbit camera rotate before translate
        //tracking camera translate before rotate
        mat4.rotate(mvMatrix, rotationX, [1, 0, 0]);

        mat4.translate(mvMatrix, [x, y, z]);
        mat4.rotate(mvMatrix, rotationY, [0, 1, 0]);

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
        setXRotation,
        setYRotation,
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
        setPos,
        subscribe,
        start


    });

}