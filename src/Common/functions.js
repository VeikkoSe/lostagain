$(document).ready(function () {



    let CORE = new Core(800, 600);
    CORE.start_modules();
    CORE.start_game();

    init();

    startSound();


});


function printMessage(msg) {
    $('#debugarea').html(msg);
}


function pInt(nro) {
    return parseInt(nro, 10);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function logGLCall(functionName, args) {
    console.log("gl." + functionName + "(" +
    WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function circleXY(center, radius, amount) {
    let points = [];
    let stepSize = ((2 * Math.PI) / amount);
    let y = 0;
    for (let d = 0; d <= (2 * Math.PI) - stepSize; d += stepSize) {
        points.push(((Math.sin(d) * radius) + center.x)
            , y, (Math.cos(d) * radius) + center.z);
    }
    return points;
}


function viewport() {
    let e = window;
    let a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[a + 'Width'], height: e[a + 'Height']}
}


function updateLightPosition() {
    let x = $('#slider-x').slider("value");
    let y = $('#slider-y').slider("value");
    let z = $('#slider-z').slider("value");
    $('#slider-x-value').html(x);
    $('#slider-y-value').html(y);
    $('#slider-z-value').html(z);
}


function updateCameraPosition() {
    let x = $('#cslider-x').slider("value");
    let y = $('#cslider-y').slider("value");
    let z = $('#cslider-z').slider("value");

    $('#cslider-x-value').html(x);
    $('#cslider-y-value').html(y);
    $('#cslider-z-value').html(z);
}

function updateRotation() {
    let x = $('#rslider-x').slider("value");
    $('#rotslider-x-value').html(x);

}


function intersectionpoint(A, B) {

//http://stackoverflow.com/questions/2447361/3d-line-plane-intersection-with-simple-plane
    let r = -A[1] / B[1];

    let x = (r * B[0] + A[0]) / (r + 1);
    let z = (r * B[2] + A[2]) / (r + 1);

    return [x, 0, z];


}


function objectLabelGenerator() {
    let color = [Math.random(), Math.random(), Math.random(), 1.0];
    let key = color[0] + ':' + color[1] + ':' + color[2];
    if (key in colorset) {
        return uniqueColorGenerator();
    }
    else {
        colorset[key] = true;
        return color;
    }
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}


function isClose(currentCoord, newCoord) {

    if (currentCoord <= newCoord + 0.1 && currentCoord >= newCoord - 0.1) {
        return true;
    }

    return false;
}

function mouseX(e) {
    if (e.pageX) return e.pageX;
    else if (e.clientX)
        return e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
    else return null;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function mouseY(e) {
    if (e.pageY) return e.pageY;
    else if (e.clientY)
        return e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
    else return null;
}

function simpleWorldToViewX(x) {
    return x / resolutionWidth;
}

function simpleWorldToViewY(y) {

    return y / resolutionHeight;
}

/*
 setMatrixUniforms() {


 gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camera.pMatrix);
 gl.uniformMatrix4fv(shaderProgram.uMVMatrix, false, camera.mvMatrix);

 let normalMatrix = mat3.create();
 mat4.toInverseMat3(camera.mvMatrix, normalMatrix);
 mat3.transpose(normalMatrix);
 gl.uniformMatrix3fv(shaderProgram.uNMatrix, false, normalMatrix);
 }
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildPlane(width, squares) {

    let xLength = squares;
    let yLength = squares;

    let heightMapVertexData = [];
    let hd = [];

    let zPosition = 0;

    let part = width / squares;

    let c = 0;
    // First, build the data for the vertex buffer
    for (let x = 0; x < xLength; x++) {

        for (let y = 0; y < yLength; y++) {

            let xPosition1 = part * x + part;
            let yPosition1 = part * y;

            let xPosition2 = part * x + part;
            let yPosition2 = part * y + part;

            let xPosition3 = part * x;
            let yPosition3 = part * y;

            let xPosition4 = part * x;
            let yPosition4 = part * y;

            let xPosition5 = part * x + part;
            let yPosition5 = part * y + part;

            let xPosition6 = part * x;
            let yPosition6 = part * y + part;


            // Position
            hd[c++] = [xPosition1, yPosition1];
            hd[c++] = [xPosition2, yPosition2];
            hd[c++] = [xPosition3, yPosition3];

            hd[c++] = [xPosition4, yPosition4];
            hd[c++] = [xPosition5, yPosition5];
            hd[c++] = [xPosition6, yPosition6];

        }
    }
    //console.log(hd);
    c = 0;
    let iloop = [];
    let il = 0;
    let added = {};
    let val = [];
    let alreadyAdded;

    for (let i = 0; i < hd.length; i++) {
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
    let plane = [];
    plane.push(iloop);
    plane.push(heightMapVertexData);
    return plane;
}
