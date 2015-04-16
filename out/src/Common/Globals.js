var gl = null;
var sm = null;
var mm = null;
var currentlyPressedKeys = {};
var game = null;
var gm = null;
var resolutionWidth = 1920;
var resolutionHeight = 1080;
var debug = true;
if (debug) {
  var resolutionWidth = 640;
  var resolutionHeight = 480;
}
var camera = null;
var picker = null;
var ef = new EntityFactory();
var levelManager = new LevelManager();
var lm = null;
var helpers = null;
var colorset = {};
var em = null;
var actionMapper = null;
var astar = null;
