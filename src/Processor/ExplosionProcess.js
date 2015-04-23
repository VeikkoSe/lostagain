class ExplosionProcess {
    constructor() {
        var that = this;
        pub.subscribe("collision", function(name,collisionComponents) {

                if ((collisionComponents[0].group == 'enemy' && collisionComponents[1].group == 'player') ||
                    (collisionComponents[1].group == 'enemy' && collisionComponents[0].group == 'player')) {

                    that.createNewExplosion(that,collisionComponents[0].xPos,collisionComponents[0].zPos);
                }

        });
        this.explosions = [];
        this.particleProgram = sm.init('lifetimeparticle');

        this.texture = new Texture('smoke');

    }






    simpleWorldToViewX(x) {
        return  x / resolutionWidth;
    }

    simpleWorldToViewY(y) {

        return  y / resolutionHeight;
    }

    update(elapsed) {

        for (var i = 0; i < this.explosions.length; i++) {
            if(this.explosions[i].time>5)
                this.explosions.splice(i,1);
            else {
                this.explosions[i].time += elapsed / 3000;
            }
        }

    }



    createNewExplosion(obj,x, z) {
        //slow
        var particle = new AsteroidExplosion(x,z);



        obj.explosions.push(particle);

    }

    draw() {

            sm.setProgram( this.particleProgram );

            for (var i = 0; i < this.explosions.length; i++) {
                camera.mvPushMatrix();

                gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[i].pointLifetimeBuffer);
                gl.vertexAttribPointer(this.particleProgram.pointLifetimeAttribute, this.explosions[i].pointLifetimeBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[i].pointStartPositionsBuffer);
                gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, this.explosions[i].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.explosions[i].pointEndPositionsBuffer);
                gl.vertexAttribPointer(this.particleProgram.pointEndPositionAttribute, this.explosions[i].pointEndPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);



                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.texture.loadedTexture);
                gl.uniform1i(this.particleProgram.samplerUniform, 0);


                gl.uniformMatrix4fv(this.particleProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.particleProgram.uMVMatrix, false, camera.mvMatrix);


                //gl.uniform3f(this.particleProgram.centerPositionUniform, this.explosions[i].xPos, 0, this.explosions[i].zPos);
                gl.uniform3f(this.particleProgram.centerPositionUniform, 0, 0,0);
                gl.uniform4f(this.particleProgram.colorUniform, 1, 0.5, 0.1, 0.7);
                gl.uniform1f(this.particleProgram.timeUniform, this.explosions[i].time);

                gl.drawArrays(gl.POINTS, 0, this.explosions[i].pointLifetimeBuffer.numItems);
                camera.mvPopMatrix();
            }



    }
}




















