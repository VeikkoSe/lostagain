function printMessage(msg) {
    $('#debugarea').html(msg);
}


function pInt(nro) {
    return parseInt(nro, 10);
}


function logGLCall(functionName, args) {
    console.log("gl." + functionName + "(" +
    WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function circleXY(center, radius, amount) {
    var points = [];
    var stepSize = ((2 * Math.PI) / amount);
    var y = 0;
    for (var d = 0; d <= (2 * Math.PI) - stepSize; d += stepSize) {
        points.push(((Math.sin(d) * radius) + center.x)
            , y, (Math.cos(d) * radius) + center.z);
    }
    return points;
}


function viewport() {
    var e = window;
    var a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[a + 'Width'], height: e[a + 'Height']}
}

function webGLStart() {

    var canvas = document.getElementById("canvas");
    initGL(canvas);

    sm = new ShaderManager();

    helpers = new Helpers();
    em = new EntityManager();
    mm = new AssetManager();
    camera = new Camera();
    picker = new Picker(canvas);
    ef = new EntityFactory();
    loadManager = new LoadManager();
    pub = new Publish();


    game = new Game(canvas);


}

function updateLightPosition() {
    var x = $('#slider-x').slider("value");
    var y = $('#slider-y').slider("value");
    var z = $('#slider-z').slider("value");
    $('#slider-x-value').html(x);
    $('#slider-y-value').html(y);
    $('#slider-z-value').html(z);
}


function updateCameraPosition() {
    var x = $('#cslider-x').slider("value");
    var y = $('#cslider-y').slider("value");
    var z = $('#cslider-z').slider("value");

    $('#cslider-x-value').html(x);
    $('#cslider-y-value').html(y);
    $('#cslider-z-value').html(z);
}

function updateRotation() {
    var x = $('#rslider-x').slider("value");
    $('#rotslider-x-value').html(x);

}

$(document).ready(function () {

    document.getElementById('canvas').width = resolutionWidth;
    document.getElementById('canvas').height = resolutionHeight;

    webGLStart();
});


function intersectionpoint(A, B) {

//http://stackoverflow.com/questions/2447361/3d-line-plane-intersection-with-simple-plane
    var r = -A[1] / B[1];

    var x = (r * B[0] + A[0]) / (r + 1);
    var z = (r * B[2] + A[2]) / (r + 1);

    return [x, 0, z];


}


function objectLabelGenerator() {
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


function initGL(canvas) {
    try {

        if (debug) {
            gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));
        }
        else {
            gl = canvas.getContext("webgl");
        }

        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {

    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}