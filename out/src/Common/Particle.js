var Billboard = function Billboard(name, xpos, ypos) {
  "use strict";
  var numofParticles = arguments[3] !== (void 0) ? arguments[3] : 1;
  var particleLifetime = arguments[4] !== (void 0) ? arguments[4] : -1;
  this.pointEndPositionsBuffer = gl.createBuffer();
  this.pointLifetimeBuffer = gl.createBuffer();
  this.pointStartPositionsBuffer = gl.createBuffer();
  this.time = 0;
  this.numParticles = numofParticles;
  this.xPos = xpos;
  this.yPos = ypos;
  this.buildBuffers();
  this.name = name;
};
($traceurRuntime.createClass)(Billboard, {buildBuffers: function() {
    "use strict";
    var lifetimes = [];
    var startPositions = [];
    var endPositions = [];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.xPos);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
    this.pointStartPositionsBuffer.itemSize = 3;
    this.pointStartPositionsBuffer.numItems = this.numParticles;
  }}, {});
