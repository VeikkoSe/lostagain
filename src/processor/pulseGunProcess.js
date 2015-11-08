function pulseGunProcess(sb, pubsub, helpers) {
    'use strict';

    var gl = sb.getGL();
    var material = sb.getMaterial();
    var particleProgram3d = material.useShader('particle3d');

    //var lastTime = 0;
    var camera = sb.getCamera();
    // var particleProgram3d = sm.init('particle3d');
    var em = sb.getEntityManager();
    var collisions = [];
    var positions = [];

    //    var bullet;
    var init = function() {

    };

    var shootBullet = function(ammo, shooter) {

        var timeNow = new Date().getTime();

        var bulletsAmount = ammo.getBulletsAmount();
        var bullets = ammo.getBullets();
        var bulletShot = ammo.getBulletShot();
        var bulletReloadSpeed = ammo.getBulletReloadSpeed();

        if (timeNow - bulletReloadSpeed > bulletShot) {

            for (var i = 0; i < bulletsAmount; i++) {

                if (bullets[i].getVisible() === 0) {
                    sb.getAudio().playSound(6, 0);
                    ammo.setBulletShot(timeNow);
                    bullets[i].setVisible(1);
                    bullets[i].setBirthTime(timeNow);
                    bullets[i].setAngle(shooter.getAngleY());
                    bullets[i].setXPos(shooter.getXPos());
                    bullets[i].setZPos(shooter.getZPos());
                    break;
                }
            }
        }
    };

    var getCollisions = function() {
        collisions.length = 0;
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.CollisionComponent) {
                //object is dead. no need to check for collisions

                if (le.components.HealthComponent && le.components.HealthComponent.getAmount() < 1) {
                    continue;
                }

                var c = le.components.CollisionComponent;
                //var r = le.components.RenderableComponent;

                c.setEntity(le);

                collisions.push(c);

            }
        }
    };

    var checkCollision = function(pgc) {

        var bullets = pgc.getBullets();
        for (var i = 0; i < bullets.length; i++) {
            if (bullets[i].getVisible() !== 1) {
                continue;
            }
            for (var j = 0; j < collisions.length; j++) {
                if (j !== i &&
                    bullets[i].getXPos() >= collisions[j].getXPos() - collisions[j].getXWidth() &&
                    bullets[i].getXPos() <= collisions[j].getXPos() + collisions[j].getXWidth() &&
                    bullets[i].getZPos() >= collisions[j].getZPos() - collisions[j].getZWidth() &&
                    bullets[i].getZPos() <= collisions[j].getZPos() + collisions[j].getZWidth() &&
                    collisions[j].getGroup() === 'enemy' && bullets[i].getVisible() === 1) {

                    pubsub.publish('bulletcollision', collisions[j]);

                }
            }
        }

    };

    var createShot = function(le) {

        if (le.components.GunComponent &&
            le.components.GunComponent.getShooting() === 1 &&
            le.components.GunComponent.getActiveWeapon() === 1 &&
            le.components.HealthComponent.getAmount() > 0 &&
            le.components.PulseGunComponent) {

            shootBullet(le.components.PulseGunComponent, le.components.RenderableComponent);
        }

    };

    var moveBullets = function(pgc, deltatime) {
        var timeNow = new Date().getTime();

        var bullets = pgc.getBullets();
        var bulletsAmount = pgc.getBulletsAmount();
        for (var i = 0; i < bulletsAmount; i++) {

            if (timeNow - bullets[i].getDeathtime() > bullets[i].getBirthTime()) {
                bullets[i].setVisible(0);
            }
            else {

                var posX = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.cos(helpers.degToRad(bullets[i].getAngle()));
                var posZ = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.sin(helpers.degToRad(bullets[i].getAngle()));

                bullets[i].setXPos(bullets[i].getXPos() + posX);
                bullets[i].setZPos(bullets[i].getZPos() - posZ);
            }

        }
    };

    var update = function(deltatime) {

        getCollisions();

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            createShot(le);

            if (le.components.PulseGunComponent) {
                var pgc = le.components.PulseGunComponent;
                checkCollision(pgc);

                moveBullets(pgc, deltatime);
            }
        }

    };

    var draw = function(le) {

        //for (var e = 0; e < em.entities.length; e++) {
        //   var le = em.entities[e];

        if (le.components.PulseGunComponent) {
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);

            //var pc = le.components.PhotonTorpedoComponent;
            var ptc = le.components.PulseGunComponent;

            material.setProgram(particleProgram3d);

            var bullets = ptc.getBullets();
            positions.length = 0;
            for (var i = 0; i < ptc.getBulletsAmount(); i++) {

                if (bullets[i].getVisible() !== 1) {
                    continue;
                }

                positions.push(bullets[i].getXPos());
                positions.push(bullets[i].getYPos());
                positions.push(bullets[i].getZPos());

            }
            if (positions.length > 0) {
                camera.mvPushMatrix();
                var mvMatrix = camera.getMVMatrix();
                var sprite = ptc.getSprite();

                gl.bindBuffer(gl.ARRAY_BUFFER, ptc.getPointStartPositionBuffer());
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

                gl.vertexAttribPointer(particleProgram3d.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

                material.useTexture('image');
                /*
                 gl.activeTexture(gl.TEXTURE0);
                 gl.bindTexture(gl.TEXTURE_2D, sprite.getTexture());
                 gl.uniform1i(particleProgram3d.samplerUniform, 0);
                 */

                gl.uniform4f(particleProgram3d.colorUniform, 1, 1, 1, 1);

                gl.uniform1f(particleProgram3d.pointSize, 64.0);

                gl.uniformMatrix4fv(particleProgram3d.uPMatrix, false, camera.getPMatrix());
                gl.uniformMatrix4fv(particleProgram3d.uMVMatrix, false, mvMatrix);

                gl.drawArrays(gl.POINTS, 0, positions.length / 3);
                camera.addDrawCall();

                camera.mvPopMatrix();

            }

            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND);

        }

        //}

    };

    return Object.freeze({update, draw, init});
}