function gunprocess_constructor(sb) {
    //constructor() {

    let gl = sb.getGL();
    let shadermanager = sb.getShaderManager();
    let particleProgram3d = shadermanager.useShader("particle3d");

    let bulletsAmount = 80;
    let bulletReloadSpeed = 250;
    let bullets = [];
    let bulletShot = 0;
    let lastTime = 0;
    let camera = sb.getCamera();
    // let particleProgram3d = sm.init('particle3d');
    let em = sb.getEntityManager();
    let collisions = [];

    //    let bullet;
    let init = function () {
        for (let i = 0; i < bulletsAmount; i++) {
            let bullet = photontorpedo_constructor();
            bullets.push(bullet);
        }
    }


    //}

    let shootBullet = function (renderable) {


        let timeNow = new Date().getTime();

        if (timeNow - bulletReloadSpeed > bulletShot) {

            for (let i = 0; i < bulletsAmount; i++) {

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
    }


    let update = function (deltatime) {

/*
        collisions = [];
        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];
            if (le.components.CollisionComponent) {
                //object is dead. no need to check for collisions

                if (le.components.HealthComponent && le.components.HealthComponent.amount < 1) {
                    continue;
                }

                let c = le.components.CollisionComponent;
                let r = le.components.RenderableComponent;

                c.entity = le;


                collisions.push(c);

            }
        }

*/
        /*
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < collisions.length; j++) {
                if (j != i &&
                    bullets[i].xPos > collisions[j].xPos - collisions[j].xWidth &&
                    bullets[i].xPos < collisions[j].xPos + collisions[j].xWidth &&
                    bullets[i].zPos > collisions[j].zPos - collisions[j].zWidth &&
                    bullets[i].zPos < collisions[j].zPos + collisions[j].zWidth
                    && collisions[j].group == 'enemy' && bullets[i].visible == 1) {


                    sb.publish("bulletcollision", collisions[j]);

                }
            }


            //console.log(collisions);

        }
        */


        let timeNow = new Date().getTime();

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.GunComponent &&
                le.components.GunComponent.getShooting()===1 &&
                le.components.GunComponent.getActiveWeapon() === 1 &&
                le.components.HealthComponent.getAmount() > 0) {

                shootBullet(le.components.RenderableComponent);
            }
        }
        for (let i = 0; i < bulletsAmount; i++) {

            if (timeNow - bullets[i].getDeathtime() > bullets[i].getBirthTime()) {
                bullets[i].setVisible(0);
            }
            else {
                let posX = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.cos(degToRad(bullets[i].getAngle()));
                let posZ = bullets[i].getSpeed() * ( deltatime / 1000.0 ) * Math.sin(degToRad(bullets[i].getAngle()));

                bullets[i].setXPos(bullets[i].getXPos() + posX);
                bullets[i].setZPos(bullets[i].getZPos() - posZ);
            }


        }

    }


    let draw = function () {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.PhotonTorpedoComponent) {
                gl.disable(gl.DEPTH_TEST);
                //sm.setProgram(particleProgram3d);
                shadermanager.setProgram(particleProgram3d);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);


                let mvMatrix = camera.getMVMatrix();
                for (let i = 0; i < bulletsAmount; i++) {

                    if (bullets[i].getVisible() != 1) {
                        continue;
                    }


                    let bc = le.components.PhotonTorpedoComponent;
                    gl.uniform1f(particleProgram3d.pointSize, 64.0);
                    camera.mvPushMatrix();

                    gl.uniform3f(particleProgram3d.positionUniform, bullets[i].getXPos(), bullets[i].getYPos(), bullets[i].getZPos());
                    gl.bindBuffer(gl.ARRAY_BUFFER, bc.sprite.buffer);

                    gl.vertexAttribPointer(particleProgram3d.pointStartPositionAttribute, bc.sprite.itemSize, gl.FLOAT, false, 0, 0);


                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, bc.sprite.texture);
                    gl.uniform1i(particleProgram3d.samplerUniform, 0);

                    gl.uniform4f(particleProgram3d.colorUniform, 1, 1, 1, 1);


                    gl.uniformMatrix4fv(particleProgram3d.uPMatrix, false, camera.getPMatrix());
                    gl.uniformMatrix4fv(particleProgram3d.uMVMatrix, false, mvMatrix);


                    gl.drawArrays(gl.POINTS, 0, 1);
                    camera.drawCalls++;

                    camera.mvPopMatrix();
                }
                gl.enable(gl.DEPTH_TEST);

            }
        }
        gl.disable(gl.BLEND);
    }

/*
    let checkHit = function () {

        for (let i = 0; i < bulletsAmount; i++) {
            for (let j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {

                if (bullets[i].visible == 1 && game.stateEngine.gameState.asteroids.asteroids[j].visible == 1 && bullets[i].xPos > game.stateEngine.gameState.asteroids.asteroids[j].xPos - 4 && bullets[i].xPos < game.stateEngine.gameState.asteroids.asteroids[j].xPos + 4 &&
                    bullets[i].yPos > game.stateEngine.gameState.asteroids.asteroids[j].yPos - 4 && bullets[i].yPos < game.stateEngine.gameState.asteroids.asteroids[j].yPos + 4
                ) {
                    game.stateEngine.gameState.asteroids.asteroids[j].visible = 0;
                    game.stateEngine.gameState.asteroids.amountshot++;
                    bullets[i].visible = 0;
                    game.shotAsteroids++;

                    game.stateEngine.gameState.particles.newAsteroidExplosion(bullets[i].yPos, bullets[i].xPos);


                }
            }
        }
        if (game.stateEngine.gameState.asteroids.asteroids.length == game.stateEngine.gameState.asteroids.amountshot) {

            for (let j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {
                game.stateEngine.gameState.asteroids.asteroids[j].visible = 1;
            }
            game.stateEngine.gameState.asteroids.amountshot = 0;
            game.stateEngine.gameState.asteroids.addnew(2);
        }

    }
    */

    return {update, draw, init}
}