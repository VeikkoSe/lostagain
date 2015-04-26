var ExplosionProcess = function ExplosionProcess() {
  "use strict";
  var that = this;
  pub.subscribe("explosion", function(name, entity) {
    that.createNewExplosion(that, entity.xPos, entity.zPos);
  });
  pub.subscribe("bigexplosion", function(name, entity) {
    that.createNewExplosion(that, entity.xPos, entity.zPos);
  });
  this.explosions = [];
  this.particleProgram = sm.init('lifetimeparticle');
  this.texture = new Texture('smoke');
};
($traceurRuntime.createClass)(ExplosionProcess, {
  simpleWorldToViewX: function(x) {
    "use strict";
    return x / resolutionWidth;
  },
  simpleWorldToViewY: function(y) {
    "use strict";
    return y / resolutionHeight;
  },
  update: function(elapsed) {
    "use strict";
    for (var i = 0; i < this.explosions.length; i++) {
      if (this.explosions[$traceurRuntime.toProperty(i)].time > 5)
        this.explosions.splice(i, 1);
      else {
        this.explosions[$traceurRuntime.toProperty(i)].time += elapsed / 3000;
      }
    }
  },
  createNewExplosion: function(obj, x, z) {
    "use strict";
    var particle = new AsteroidExplosion(x, 0, z);
    obj.explosions.push(particle);
  },
  draw: function() {
    "use strict";
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    sm.setProgram(this.particleProgram);
    for (var i = 0; i < this.explosions.length; i++) {
      camera.mvPushMatrix();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer);
      gl.vertexAttribPointer(this.particleProgram.pointLifetimeAttribute, this.explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[$traceurRuntime.toProperty(i)].pointStartPositionsBuffer);
      gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, this.explosions[$traceurRuntime.toProperty(i)].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[$traceurRuntime.toProperty(i)].pointEndPositionsBuffer);
      gl.vertexAttribPointer(this.particleProgram.pointEndPositionAttribute, this.explosions[$traceurRuntime.toProperty(i)].pointEndPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture.loadedTexture);
      gl.uniform1i(this.particleProgram.samplerUniform, 0);
      gl.uniformMatrix4fv(this.particleProgram.uPMatrix, false, camera.pMatrix);
      gl.uniformMatrix4fv(this.particleProgram.uMVMatrix, false, camera.mvMatrix);
      gl.uniform3f(this.particleProgram.centerPositionUniform, this.explosions[$traceurRuntime.toProperty(i)].xPos, 0, this.explosions[$traceurRuntime.toProperty(i)].zPos);
      gl.uniform4f(this.particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
      gl.uniform1f(this.particleProgram.timeUniform, this.explosions[$traceurRuntime.toProperty(i)].time);
      gl.drawArrays(gl.POINTS, 0, this.explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer.numItems);
      camera.mvPopMatrix();
    }
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
  }
}, {});
