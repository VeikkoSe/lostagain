function camera_constructor() {
  var gl,
      mvMatrix,
      pMatrix,
      cMatrix,
      pvMatrix,
      pvMatrixInverse,
      mvMatrixStack,
      drawCalls,
      eye,
      distance,
      x,
      y,
      z;
  var rotationX,
      rotationY,
      slideLeft,
      slideRight,
      slideUp,
      slideDown,
      centerPosition,
      home,
      sb;
  var init = function(sandbox) {
    sb = sandbox;
    mvMatrix = mat4.create();
    pMatrix = mat4.create();
    cMatrix = mat4.create();
    pvMatrix = mat4.create();
    pvMatrixInverse = mat4.create();
    mat4.identity(mvMatrix);
    home = [x, y, z];
    mat4.translate(mvMatrix, home);
    mat4.identity(cMatrix);
    mat4.inverse(mvMatrix, cMatrix);
    mat4.identity(pMatrix);
    drawCalls = 0;
    mvMatrixStack = [];
    eye = vec3.create([0, 0, 0]);
    distance = 500;
    x = 0;
    y = -1 * distance;
    z = -1 * distance;
    rotationX = degToRad(60);
    rotationY = 0;
    slideLeft = false;
    slideRight = false;
    slideUp = false;
    slideDown = false;
    centerPosition = false;
  };
  var start = function() {
    gl = sb.getGL();
  };
  var setDistance = function(d) {
    distance = d;
    y = -1 * distance;
    z = -1 * distance;
  };
  var setXRotation = function(rot) {
    rotationX = rot;
  };
  var setYRotation = function(rot) {
    if (rot.charAt(0) === '-') {
      rotationY -= degToRad(parseInt(rot.substring(1), 10));
    } else
      rotationY += degToRad(parseInt(rot, 10));
  };
  var setPos = function() {
    var xp = arguments[0] !== (void 0) ? arguments[0] : false;
    var yp = arguments[1] !== (void 0) ? arguments[1] : false;
    var zp = arguments[2] !== (void 0) ? arguments[2] : false;
    if (xp) {
      if (xp.charAt(0) === '-') {
        x -= parseInt(xp.substring(1), 10);
      } else {
        x += parseInt(xp, 10);
      }
    }
    if (yp) {
      if (yp.charAt(0) === '-') {
        y -= parseInt(yp.substring(1), 10);
      } else {
        y += parseInt(yp, 10);
      }
    }
    if (zp) {
      if (zp.charAt(0) === '-') {
        z -= parseInt(zp.substring(1), 10);
      } else {
        z += parseInt(zp, 10);
      }
    }
  };
  var setPerspective = function() {
    mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 20000.0, pMatrix);
  };
  var move = function() {
    mat4.identity(mvMatrix);
    mat4.rotate(mvMatrix, rotationX, [1, 0, 0]);
    mat4.translate(mvMatrix, [x, y, z]);
    mat4.rotate(mvMatrix, rotationY, [0, 1, 0]);
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
    setXRotation: setXRotation,
    setYRotation: setYRotation,
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
    setPos: setPos,
    subscribe: subscribe,
    start: start
  });
}
