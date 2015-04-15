class PhotonTorpedoProcess extends Processor {
    constructor() {
        this.bulletsAmount = 80;
        this.bulletReloadSpeed = 250;
        this.bullets = [];
        this.bulletShot = 0;
        this.lastTime = 0;
        //this.particleProgram = sm.init('particle');
        this.particleProgram3d = sm.init('particle3d');
        //this.bulletMesh = new Mesh('bigbullet');

        var bullet;
        for (var i = 0; i < this.bulletsAmount; i++) {
            var bullet = new PhotonTorpedo();
            //bullet.bulletModel = this.bulletMesh;
            this.bullets.push(bullet);
        }
    }

    shootBullet(renderable) {

        var timeNow = new Date().getTime();

        if (timeNow - this.bulletReloadSpeed > this.bulletShot) {


            for (var i = 0; i < this.bulletsAmount; i++) {

                if (this.bullets[i].visible == 0) {

                    this.bulletShot = timeNow;
                    this.bullets[i].visible = 1;
                    this.bullets[i].birthTime = timeNow;
                    this.bullets[i].angle = renderable.angleY;
                    this.bullets[i].xPos = renderable.xPos;
                    this.bullets[i].zPos = renderable.zPos;
                    break;
                }
            }
        }
    }

    update(deltatime) {

        var timeNow = new Date().getTime();
        //var timeNow = new Date().getTime();

        //if (this.lastTime != 0) {
        // var elapsed = timeNow - this.lastTime;
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.GunComponent && le.components.GunComponent.shooting && le.components.GunComponent.activeWeapon == 1) {

                this.shootBullet(le.components.Renderable);
            }
        }
        for (var i = 0; i < this.bulletsAmount; i++) {

            if (timeNow - this.bullets[i].deathtime > this.bullets[i].birthTime) {
                this.bullets[i].visible = 0;
            }
            else {

                //console.log(this.bullets[i].angle);
                //console.log(this.bullets[i].speed);
                //console.log(deltatime);
                var posX = this.bullets[i].speed * ( deltatime / 1000.0 ) * Math.cos(helpers.degToRad(this.bullets[i].angle));
                var posZ = this.bullets[i].speed * ( deltatime / 1000.0 ) * Math.sin(helpers.degToRad(this.bullets[i].angle));

                this.bullets[i].xPos += posX;
                this.bullets[i].zPos -= posZ;
            }

            //if (this.bullets[i].xPos > screenWidth) {
            //this.bullets[i].xPos = -1 * screenWidth;


            //if (this.bullets[i].yPos > screenHeight) {
            //this.bullets[i].yPos = -1 * screenHeight;
            //}

            //if (this.bullets[i].xPos < -1 * screenWidth) {
            //this.bullets[i].xPos = screenWidth;
            //}
            //if (this.bullets[i].yPos < -1 * screenHeight) {
            //this.bullets[i].yPos = screenHeight;
            //}
        }
        //  }
        // this.lastTime = timeNow;
    }


    draw() {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.PhotonTorpedoComponent) {
                gl.disable(gl.DEPTH_TEST);
                gl.useProgram(this.particleProgram3d);

                gl.enable(gl.BLEND);

                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);


                for (var i = 0; i < this.bulletsAmount; i++) {

                    if (this.bullets[i].visible != 1) {
                        continue;
                    }

//
                    var bc = le.components.PhotonTorpedoComponent;
                    gl.uniform1f(this.particleProgram3d.pointSize, 64.0);
                    camera.mvPushMatrix();


                    gl.uniform3f(this.particleProgram3d.positionUniform, this.bullets[i].xPos, 0, this.bullets[i].zPos);
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
    }


    checkHit() {

        for (var i = 0; i < this.bulletsAmount; i++) {
            for (var j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {

                if (this.bullets[i].visible == 1 && game.stateEngine.gameState.asteroids.asteroids[j].visible == 1 && this.bullets[i].xPos > game.stateEngine.gameState.asteroids.asteroids[j].xPos - 4 && this.bullets[i].xPos < game.stateEngine.gameState.asteroids.asteroids[j].xPos + 4 &&
                    this.bullets[i].yPos > game.stateEngine.gameState.asteroids.asteroids[j].yPos - 4 && this.bullets[i].yPos < game.stateEngine.gameState.asteroids.asteroids[j].yPos + 4
                ) {
                    game.stateEngine.gameState.asteroids.asteroids[j].visible = 0;
                    game.stateEngine.gameState.asteroids.amountshot++;
                    this.bullets[i].visible = 0;
                    game.shotAsteroids++;

                    game.stateEngine.gameState.particles.newAsteroidExplosion(this.bullets[i].yPos, this.bullets[i].xPos);


                }
            }
        }
        if (game.stateEngine.gameState.asteroids.asteroids.length == game.stateEngine.gameState.asteroids.amountshot) {

            for (var j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {
                game.stateEngine.gameState.asteroids.asteroids[j].visible = 1;
            }
            game.stateEngine.gameState.asteroids.amountshot = 0;
            game.stateEngine.gameState.asteroids.addnew(2);
        }

    }
}