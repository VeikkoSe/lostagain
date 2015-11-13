function camera(resolutionWidth, resolutionHeight, helpers) {
    'use strict';

    var mvMatrix, pMatrix, cMatrix, pvMatrix,
        pvMatrixInverse, mvMatrixStack, drawCalls,
        distance, x, y, z, rotationX, rotationY,
        slideLeft, slideRight,
        slideUp, slideDown, centerPosition,
        home, pitch, mindistance, maxdistance;

    var init = function() {

        mvMatrix = mat4.create();
        pMatrix = mat4.create();
        cMatrix = mat4.create();

        pvMatrix = mat4.create();
        pvMatrixInverse = mat4.create();
        mindistance = 40;
        maxdistance = 200;
        distance = 120;
        pitch = 1.3;

        //mat4.identity(mvMatrix);

        x = 0;
        z = 70;
        y = Math.tan(pitch) * z;

        home = [x, y, z];

        //mat4.translate(mvMatrix, home);

        //Initialize Camera matrix as the inverse of the Model-View Matrix
        //mat4.identity(cMatrix);
        //mat4.inverse(mvMatrix, cMatrix);

        //Initialize Perspective matrix
        mat4.identity(pMatrix);
        drawCalls = 0;

        mvMatrixStack = [];
        //eye = vec3.create([0, 0, 0]);  // negation of actual eye position
        //var clickPosition = null;

        //initial pos

        rotationY = 0;

        slideLeft = false;
        slideRight = false;
        slideUp = false;
        slideDown = false;

        //this.rotation = 0;
        centerPosition = false;

        //mat4.lookAt([x,y,z],[0,0,0],[0,1,0],mvMatrix);

    };

    var setDistance = function(d) {
        if (d.charAt(0) === '-') {
            if (distance <= mindistance) {
                distance = mindistance;
                return;
            }
            distance -= parseInt(d.substring(1), 10);
        }
        else {
            if (distance >= maxdistance) {
                distance = maxdistance;
                return;
            }
            distance += parseInt(d, 10);
        }

    };

    var setXRotation = function(rot) {

        rotationX = rot;
    };

    var setYRotation = function(rot) {

        if (rot.charAt(0) === '-') {
            rotationY -= parseInt(rot.substring(1), 10);
        }
        else {
            rotationY += parseInt(rot, 10);
        }
    };
    var getYRotation = function() {
        return rotationY;
    };

    var setPos = function(xp, yp, zp) {
        if (xp) {
            if (xp.charAt(0) === '-') {
                x = parseInt(xp.substring(1), 10);
            }
            else {
                x = parseInt(xp, 10);
            }
        }
        if (yp) {
            if (yp.charAt(0) === '-') {
                y = parseInt(yp.substring(1), 10);
            }
            else {
                y = parseInt(yp, 10);
            }
        }
        if (zp) {
            if (zp.charAt(0) === '-') {
                z = parseInt(zp.substring(1), 10);
            }
            else {
                z = parseInt(zp, 10);
            }
        }
        //rotation = rot;
        //distance = z;
    };

    var setPerspective = function() {
        mat4.perspective(60, resolutionWidth / resolutionHeight, 0.1, 20000.0, pMatrix);
    };

    var lookAt = function(epos, direction) {
        mat4.lookAt([x, y, z], epos, direction, mvMatrix);
    };
    var move = function() {

        // mat4.identity(mvMatrix);
        //orbit camera rotate before translate
        //tracking camera translate before rotate
        // mat4.rotate(mvMatrix, rotationX, [1, 0, 0]);
        // mat4.rotate(mvMatrix, rotationY, [0, 1, 0]);
        //mat4.translate(mvMatrix, [x, y, z]);
        //mat4.lookAt([0,30,-30],[0,0,0],[0,1,0],mvMatrix);
        //mat4.rotate(mvMatrix, rotationY, [0, 1, 0]);

    };

    var mvPushMatrix = function() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    };

    var mvPopMatrix = function() {
        if (mvMatrixStack.length === 0) {
            throw 'Invalid popMatrix!';
        }
        mvMatrix = mvMatrixStack.pop();
    };

    var subscribe = function() {

    };

    var addDrawCall = function() {
        drawCalls++;
    };
    var resetDrawCalls = function() {
        drawCalls = 0;
    };
    var getDrawCalls = function() {
        return drawCalls;

    };

    return Object.freeze({
        mvPopMatrix,
        mvPushMatrix,
        setPerspective,
        setDistance,
        lookAt,
        init,
        setXRotation,
        setYRotation,
        getYRotation,
        getMVMatrix: function() {
            return mvMatrix;
        },
        getPMatrix: function() {
            return pMatrix;
        },
        move,
        getXPos: function() {
            return x;
        },
        getYPos: function() {
            return y;
        },
        getZPos: function() {
            return z;
        },
        getMinDistance: function() {
            return mindistance;
        },

        setXPos: function(v) {
            x = v;
        },
        setYPos: function(v) {
            y = v;
        },
        setZPos: function(v) {
            z = v;
        },
        getPitch: function() {
            return pitch;
        },
        setPos,
        subscribe,

        getDistance: function() {
            return distance;
        },
        addDrawCall,
        getDrawCalls,
        resetDrawCalls

    });

}