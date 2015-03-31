class GunProcess {
    constructor() {
        this.bulletsAmount = 80;
        this.bulletReloadSpeed = 50;
        this.bullets = [];
        this.bulletShot = 0;
        this.lastTime = 0;
        //this.bulletMesh = new Mesh('bigbullet');
        /*
         var bullet;
         for (var i = 0; i < this.bulletsAmount; i++) {
         bullet = new Bullet();
         bullet.bulletModel = this.bulletMesh;
         this.bullets.push(bullet);
         }*/
    }

    shootBullet() {
        var timeNow = new Date().getTime();

        if (timeNow - this.bulletReloadSpeed > this.bulletShot) {


            for (var i = 0; i < this.bulletsAmount; i++) {

                if (this.bullets[i].visible == 0) {
                    this.bulletShot = timeNow;
                    this.bullets[i].visible = 1;
                    this.bullets[i].birthTime = timeNow;
                    this.bullets[i].angle = game.stateEngine.gameState.ship.angle;
                    this.bullets[i].xPos = game.stateEngine.gameState.ship.xPos;
                    this.bullets[i].yPos = game.stateEngine.gameState.ship.yPos;
                    break;
                }
            }
        }
    }

    update(deltatime) {

        //var timeNow = new Date().getTime();

//        if (this.lastTime != 0) {
        //  var elapsed = timeNow - this.lastTime;

        for (var i = 0; i < this.bulletsAmount; i++) {

            // if (timeNow - this.bullets[i].deathtime > this.bullets[i].birthTime)
            //     this.bullets[i].visible = 0;

            //var posX = this.bullets[i].speed * ( elapsed / 1000.0 ) * Math.cos(helpers.degToRad(this.bullets[i].angle));
            //var posY = this.bullets[i].speed * ( elapsed / 1000.0 ) * Math.sin(helpers.degToRad(this.bullets[i].angle));

            // this.bullets[i].xPos += posX;
            // this.bullets[i].yPos += posY;
            /*
             if (this.bullets[i].xPos > screenWidth) {
             this.bullets[i].xPos = -1 * screenWidth;
             }

             if (this.bullets[i].yPos > screenHeight) {
             this.bullets[i].yPos = -1 * screenHeight;
             }

             if (this.bullets[i].xPos < -1 * screenWidth) {
             this.bullets[i].xPos = screenWidth;
             }
             if (this.bullets[i].yPos < -1 * screenHeight) {
             this.bullets[i].yPos = screenHeight;
             }*/
        }
        //  }
        // this.lastTime = timeNow;
    }


    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.BulletComponent) {

                var bc = le.components.BulletComponent;
                gl.uniform1f(particleProgram.pointSize, 64.0);
                //camera.mvPushMatrix();
                //mat4.scale(camera.mvMatrix, [6, 6, 6]);
                gl.uniform3f(particleProgram.positionUniform, 19, 19, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, bc.sprite.pointStartPositionsBuffer);
                gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, bc.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, bc.sprite.texture);
                gl.uniform1i(particleProgram.samplerUniform, 0);

                gl.uniform4f(particleProgram.colorUniform, 1, 1, 1, 1);


                gl.drawArrays(gl.POINTS, 0, 1);


                //camera.mvPopMatrix();


            }
        }

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