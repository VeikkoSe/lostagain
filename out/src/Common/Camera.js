var Camera = function Camera() {
  "use strict";
  this.mvMatrix = mat4.create();
  this.pMatrix = mat4.create();
  this.cMatrix = mat4.create();
  this.pvMatrix = mat4.create();
  this.pvMatrixInverse = mat4.create();
  this.mvMatrixStack = [];
  this.eye = vec3.create([0, 0, 0]);
  this.clickPosition = null;
  this.distance = 100;
  this.x = 0;
  this.y = -1 * this.distance;
  this.z = -1 * this.distance;
  this.rotation = helpers.degToRad(45);
  this.slideLeft = false;
  this.slideRight = false;
  this.slideUp = false;
  this.slideDown = false;
  this.centerPosition = false;
  this.home = [this.x, this.y, this.z];
  mat4.identity(this.mvMatrix);
  mat4.translate(this.mvMatrix, this.home);
  mat4.identity(this.cMatrix);
  mat4.inverse(this.mvMatrix, this.cMatrix);
  mat4.identity(this.pMatrix);
};
($traceurRuntime.createClass)(Camera, {
  setDistance: function(d) {
    "use strict";
    this.distance = d;
  },
  setRotation: function(rot) {
    "use strict";
    this.rotation = rot;
  },
  setPos: function(x, y, z, rot) {
    "use strict";
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotation = rot;
    this.distance = z;
  },
  setPerspective: function() {
    "use strict";
    mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 20000.0, camera.pMatrix);
  },
  slideCameraLeft: function(xAddition) {
    "use strict";
    this.x += xAddition;
  },
  slideCameraRight: function(xDecrease) {
    "use strict";
    this.x -= xDecrease;
  },
  slideCameraUp: function(zAddition) {
    "use strict";
    this.z += zAddition;
  },
  slideCameraDown: function(zDecrease) {
    "use strict";
    this.z -= zDecrease;
  },
  move: function() {
    "use strict";
    mat4.identity(camera.mvMatrix);
    mat4.rotate(this.mvMatrix, this.rotation, [1, 0, 0]);
    mat4.translate(this.mvMatrix, [this.x, this.y, this.z]);
  },
  mvPushMatrix: function() {
    "use strict";
    var copy = mat4.create();
    mat4.set(this.mvMatrix, copy);
    this.mvMatrixStack.push(copy);
  },
  mvPopMatrix: function() {
    "use strict";
    if (this.mvMatrixStack.length == 0) {
      throw "Invalid popMatrix!";
    }
    this.mvMatrix = this.mvMatrixStack.pop();
  }
}, {});
