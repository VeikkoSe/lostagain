class HealthProcess extends Processor {

    constructor() {
        this.particleProgram = sm.init('particle');
    }


    draw() {

        /*
         for (var e = 0; e < em.entities.length; e++) {
         var le = em.entities[e];

         if (le.components.HealthComponent && le.components.HealthComponent.sprite) {
         //  console.log(le.components.HealthComponent);
         gl.useProgram(this.particleProgram);

         var hp = le.components.HealthComponent;
         for (var g = 0; g < hp.amount; g++) {


         camera.mvPushMatrix();
         gl.uniform3f(this.particleProgram.positionUniform, g / 30, 0, 0);
         gl.bindBuffer(gl.ARRAY_BUFFER, hp.sprite.pointStartPositionsBuffer);
         gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, hp.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, hp.sprite.texture);
         gl.uniform1i(this.particleProgram.samplerUniform, 0);
         gl.uniform1f(this.particleProgram.pointSize, 16.0);

         gl.uniform4f(this.particleProgram.colorUniform, 1, 1, 1, 1);


         gl.drawArrays(gl.POINTS, 0, 1);
         camera.drawCalls++;

         camera.mvPopMatrix();
         }

         }

         }
         */
    }


}