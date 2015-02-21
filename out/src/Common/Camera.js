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
  this.x = 0;
  this.y = 0;
  this.z = -120;
  this.rotation = 0;
  this.slideLeft = false;
  this.slideRight = false;
  this.slideUp = false;
  this.slideDown = false;
  this.rotation = helpers.degToRad(60);
  this.centerPosition = false;
  this.home = [this.x, this.y, this.z];
  mat4.identity(this.mvMatrix);
  mat4.translate(this.mvMatrix, this.home);
  mat4.identity(this.cMatrix);
  mat4.inverse(this.mvMatrix, this.cMatrix);
  mat4.identity(this.pMatrix);
};
($traceurRuntime.createClass)(Camera, {
  setPerspective: function() {
    "use strict";
    mat4.perspective(80, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this.pMatrix);
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
    mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 5000.0, this.pMatrix);
    var determineCenter = false;
    if (this.slideLeft) {
      this.slideCameraLeft(0.1);
      determineCenter = true;
    }
    if (this.slideRight) {
      this.slideCameraRight(0.1);
      determineCenter = true;
    }
    if (this.slideUp) {
      this.slideCameraUp(0.1);
      determineCenter = true;
    }
    if (this.slideDown) {
      this.slideCameraDown(0.1);
      determineCenter = true;
    }
    if ($('#controlCamera').prop('checked')) {
      this.x = $('#cslider-x').slider("value");
      this.y = $('#cslider-y').slider("value");
      this.z = $('#cslider-z').slider("value");
      this.rotation = helpers.degToRad($('#rslider-x').slider("value"));
      printMessage(this.x);
    }
    if (determineCenter) {}
    mat4.identity(this.mvMatrix);
    mat4.rotate(this.mvMatrix, this.rotation, [1, 0, 0]);
    mat4.translate(this.mvMatrix, [this.x, this.y, this.z]);
    mat4.multiply(this.pMatrix, this.mvMatrix, this.pvMatrix);
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
