var AsteroidRenderProcess = function AsteroidRenderProcess() {
  "use strict";
  this.normalMatrix = mat3.create();
  this.megaElapsedTotal = 0;
  this.ambientProgram = sm.init('ambient');
  this.monstermap = null;
  this.lastTime = 0;
  this.vertexPositionBuffer = gl.createBuffer();
  this.vertexPositionBuffer.nums = 0;
  this.cube = new Cube();
  this.elapsedTotal = 0;
  this.lastTime = 0;
  this.combinedMeshes = {};
  this.combinedMeshes.vertices = [];
  this.vertexPositionBuffer.nums = 0;
  var verts = this.cube.vertices();
  for (var g = 0; g < 10009; g++) {
    var x = this.getRandomInt(-100, 100);
    var y = this.getRandomInt(0, 0);
    var z = this.getRandomInt(-100, 100);
    for (var i = 0; i < verts.length; i += 3) {
      var newVerts = [];
      newVerts.push(verts[$traceurRuntime.toProperty(i)]);
      newVerts.push(verts[$traceurRuntime.toProperty(i + 1)]);
      newVerts.push(verts[$traceurRuntime.toProperty(i + 2)]);
      newVerts.push(x);
      newVerts.push(y);
      newVerts.push(z);
      newVerts.push(g);
      newVerts.push(g);
      newVerts.push(g);
      this.combinedMeshes.vertices.push.apply(this.combinedMeshes.vertices, newVerts);
    }
    this.vertexPositionBuffer.nums += verts.length / 3;
  }
  console.log(this.combinedMeshes);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.combinedMeshes.vertices), gl.STATIC_DRAW);
};
($traceurRuntime.createClass)(AsteroidRenderProcess, {
  textureFromPixelArray: function(dataArray, type, width, height) {
    "use strict";
    var dataTypedArray = new Uint8Array(dataArray);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
    return texture;
  },
  randomIntFromInterval: function(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  getRandomInt: function(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  createTexture: function(elapsed) {
    "use strict";
    this.megaElapsedTotal += elapsed;
    if (this.megaElapsedTotal > 100 || this.monstermap == null) {
      this.megaElapsedTotal = 0;
      var b = new ArrayBuffer(128 * 128 * 4);
      var v1 = new Uint8Array(b);
      var g = 0;
      for (var i = 0; i < 128 * 128; i++) {
        $traceurRuntime.setProperty(v1, g++, 0);
        $traceurRuntime.setProperty(v1, g++, 0);
        $traceurRuntime.setProperty(v1, g++, 0);
        $traceurRuntime.setProperty(v1, g++, 0);
      }
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA, gl.UNSIGNED_BYTE, v1);
      gl.generateMipmap(gl.TEXTURE_2D);
      this.monstermap = texture;
    }
  },
  update: function(deltatime) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.AsteroidComponent) {
        this.createTexture(deltatime);
      }
    }
  },
  draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.AsteroidComponent) {
        gl.useProgram(this.ambientProgram);
        gl.uniform3fv(this.ambientProgram.uCameraPos, [camera.x, camera.y, camera.z]);
        gl.uniformMatrix4fv(this.ambientProgram.uPMatrix, false, camera.pMatrix);
        var timeNow = new Date().getTime();
        if (this.lastTime != 0) {
          var elapsed = timeNow - this.lastTime;
          this.elapsedTotal += elapsed;
          gl.uniform1f(this.ambientProgram.uElapsed, this.elapsedTotal.toFixed(1));
        }
        gl.uniform1f(this.ambientProgram.uElapsed, 0);
        this.lastTime = timeNow;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.monstermap);
        gl.uniform1i(this.ambientProgram.uVisibility, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.ambientProgram.aVertexPosition, 3, gl.FLOAT, false, 36, 0);
        gl.vertexAttribPointer(this.ambientProgram.aWorldCoordinates, 3, gl.FLOAT, false, 36, 12);
        gl.vertexAttribPointer(this.ambientProgram.aCubeNumber, 3, gl.FLOAT, false, 36, 24);
        gl.drawArrays(gl.LINES, 0, this.vertexPositionBuffer.nums);
        camera.drawCalls++;
      }
    }
  }
}, {}, Processor);
