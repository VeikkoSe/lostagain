
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

var debug = true;

    var resolutionWidth = 640;
    var resolutionHeight = 480;


  //  var resolutionWidth = screen.width;
//   var resolutionHeight = screen.height;


var camera = null;

//var picker = null;
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
// astar = null;





