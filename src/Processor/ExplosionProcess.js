class ExplosionProcess {
    constructor() {
        /*
        this.numParticles = 500;
        this.lifetimes = [];
        this.startPositions = [];
        this.endPositions = [];
        for (var i = 0; i < this.numParticles; i++) {
            this.lifetimes.push(Math.random());

            this.startPositions.push((Math.random() * 0.25) - 0.125);
            this.startPositions.push((Math.random() * 0.25) - 0.125);
            this.startPositions.push((Math.random() * 0.25) - 0.125);

            this.endPositions.push((Math.random() * 2) - 1);
            this.endPositions.push((Math.random() * 2) - 1);
            this.endPositions.push((Math.random() * 2) - 1);
        }


        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointLifetimeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.lifetimes), gl.STATIC_DRAW);
        this.pointLifetimeBuffer.itemSize = 1;
        this.pointLifetimeBuffer.numItems = this.numParticles;


        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.startPositions), gl.STATIC_DRAW);
        this.pointStartPositionsBuffer.itemSize = 3;
        this.pointStartPositionsBuffer.numItems = this.numParticles;


        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointEndPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.endPositions), gl.STATIC_DRAW);
        this.pointEndPositionsBuffer.itemSize = 3;
        this.pointEndPositionsBuffer.numItems = this.numParticles;
*/

    }

    update() {

    }


    draw() {
/*
        for (var i = 0; i < this.particles.asteroidExplosion.length; i++) {
            this.mvPushMatrix();

            gl.bindBuffer(gl.ARRAY_BUFFER, this.particles.asteroidExplosion[i].pointLifetimeBuffer);
            gl.vertexAttribPointer(particleProgram.pointLifetimeAttribute, this.particles.asteroidExplosion[i].pointLifetimeBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.particles.asteroidExplosion[i].pointStartPositionsBuffer);
            gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, this.particles.asteroidExplosion[i].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.particles.asteroidExplosion[i].pointEndPositionsBuffer);
            gl.vertexAttribPointer(particleProgram.pointEndPositionAttribute, this.particles.asteroidExplosion[i].pointEndPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.particles.asteroidTexture);
            gl.uniform1i(particleProgram.samplerUniform, 0);


            //alert(this.particles.asteroidExplosion[i].yPos);
            gl.uniform3f(particleProgram.centerPositionUniform, this.simpleWorldToViewX(this.particles.asteroidExplosion[i].xPos), this.simpleWorldToViewY(this.particles.asteroidExplosion[i].yPos), 0);
            gl.uniform4f(particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
            gl.uniform1f(particleProgram.timeUniform, this.particles.asteroidExplosion[i].time);

            gl.drawArrays(gl.POINTS, 0, this.particles.asteroidExplosion[i].pointLifetimeBuffer.numItems);
            camera.drawCalls++;
            this.mvPopMatrix();
        }
*/

    }
}



















