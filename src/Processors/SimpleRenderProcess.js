class SimpleRenderProcess extends Processor {
    constructor() {


    }

    draw() {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.Renderable && le.components.MeshComponent) {

                var rc = le.components.Renderable;
                var mc = le.components.MeshComponent;

                camera.mvPushMatrix();

                gl.uniform3fv(shaderProgram.uMaterialDiffuse, mc.mesh.diffuse);


                if (le.components.Selectable) {

                    gl.uniform3fv(shaderProgram.uDrawColor, le.components.Selectable.color);
                }
                else {

                    gl.uniform3fv(shaderProgram.uDrawColor, [0.5, 0.5, 0.5]);
                }

                mat4.translate(camera.mvMatrix, [rc.xPos, rc.yPos, rc.zPos]);

                mat4.rotate(camera.mvMatrix, helpers.degToRad(rc.angleX), [1, 0, 0]);
                mat4.rotate(camera.mvMatrix, helpers.degToRad(rc.angleY), [0, 1, 0]);
                mat4.rotate(camera.mvMatrix, helpers.degToRad(rc.angleZ), [0, 0, 1]);

                if (rc.scale != 1) {
                    mat4.scale(camera.mvMatrix, [rc.scale, rc.scale, rc.scale]);
                }


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.vertexPositionBuffer);
                gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.normalPositionBuffer);
                gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.texturePositionBuffer);
                gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, mc.mesh.texture);
                gl.uniform1i(shaderProgram.samplerUniform, 0);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mc.mesh.indexPositionBuffer);

                helpers.setMatrixUniforms();
//gl.drawElements(gl.LINES, fm.mesh.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
                gl.drawElements(gl.TRIANGLES, mc.mesh.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
// gl.disable(gl.BLEND);
                camera.mvPopMatrix();

            }
        }
    }
}