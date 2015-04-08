var GunProcess = function GunProcess() {
  "use strict";
  this.bulletsAmount = 80;
  this.bulletReloadSpeed = 50;
  this.bullets = [];
  this.bulletShot = 0;
  this.lastTime = 0;
  this.particleProgram = sm.init('particle');
};
($traceurRuntime.createClass)(GunProcess, {
  shootBullet: function() {
    "use strict";
    var timeNow = new Date().getTime();
    if (timeNow - this.bulletReloadSpeed > this.bulletShot) {
      for (var i = 0; i < this.bulletsAmount; i++) {
        if (this.bullets[$traceurRuntime.toProperty(i)].visible == 0) {
          this.bulletShot = timeNow;
          this.bullets[$traceurRuntime.toProperty(i)].visible = 1;
          this.bullets[$traceurRuntime.toProperty(i)].birthTime = timeNow;
          this.bullets[$traceurRuntime.toProperty(i)].angle = game.stateEngine.gameState.ship.angle;
          this.bullets[$traceurRuntime.toProperty(i)].xPos = game.stateEngine.gameState.ship.xPos;
          this.bullets[$traceurRuntime.toProperty(i)].yPos = game.stateEngine.gameState.ship.yPos;
          break;
        }
      }
    }
  },
  update: function(deltatime) {
    "use strict";
    for (var i = 0; i < this.bulletsAmount; i++) {}
  },
  draw: function() {
    "use strict";
    gl.useProgram(this.particleProgram);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.BulletComponent) {
        var bc = le.components.BulletComponent;
        gl.uniform1f(this.particleProgram.pointSize, 64.0);
        camera.mvPushMatrix();
        gl.uniform3f(this.particleProgram.positionUniform, 0, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, bc.sprite.pointStartPositionsBuffer);
        gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, bc.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, bc.sprite.texture);
        gl.uniform1i(this.particleProgram.samplerUniform, 0);
        gl.uniform4f(this.particleProgram.colorUniform, 1, 1, 1, 1);
        gl.drawArrays(gl.POINTS, 0, 1);
        camera.mvPopMatrix();
        gl.disable(gl.BLEND);
      }
    }
  },
  checkHit: function() {
    "use strict";
    for (var i = 0; i < this.bulletsAmount; i++) {
      for (var j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {
        if (this.bullets[$traceurRuntime.toProperty(i)].visible == 1 && game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].visible == 1 && this.bullets[$traceurRuntime.toProperty(i)].xPos > game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].xPos - 4 && this.bullets[$traceurRuntime.toProperty(i)].xPos < game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].xPos + 4 && this.bullets[$traceurRuntime.toProperty(i)].yPos > game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].yPos - 4 && this.bullets[$traceurRuntime.toProperty(i)].yPos < game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].yPos + 4) {
          game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].visible = 0;
          game.stateEngine.gameState.asteroids.amountshot++;
          this.bullets[$traceurRuntime.toProperty(i)].visible = 0;
          game.shotAsteroids++;
          game.stateEngine.gameState.particles.newAsteroidExplosion(this.bullets[$traceurRuntime.toProperty(i)].yPos, this.bullets[$traceurRuntime.toProperty(i)].xPos);
        }
      }
    }
    if (game.stateEngine.gameState.asteroids.asteroids.length == game.stateEngine.gameState.asteroids.amountshot) {
      for (var j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {
        game.stateEngine.gameState.asteroids.asteroids[$traceurRuntime.toProperty(j)].visible = 1;
      }
      game.stateEngine.gameState.asteroids.amountshot = 0;
      game.stateEngine.gameState.asteroids.addnew(2);
    }
  }
}, {});
