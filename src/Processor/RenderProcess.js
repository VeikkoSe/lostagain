class RenderProcess extends Processor {
    constructor() {
        this.deltatime = null;
        this.rotation = null;

        this.shaderProgram = sm.init("per-fragment-lighting");

    }


    update(deltatime) {
        if (this.rotation > 360)
            this.rotation = 0;
        this.rotation += (90 * deltatime) / 1000.0;

    }

    draw() {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            //we do not render objects wich health is zero
            if (le.components.HealthComponent && le.components.HealthComponent.amount < 1)
                continue;

            if (le.components.Renderable && le.components.MeshComponent) {

                sm.setProgram(this.shaderProgram);


                gl.uniform1f(this.shaderProgram.alphaUniform, 1);
                gl.uniform1i(this.shaderProgram.uDrawColors, 0);

                gl.uniform1i(this.shaderProgram.uUseLighting, true);
                gl.uniform3f(this.shaderProgram.uLightPosition, camera.x, -1 * camera.y, -1 * camera.z);
                gl.uniform3f(this.shaderProgram.uLightAmbient, 0, 0, 0);
                gl.uniform3f(this.shaderProgram.uLightDiffuse, 0.8, 0.8, 0.8);
                gl.uniform3f(this.shaderProgram.uLightSpecular, 0.8, 0.8, 0.8);
                gl.uniform1f(this.shaderProgram.uMaterialShininess, 200.0);


                var rc = le.components.Renderable;
                var mc = le.components.MeshComponent;

                camera.mvPushMatrix();

                gl.uniform3fv(this.shaderProgram.uMaterialDiffuse, mc.mesh.diffuse);


                if (le.components.Selectable) {
                    gl.uniform3fv(this.shaderProgram.uDrawColor, le.components.Selectable.color);
                }
                else {
                    gl.uniform3fv(this.shaderProgram.uDrawColor, [0.5, 0.5, 0.5]);
                }

                mat4.translate(camera.mvMatrix, [rc.xPos, rc.yPos, rc.zPos]);

                //console.log(rc.angleY);
                mat4.rotate(camera.mvMatrix, helpers.degToRad(rc.angleY), [0, 1, 0]);
                mat4.rotate(camera.mvMatrix, helpers.degToRad(rc.angleZ), [0, 0, 1]);
                mat4.rotate(camera.mvMatrix, helpers.degToRad(rc.angleX), [1, 0, 0]);


                if (rc.scale != 1) {
                    mat4.scale(camera.mvMatrix, [rc.scale, rc.scale, rc.scale]);
                }
                var xRot = 0;
                var yRot = 0;
                var zRot = 0;
                if (le.components.ConstantRotation && this.rotation) {
                    if (le.components.ConstantRotation.x > 0) {
                        xRot = 1;
                    }
                    if (le.components.ConstantRotation.y > 0) {
                        yRot = 1;
                    }

                    if (le.components.ConstantRotation.z > 0) {
                        zRot = 1;
                    }
                    mat4.rotate(camera.mvMatrix, helpers.degToRad(this.rotation), [xRot, yRot, zRot]);
                }


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.vertexPositionBuffer);
                gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.normalPositionBuffer);
                gl.vertexAttribPointer(this.shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.texturePositionBuffer);
                gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, mc.mesh.texture);
                gl.uniform1i(this.shaderProgram.samplerUniform, 0);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mc.mesh.indexPositionBuffer);

                gl.uniformMatrix4fv(this.shaderProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.shaderProgram.uMVMatrix, false, camera.mvMatrix);

                var normalMatrix = mat3.create();
                mat4.toInverseMat3(camera.mvMatrix, normalMatrix);
                mat3.transpose(normalMatrix);
                gl.uniformMatrix3fv(this.shaderProgram.uNMatrix, false, normalMatrix);


                gl.drawElements(gl.TRIANGLES, mc.mesh.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
                camera.drawCalls++;
                camera.mvPopMatrix();

            }
        }
    }
}