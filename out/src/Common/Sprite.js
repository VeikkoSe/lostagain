var Sprite = function Sprite(name, xPos, yPos) {
  "use strict";
  this.xPos = xPos;
  this.yPos = yPos;
  this.width = 16;
  this.height = 16;
  this.speed = typeof speed === 'number' ? speed : 0;
  this.frames = frames;
  this.name = name;
  var t = new Texture(this.name);
  this.texture = t.loadedTexture;
  this.textureLoaded = t.loaded;
  this.pointStartPositionsBuffer = gl.createBuffer();
  this.time = 0;
  this.numParticles = 1;
  this.buildBuffers();
};
($traceurRuntime.createClass)(Sprite, {buildBuffers: function() {
    "use strict";
    var startPositions = [];
    startPositions.push(this.xPos);
    startPositions.push(this.yPos);
    startPositions.push(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
    this.pointStartPositionsBuffer.itemSize = 3;
    this.pointStartPositionsBuffer.numItems = this.numParticles;
  }}, {});
