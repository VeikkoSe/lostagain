

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

    var sp = new ShaderManager();

    //astarManager = new AstarManager();

    //blockManager = new BlockManager();

    helpers = new Helpers();
    em = new EntityManager();
    mm = new AssetManager();
    camera = new Camera();
    picker = new Picker(canvas);


    game = new Game(canvas);


}

function updateLightPosition() {
    var x = $('#slider-x').slider("value");
    var y = $('#slider-y').slider("value");
    var z = $('#slider-z').slider("value");
    //gl.uniform3f(shaderProgram.uLightPosition, x, y, z);
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


    $('#slider-x').slider({
        value: -20.0,
        min: -500,
        max: 500,
        step: 0.1,
        slide: updateLightPosition,
        change: updateLightPosition
    });
    $('#slider-y').slider({
        value: 35.0,
        min: -500,
        max: 500,
        step: 0.1,
        slide: updateLightPosition,
        change: updateLightPosition
    });
    $('#slider-z').slider({
        value: -28,
        min: -500,
        max: 500,
        step: 0.1,
        slide: updateLightPosition,
        change: updateLightPosition
    });

    $('#cslider-x').slider({
        value: -16,
        min: -5000,
        max: 5000,
        step: 0.1,
        slide: updateCameraPosition,
        change: updateCameraPosition
    });
    $('#cslider-y').slider({
        value: -53,
        min: -5000,
        max: 5000,
        step: 0.1,
        slide: updateCameraPosition,
        change: updateCameraPosition
    });
    $('#cslider-z').slider({
        value: -82,
        min: -5000,
        max: 5000,
        step: 0.1,
        slide: updateCameraPosition,
        change: updateCameraPosition
    });

    $('#rslider-x').slider({value: 60, min: 0, max: 360, step: 0.1, slide: updateRotation, change: updateRotation});

    //console.log();
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
        //gl = canvas.getContext("webgl");
        gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));

        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {

    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}