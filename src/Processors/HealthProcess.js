class HealthProcess extends Processor {


    simpleWorldToViewX(x) {
        return x / screenWidth;
    }

    simpleWorldToViewY(y) {

        return y / screenHeight;
    }

    draw() {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.Health) {
                var hp = le.components.Health;
                for (var g = 0; g < hp.amount; g++) {


                    camera.mvPushMatrix();
                    gl.uniform3f(particleProgram.positionUniform, g / 30, 0, 0);
                    gl.bindBuffer(gl.ARRAY_BUFFER, hp.sprite.pointStartPositionsBuffer);
                    gl.vertexAttribPointer(particleProgram.pointStartPositionAttribute, hp.sprite.pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, hp.sprite.texture);
                    gl.uniform1i(particleProgram.samplerUniform, 0);

                    gl.uniform4f(particleProgram.colorUniform, 1, 1, 1, 1);


                    gl.drawArrays(gl.POINTS, 0, 1);


                    camera.mvPopMatrix();
                }

            }

        }

    }


}