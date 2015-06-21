function explosionprocess_constructor(sb) {
  var explosions = [];
  var particleProgram = sm.init('lifetimeparticle');
  var gl = sb.getGL();
  var camera = sb.getCamera();
  var init = function() {
    var texture = texture_constuctor('smoke');
    sb.subscribe("explosion", function(name, entity) {
      createNewExplosion(entity.xPos, entity.zPos);
    });
    sb.subscribe("bigexplosion", function(name, entity) {
      createNewExplosion(entity.xPos, entity.zPos);
    });
    explosions = [];
    particleProgram = sm.init('lifetimeparticle');
    texture = new Texture('smoke');
  };
  var simpleWorldToViewX = function(x) {
    return x / resolutionWidth;
  };
  var simpleWorldToViewY = function(y) {
    return y / resolutionHeight;
  };
  var update = function(elapsed) {
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < explosions.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  if (explosions[$traceurRuntime.toProperty(i)].time > 5)
                    explosions.splice(i, 1);
                  else {
                    explosions[$traceurRuntime.toProperty(i)].time += elapsed / 3000;
                  }
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
  };
  var createNewExplosion = function(x, z) {
    var particle = asteroidexplosion_constructor(x, 0, z);
    explosions.push(particle);
  };
  var draw = function() {
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    sm.setProgram(particleProgram);
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < explosions.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  camera.mvPushMatrix();
                  gl.bindBuffer(gl.ARRAY_BUFFER, explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer);
                  gl.vertexAttribPointer(particleProgram.pointLifetimeAttribute, explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer.itemSize, gl.FLOAT, false, 0, 0);
                  gl.bindBuffer(gl.ARRAY_BUFFER, explosions[$traceurRuntime.toProperty(i)].pointStartPositionsBuffer);
                  gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, explosions[$traceurRuntime.toProperty(i)].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
                  gl.bindBuffer(gl.ARRAY_BUFFER, explosions[$traceurRuntime.toProperty(i)].pointEndPositionsBuffer);
                  gl.vertexAttribPointer(particleProgram.pointEndPositionAttribute, explosions[$traceurRuntime.toProperty(i)].pointEndPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);
                  gl.activeTexture(gl.TEXTURE0);
                  gl.bindTexture(gl.TEXTURE_2D, texture.loadedTexture);
                  gl.uniform1i(particleProgram.samplerUniform, 0);
                  gl.uniformMatrix4fv(particleProgram.uPMatrix, false, camera.getPMatrix());
                  gl.uniformMatrix4fv(particleProgram.uMVMatrix, false, camera.getMVMatrix());
                  gl.uniform3f(particleProgram.centerPositionUniform, explosions[$traceurRuntime.toProperty(i)].xPos, 0, explosions[$traceurRuntime.toProperty(i)].zPos);
                  gl.uniform4f(particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
                  gl.uniform1f(particleProgram.timeUniform, explosions[$traceurRuntime.toProperty(i)].time);
                  gl.drawArrays(gl.POINTS, 0, explosions[$traceurRuntime.toProperty(i)].pointLifetimeBuffer.numItems);
                  camera.mvPopMatrix();
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
  };
}
