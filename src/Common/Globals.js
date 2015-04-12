var gl = null;

//shaders
var shaderProgram = null;
var particleProgram = null;
var simplestProgram = null;
var ambientProgram = null;
var starProgram = null;
var fontProgram = null;
var blurVerticalProgram = null;
var blurHorizontalProgram = null;

var sm = null;
var mm = null;
var currentlyPressedKeys = {};
var game = null;

//var resolutionWidth = 1920;
//var resolutionHeight = 1080;

var resolutionWidth = 512;
var resolutionHeight = 512;

var texture = null;
var camera = null;
var picker = null;
var monstermap = null;

var ef = new EntityFactory();
var es = [];
var levelManager = new LevelManager();


var helpers = null;
var colorset = {};
var em = null;
var actionMapper = null;

var astar = null;





