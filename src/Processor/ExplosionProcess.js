function explosionprocess_constructor(sb) {
    'use strict';

    // constructor() {
    // var that = this;
    var sb = sb;
    var gl = sb.getGL();
    var am = sb.getAssetManager();
    var shadermanager = sb.getShaderManager();
    var particleProgram = shadermanager.useShader('lifetimeparticle');
    var explosions;
    //var particleProgram = sm.init('lifetimeparticle');

    var camera = sb.getCamera();
    // var sprite_loader = sprite_constructor(sb);
    var sprite;

    //var texture;
    //var t = texture_constructor(sb);

    var init = function() {

        //var texture = texture_constuctor('smoke');

        //t.load({name: 'smoke'});

        //sprite = sprite_loader.load("smoke");
        sprite = am.getSprite('currency');

        //texture = t.getLoadedTexture();
        sb.subscribe('explosion', function(name, entity) {

            createNewMediumExplosion(entity.getXPos(), entity.getZPos());

        });

        sb.subscribe('smallexplosion', function(name, entity) {

            createNewSmallExplosion(entity.getXPos(), entity.getZPos());

        });

        sb.subscribe('bigexplosion', function(name, entity) {

            createNewBigExplosion(entity.getXPos(), entity.getZPos());

        });

        explosions = [];
        //particleProgram = sm.init('lifetimeparticle');

        //texture = new Texture('smoke');

    };

    /*
     var simpleWorldToViewX = function (x) {
     return x / resolutionWidth;
     }

     var simpleWorldToViewY = function (y) {

     return y / resolutionHeight;
     }
     */
    var update = function(elapsed) {

        for (var i = 0; i < explosions.length; i++) {

            if (explosions[i].getTime() > 5) {
                explosions.splice(i, 1);
            }
            else {
                explosions[i].setTime(explosions[i].getTime() + elapsed / 3000);
            }
        }

    };

    var createNewSmallExplosion = function(x, z) {
        //slow

        var particle = asteroidexplosion_constructor(sb, x, 0, z, 'small');
        particle.init();

        explosions.push(particle);

    };

    var createNewMediumExplosion = function(x, z) {
        //slow

        var particle = asteroidexplosion_constructor(sb, x, 0, z, 'medium');
        particle.init();

        explosions.push(particle);

    };

    var createNewBigExplosion = function(x, z) {
        //slow

        var particle = asteroidexplosion_constructor(sb, x, 0, z, 'large');
        particle.init();

        explosions.push(particle);

    };

    var draw = function() {

        //gl.disable(gl.DEPTH_TEST);

        //gl.enable(gl.BLEND);
        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        //sm.setProgram(particleProgram);
        shadermanager.setProgram(particleProgram);
        var mvMatrix = camera.getMVMatrix();

        //TODO stays too long up to 5 seconds
        //console.log(explosions.length);

        for (var i = 0; i < explosions.length; i++) {
            camera.mvPushMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, explosions[i].getPointLifetimeBuffer());
            gl.vertexAttribPointer(particleProgram.pointLifetimeAttribute, explosions[i].getPointLifetimeBuffer().itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, explosions[i].getPointStartPositionsBuffer());
            gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, explosions[i].getPointStartPositionsBuffer().itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, explosions[i].getPointEndPositionsBuffer());
            gl.vertexAttribPointer(particleProgram.pointEndPositionAttribute, explosions[i].getPointEndPositionsBuffer().itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, sprite.getTexture());
            gl.uniform1i(particleProgram.samplerUniform, 0);

            gl.uniformMatrix4fv(particleProgram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(particleProgram.uMVMatrix, false, mvMatrix);

            gl.uniform3f(particleProgram.centerPositionUniform, explosions[i].getXPos(), 0, explosions[i].getZPos());
            //gl.uniform3f(particleProgram.centerPositionUniform, 0, 0, 0);
            gl.uniform4f(particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
            gl.uniform1f(particleProgram.timeUniform, explosions[i].getTime());

            gl.drawArrays(gl.POINTS, 0, explosions[i].getPointLifetimeBuffer().numItems);
            camera.mvPopMatrix();
        }

        //gl.enable(gl.DEPTH_TEST);
        //gl.disable(gl.BLEND);

    };
    return {update, draw, init};
}




















