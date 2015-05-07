//gl object
var gl = null;
//shadermanager
var sm = null;
//meshmanager
var mm = null;
//holds all the currently pressed key
var currentlyPressedKeys = {};
//gameobject that is running. Kinda "dummy" atm
var game = null;
//internal resolution and outer resolution is the same atm
var resolutionWidth = 1920;
var resolutionHeight = 1080;

var camera = null;

var picker = null;
//entityfactory, hold all the entities
var ef = {};
//holds different levels
var loadManager = {};
//maessaging manager. Basically only between systems
var pub = {};

var lm = null;
var helpers = null;
var colorset = {};
var em = null;
var actionMapper = null;
var astar = null;


var debug = false;
if (debug) {
    var resolutionWidth = 640;
    var resolutionHeight = 480;
}


