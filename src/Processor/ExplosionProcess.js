class ExplosionProcess {
    constructor() {

        pub.subscribe("collision", this.explode);
        this.explosions = [];
        this.particleProgram = sm.init('particle');

    }

    explode(a, b) {


        if ((b[0].group == 'enemy' && b[1].group == 'player') ||
             (b[1].group == 'enemy' && b[0].group == 'player')) {
            this.createNewExplosion();
        }
    }


    update() {

    }

    createNewExplosion() {

    }


    draw() {


        for (var i = 0; i < this.explosions.length; i++) {
            this.mvPushMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[i].pointLifetimeBuffer);
            gl.vertexAttribPointer(this.particleProgram.pointLifetimeAttribute, this.explosions[i].pointLifetimeBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[i].pointStartPositionsBuffer);
            gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, this.explosions[i].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[i].pointEndPositionsBuffer);
            gl.vertexAttribPointer(this.particleProgram.pointEndPositionAttribute, this.explosions[i].pointEndPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(this.particleProgram.samplerUniform, 0);


            //alert(this.particles.asteroidExplosion[i].yPos);
            gl.uniform3f(this.particleProgram.centerPositionUniform, this.simpleWorldToViewX(this.particles.asteroidExplosion[i].xPos), this.simpleWorldToViewY(this.particles.asteroidExplosion[i].yPos), 0);
            gl.uniform4f(this.particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
            gl.uniform1f(this.particleProgram.timeUniform, this.particles.asteroidExplosion[i].time);

            gl.drawArrays(gl.POINTS, 0, his.explosions[i].pointLifetimeBuffer.numItems);
            this.mvPopMatrix();
        }


    }
}




















