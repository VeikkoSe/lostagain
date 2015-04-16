class ShieldProcess extends Processor {
    constructor() {
        this.particleProgram = sm.init('particle');
    }



    draw() {
        /*

         for (var e = 0; e < em.entities.length; e++) {
         var le = em.entities[e];

         if (le.components.ShieldComponent) {

         gl.useProgram(this.particleProgram);
         var shield = le.components.ShieldComponent;
         for (var g = 0; g < shield.amount; g++) {


         camera.mvPushMatrix();
         gl.uniform3f(this.particleProgram.positionUniform, g / 30, 0, 0);
         gl.bindBuffer(gl.ARRAY_BUFFER, shield.sprite.pointStartPositionsBuffer);
         gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, shield.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_2D, shield.sprite.texture);
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