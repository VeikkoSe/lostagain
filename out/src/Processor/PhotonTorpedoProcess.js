var PhotonTorpedoProcess = function PhotonTorpedoProcess() {
  "use strict";
  this.bulletsAmount = 80;
  this.bulletReloadSpeed = 250;
  this.bullets = [];
  this.bulletShot = 0;
  this.lastTime = 0;
  this.particleProgram3d = sm.init('particle3d');
  var bullet;
  for (var i = 0; i < this.bulletsAmount; i++) {
    var bullet = new PhotonTorpedo();
    this.bullets.push(bullet);
  }
};
($traceurRuntime.createClass)(PhotonTorpedoProcess, {
  shootBullet: function(renderable) {
    "use strict";
    var timeNow = new Date().getTime();
    if (timeNow - this.bulletReloadSpeed > this.bulletShot) {
      for (var i = 0; i < this.bulletsAmount; i++) {
        if (this.bullets[$traceurRuntime.toProperty(i)].visible == 0) {
          this.bulletShot = timeNow;
          this.bullets[$traceurRuntime.toProperty(i)].visible = 1;
          this.bullets[$traceurRuntime.toProperty(i)].birthTime = timeNow;
          this.bullets[$traceurRuntime.toProperty(i)].angle = renderable.angleY;
          this.bullets[$traceurRuntime.toProperty(i)].xPos = renderable.xPos;
          this.bullets[$traceurRuntime.toProperty(i)].zPos = renderable.zPos;
          break;
        }
      }
    }
  },
  update: function(deltatime) {
    "use strict";
    var timeNow = new Date().getTime();
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.GunComponent && le.components.GunComponent.shooting && le.components.GunComponent.activeWeapon == 1) {
        this.shootBullet(le.components.Renderable);
      }
    }
    for (var i = 0; i < this.bulletsAmount; i++) {
      if (timeNow - this.bullets[$traceurRuntime.toProperty(i)].deathtime > this.bullets[$traceurRuntime.toProperty(i)].birthTime) {
        this.bullets[$traceurRuntime.toProperty(i)].visible = 0;
      } else {
        var posX = this.bullets[$traceurRuntime.toProperty(i)].speed * (deltatime / 1000.0) * Math.cos(helpers.degToRad(this.bullets[$traceurRuntime.toProperty(i)].angle));
        var posZ = this.bullets[$traceurRuntime.toProperty(i)].speed * (deltatime / 1000.0) * Math.sin(helpers.degToRad(this.bullets[$traceurRuntime.toProperty(i)].angle));
        this.bullets[$traceurRuntime.toProperty(i)].xPos += posX;
        this.bullets[$traceurRuntime.toProperty(i)].zPos -= posZ;
      }
    }
  },
  draw: function() {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.PhotonTorpedoComponent) {
        gl.disable(gl.DEPTH_TEST);
        sm.setProgram(this.particleProgram3d);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        for (var i = 0; i < this.bulletsAmount; i++) {
          if (this.bullets[$traceurRuntime.toProperty(i)].visible != 1) {
            continue;
          }
          var bc = le.components.PhotonTorpedoComponent;
          gl.uniform1f(this.particleProgram3d.pointSize, 64.0);
          camera.mvPushMatrix();
          gl.uniform3f(this.particleProgram3d.positionUniform, this.bullets[$traceurRuntime.toProperty(i)].xPos, 0, this.bullets[$traceurRuntime.toProperty(i)].zPos);
          gl.bindBuffer(gl.ARRAY_BUFFER, bc.sprite.pointStartPositionsBuffer);
          gl.vertexAttribPointer(this.particleProgram3d.pointStartPositionAttribute, bc.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, bc.sprite.texture);
          gl.uniform1i(this.particleProgram3d.samplerUniform, 0);
          gl.uniform4f(this.particleProgram3d.colorUniform, 1, 1, 1, 1);
          gl.uniformMatrix4fv(this.particleProgram3d.uPMatrix, false, camera.pMatrix);
          gl.uniformMatrix4fv(this.particleProgram3d.uMVMatrix, false, camera.mvMatrix);
          gl.drawArrays(gl.POINTS, 0, 1);
          camera.drawCalls++;
          camera.mvPopMatrix();
        }
        gl.enable(gl.DEPTH_TEST);
      }
    }
    gl.disable(gl.BLEND);
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
}, {}, Processor);
