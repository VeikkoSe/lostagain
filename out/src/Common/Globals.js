var gl = null;
var sm = null;
var mm = null;
var currentlyPressedKeys = {};
var game = null;
var debug = true;
if (debug) {
  var resolutionWidth = 640;
  var resolutionHeight = 480;
} else {
  var resolutionWidth = 1920;
  var resolutionHeight = 1080;
}
var camera = null;
var ef = {};
var loadManager = {};
var pub = {};
var lm = null;
var helpers = null;
var colorset = {};
var em = null;
var actionMapper = null;
