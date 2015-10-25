document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var w = 1024;
    var h = 768;
    var CORE = new Core(w, h);
    CORE.startModules();
    CORE.startGame();
});

function createHit(hc, sc) {
    'use strict';
    var timeNow = new Date().getTime();

    if (sc) {
        sc.setLastHit(timeNow);
        if (sc.getLastShieldAdded() === 0) {

            sc.setLastShieldAdded(timeNow); //TODO: Combine variables

        }
    }

    if (sc && sc.getAmount() > 0) {
        //we count from the first hit untill the shield has reset

        sc.setAmount(sc.getAmount() - 1);
    }
    else {
        hc.setAmount(hc.getAmount() - 1);
    }

    if (hc.getAmount() < 0) {
        hc.setAmount(0);
    }

}

function randomRangedInt() {
    'use strict';
    var rnd = getRandomInt(500, -500);
    if (rnd > 300 ||
        rnd < -300) {
        return rnd;
    }
    else {
        return randomRangedInt();
    }
}

function randomRangedIntFromPos(pos) {
    'use strict';
    var rnd = getRandomInt(800 + pos, -800 + pos);
    if (rnd > 600 + pos ||
        rnd < -600 + pos) {
        return rnd;
    }
    else
        return randomRangedIntFromPos(pos);
}

function randomCloseInt() {
    'use strict';
    return getRandomInt(30, -30);

};

function printMessage(msg) {
    'use strict';
    //$('#debugarea').html(msg);
}

function pInt(nro) {
    'use strict';
    return parseInt(nro, 10);
}

function randomIntFromInterval(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMousePos(canvas, evt) {
    'use strict';
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function isInCircle(centerX, centerY, radius, x, y) {
    'use strict';
    return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
}

function circleXY(x, y, z, radius, amount) {
    'use strict';
    var points = [];
    var stepSize = ((2 * Math.PI) / amount);
    var y = 0;
    for (var d = 0; d <= (2 * Math.PI) - stepSize; d += stepSize) {
        points.push(((Math.sin(d) * radius) + x), y, (Math.cos(d) * radius) + z);
    }
    return points;
}

function viewport() {
    'use strict';
    var e = window;
    var a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[a + 'Width'], height: e[a + 'Height']};
}

function intersectionpoint(A, B) {
    'use strict';
//http://stackoverflow.com/questions/2447361/3d-line-plane-intersection-with-simple-plane
    var r = -A[1] / B[1];

    var x = (r * B[0] + A[0]) / (r + 1);
    var z = (r * B[2] + A[2]) / (r + 1);

    return [x, 0, z];

}

function objectLabelGenerator() {
    'use strict';
    var color = [Math.random(), Math.random(), Math.random(), 1.0];
    var key = color[0] + ':' + color[1] + ':' + color[2];
    if (key in colorset) {
        return uniqueColorGenerator();
    }
    else {
        colorset[key] = true;
        return color;
    }
}

function degToRad(degrees) {
    'use strict';
    return degrees * Math.PI / 180;
}

function isClose(currentCoord, newCoord) {
    'use strict';
    if (currentCoord <= newCoord + 0.1 && currentCoord >= newCoord - 0.1) {
        return true;
    }

    return false;
}

function isCloseOrbit(currentCoord, newCoord) {
    'use strict';
    if (currentCoord <= newCoord + 100 && currentCoord >= newCoord - 100) {
        return true;
    }

    return false;
}

function mouseX(e) {
    'use strict';
    if (e.pageX) {
        return e.pageX;
    }
    else if (e.clientX) {
        return e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
    }
    else {
        return null;
    }
}

function isNumeric(n) {
    'use strict';
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function mouseY(e) {
    'use strict';
    if (e.pageY) {
        return e.pageY;
    }
    else if (e.clientY) {
        return e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
    }
    else {
        return null;
    }
}

/*
 setMatrixUniforms() {


 gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camera.pMatrix);
 gl.uniformMatrix4fv(shaderProgram.uMVMatrix, false, camera.mvMatrix);

 var normalMatrix = mat3.create();
 mat4.toInverseMat3(camera.mvMatrix, normalMatrix);
 mat3.transpose(normalMatrix);
 gl.uniformMatrix3fv(shaderProgram.uNMatrix, false, normalMatrix);
 }
 */
function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildPlane(width, squares) {
    'use strict';

    var xLength = squares;
    var yLength = squares;

    var heightMapVertexData = [];
    var hd = [];

    var zPosition = 0;

    var part = width / squares;

    var c = 0;
    // First, build the data for the vertex buffer
    for (var x = 0; x < xLength; x++) {

        for (var y = 0; y < yLength; y++) {

            var xPosition1 = part * x + part;
            var yPosition1 = part * y;

            var xPosition2 = part * x + part;
            var yPosition2 = part * y + part;

            var xPosition3 = part * x;
            var yPosition3 = part * y;

            var xPosition4 = part * x;
            var yPosition4 = part * y;

            var xPosition5 = part * x + part;
            var yPosition5 = part * y + part;

            var xPosition6 = part * x;
            var yPosition6 = part * y + part;

            // Position
            hd[c++] = [xPosition1, yPosition1];
            hd[c++] = [xPosition2, yPosition2];
            hd[c++] = [xPosition3, yPosition3];

            hd[c++] = [xPosition4, yPosition4];
            hd[c++] = [xPosition5, yPosition5];
            hd[c++] = [xPosition6, yPosition6];

        }
    }

    c = 0;
    var iloop = [];
    var il = 0;
    var added = {};
    var val = [];
    var alreadyAdded;

    for (var i = 0; i < hd.length; i++) {
        alreadyAdded = false;

        if (hd[i][0] + ',' + hd[i][1] in added) {

            iloop.push(added[hd[i][0] + ',' + hd[i][1]]);
            alreadyAdded = true;

        }

        if (!alreadyAdded) {
            heightMapVertexData[c++] = hd[i][0];
            heightMapVertexData[c++] = 0;
            heightMapVertexData[c++] = hd[i][1];

            added[hd[i][0] + ',' + hd[i][1]] = il;
            iloop.push(il);

            il++;
        }
    }
    var plane = [];
    plane.push(iloop);
    plane.push(heightMapVertexData);
    return plane;
}
