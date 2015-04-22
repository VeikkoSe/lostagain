var ExplosionProcess = function ExplosionProcess() {
  "use strict";
  pub.subscribe("collision", this.explode);
  this.explosions = [];
  this.particleProgram = sm.init('particle');
};
($traceurRuntime.createClass)(ExplosionProcess, {
  explode: function(a, b) {
    "use strict";
    if ((b[0].group == 'enemy' && b[1].group == 'player') || (b[1].group == 'enemy' && b[0].group == 'player')) {
      this.createNewExplosion();
    }
  },
  update: function() {
    "use strict";
  },
  createNewExplosion: function() {
    "use strict";
  },
  draw: function() {
    "use strict";
    for (var i = 0; i < this.explosions.length; i++) {
      this.mvPushMatrix();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer);
      gl.vertexAttribPointer(this.particleProgram.pointLifetimeAttribute, this.explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[$traceurRuntime.toProperty(i)].pointStartPositionsBuffer);
      gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, this.explosions[$traceurRuntime.toProperty(i)].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[$traceurRuntime.toProperty(i)].pointEndPositionsBuffer);
      gl.vertexAttribPointer(this.particleProgram.pointEndPositionAttribute, this.explosions[$traceurRuntime.toProperty(i)].pointEndPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.uniform1i(this.particleProgram.samplerUniform, 0);
      gl.uniform3f(this.particleProgram.centerPositionUniform, this.simpleWorldToViewX(this.particles.asteroidExplosion[$traceurRuntime.toProperty(i)].xPos), this.simpleWorldToViewY(this.particles.asteroidExplosion[$traceurRuntime.toProperty(i)].yPos), 0);
      gl.uniform4f(this.particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
      gl.uniform1f(this.particleProgram.timeUniform, this.particles.asteroidExplosion[$traceurRuntime.toProperty(i)].time);
      gl.drawArrays(gl.POINTS, 0, his.explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer.numItems);
      this.mvPopMatrix();
    }
  }
}, {});
