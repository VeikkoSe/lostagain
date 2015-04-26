function printMessage(msg) {
  $('#debugarea').html(msg);
}
function pInt(nro) {
  return parseInt(nro, 10);
}
function logGLCall(functionName, args) {
  console.log("gl." + functionName + "(" + WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
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
  return {
    width: e[$traceurRuntime.toProperty(a + 'Width')],
    height: e[$traceurRuntime.toProperty(a + 'Height')]
  };
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
  levelManager = new LevelManager();
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
$(document).ready(function() {
  document.getElementById('canvas').width = resolutionWidth;
  document.getElementById('canvas').height = resolutionHeight;
  webGLStart();
});
function intersectionpoint(A, B) {
  var r = -A[1] / B[1];
  var x = (r * B[0] + A[0]) / (r + 1);
  var z = (r * B[2] + A[2]) / (r + 1);
  return [x, 0, z];
}
function objectLabelGenerator() {
  var color = [Math.random(), Math.random(), Math.random(), 1.0];
  var key = color[0] + ':' + color[1] + ':' + color[2];
  if ($traceurRuntime.toProperty(key) in colorset) {
    return uniqueColorGenerator();
  } else {
    $traceurRuntime.setProperty(colorset, key, true);
    return color;
  }
}
function initGL(canvas) {
  try {
    if (debug) {
      gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl", {alpha: false}));
    } else {
      gl = canvas.getContext("webgl");
    }
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {}
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
}
