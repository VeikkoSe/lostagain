function camera_constructor(gl) {
  var drawCalls = 0;
  var mvMatrix = mat4.create();
  var pMatrix = mat4.create();
  var cMatrix = mat4.create();
  var pvMatrix = mat4.create();
  var pvMatrixInverse = mat4.create();
  var mvMatrixStack = [];
  var eye = vec3.create([0, 0, 0]);
  var distance = 500;
  var x = 0;
  var y = -1 * distance;
  var z = -1 * distance;
  var rotation = degToRad(60);
  var slideLeft = false;
  var slideRight = false;
  var slideUp = false;
  var slideDown = false;
  var centerPosition = false;
  var home = [x, y, z];
  var init = function() {
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, home);
    mat4.identity(cMatrix);
    mat4.inverse(mvMatrix, cMatrix);
    mat4.identity(pMatrix);
  };
  var setDistance = function(d) {
    distance = d;
    y = -1 * distance;
    z = -1 * distance;
  };
  var setRotation = function(rot) {
    rotation = rot;
  };
  var setPos = function(xp, yp, zp, rot) {
    x = xp;
    y = yp;
    z = zp;
    rotation = rot;
    distance = z;
  };
  var setPerspective = function() {
    mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 20000.0, pMatrix);
  };
  var slideCameraLeft = function(xAddition) {
    x += xAddition;
  };
  var slideCameraRight = function(xDecrease) {
    x -= xDecrease;
  };
  var slideCameraUp = function(zAddition) {
    z += zAddition;
  };
  var slideCameraDown = function(zDecrease) {
    z -= zDecrease;
  };
  var move = function() {
    mat4.identity(mvMatrix);
    mat4.rotate(mvMatrix, rotation, [1, 0, 0]);
    mat4.translate(mvMatrix, [x, y, z]);
  };
  var getMVMatrix = function() {
    return mvMatrix;
  };
  var getPMatrix = function() {
    return pMatrix;
  };
  var mvPushMatrix = function() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
  };
  var mvPopMatrix = function() {
    if (mvMatrixStack.length == 0) {
      throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
  };
  var subscribe = function() {};
  return Object.freeze({
    mvPopMatrix: mvPopMatrix,
    mvPushMatrix: mvPushMatrix,
    setPerspective: setPerspective,
    setDistance: setDistance,
    init: init,
    getMVMatrix: getMVMatrix,
    getPMatrix: getPMatrix,
    move: move,
    getX: function() {
      return x;
    },
    getY: function() {
      return y;
    },
    getZ: function() {
      return z;
    },
    init: function() {},
    subscribe: subscribe
  });
}
