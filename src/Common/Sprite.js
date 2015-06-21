/*
 class Sprite {
 constructor(name) {

 this.speed = typeof speed === 'number' ? speed : 0;

 this.name = name;

 let t = new Texture(this.name);
 this.texture = t.loadedTexture;
 this.textureLoaded = t.loaded;

 this.pointStartPositionsBuffer = gl.createBuffer();
 this.time = 0;
 this.numParticles = 1;

 this.buildBuffers();

 }




 buildBuffers() {


 let startPositions = [];

 startPositions.push(0);
 startPositions.push(0);
 startPositions.push(0);

 gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
 this.pointStartPositionsBuffer.itemSize = 3;
 this.pointStartPositionsBuffer.numItems = this.numParticles;

 }


 }

 */


