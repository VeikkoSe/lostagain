function gunprocess_constructor(sb) {
    "use strict";

    //constructor() {
    var sb = sb;
    var gl = sb.getGL();
    var shadermanager = sb.getShaderManager();
    var particleProgram3d = shadermanager.useShader("particle3d");

    var bulletsAmount = 80;
    var bulletReloadSpeed = 250;
    var bullets = [];
    var bulletShot = 0;
    //var lastTime = 0;
    var camera = sb.getCamera();
    // var particleProgram3d = sm.init('particle3d');
    var em = sb.getEntityManager();
    var collisions = [];


    //    var bullet;
    var init = function () {
        for (var i = 0; i < bulletsAmount; i++) {
            var bulVar = photontorpedo_constructor();
            bullets.push(bulVar);
        }
    };

    //}

    var shootBullet = function (renderable) {


        var timeNow = new Date().getTime();

        if (timeNow - bulletReloadSpeed > bulletShot) {

            for (var i = 0; i < bulletsAmount; i++) {

                if (bullets[i].getVisible() === 0) {

                    bulletShot = timeNow;
                    bullets[i].setVisible(1);
                    bullets[i].setBirthTime(timeNow);
                    bullets[i].setAngle(renderable.getAngleY());
                    bullets[i].setXPos(renderable.getXPos());
                    bullets[i].setZPos(renderable.getZPos());
                    break;
                }
            }
        }
    };


    var update = function (deltatime) {


        collisions = [];
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


        for (var i = 0; i < bullets.length; i++) {
            for (var j = 0; j < collisions.length; j++) {
                if (j != i &&
                    bullets[i].getXPos() > collisions[j].getXPos() - collisions[j].getXWidth() &&
                    bullets[i].getXPos() < collisions[j].getXPos() + collisions[j].getXWidth() &&
                    bullets[i].getZPos() > collisions[j].getZPos() - collisions[j].getZWidth() &&
                    bullets[i].getZPos() < collisions[j].getZPos() + collisions[j].getZWidth()
                    && collisions[j].getGroup() == 'enemy' && bullets[i].getVisible() == 1) {


                    sb.publish("bulletcollision", collisions[j]);

                }
            }
        }


        var timeNow = new Date().getTime();

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.GunComponent &&
                le.components.GunComponent.getShooting() === 1 &&
                le.components.GunComponent.getActiveWeapon() === 1 &&
                le.components.HealthComponent.getAmount() > 0) {

                shootBullet(le.components.RenderableComponent);
            }
        }
        for (var i = 0; i < bulletsAmount; i++) {

            if (timeNow - bullets[i].getDeathtime() > bullets[i].getBirthTime()) {
                bullets[i].setVisible(0);
            }
            else {

                var posX = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.cos(degToRad(bullets[i].getAngle()));
                var posZ = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.sin(degToRad(bullets[i].getAngle()));

                bullets[i].setXPos(bullets[i].getXPos() + posX);
                bullets[i].setZPos(bullets[i].getZPos() - posZ);
            }


        }

    };


    var draw = function () {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.PhotonTorpedoComponent) {
                //gl.disable(gl.DEPTH_TEST);

                shadermanager.setProgram(particleProgram3d);
                //gl.enable(gl.BLEND);
                //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);


                var mvMatrix = camera.getMVMatrix();
                for (var i = 0; i < bulletsAmount; i++) {

                    if (bullets[i].getVisible() != 1) {
                        continue;
                    }


                    var bc = le.components.PhotonTorpedoComponent;

                    gl.uniform1f(particleProgram3d.pointSize, 64.0);
                    camera.mvPushMatrix();
                    var sprite = bc.getSprite();

                    var pointStartPositionsBuffer = gl.createBuffer();

                    //build buffers
                    var position = [];


                    //cant create buffer on every loop. Need to create one buffer for every bullet.
                    position.push(bullets[i].getXPos());
                    position.push(bullets[i].getYPos());
                    position.push(bullets[i].getZPos());

                    gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);


                    gl.vertexAttribPointer(particleProgram3d.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, sprite.getTexture());
                    gl.uniform1i(particleProgram3d.samplerUniform, 0);

                    gl.uniform4f(particleProgram3d.colorUniform, 1, 1, 1, 1);


                    gl.uniformMatrix4fv(particleProgram3d.uPMatrix, false, camera.getPMatrix());
                    gl.uniformMatrix4fv(particleProgram3d.uMVMatrix, false, mvMatrix);


                    gl.drawArrays(gl.POINTS, 0, 1);
                    //camera.drawCalls++;

                    camera.mvPopMatrix();
                }
                //gl.enable(gl.DEPTH_TEST);
                //gl.disable(gl.BLEND);
            }
        }

    };


    return {update, draw, init}
}