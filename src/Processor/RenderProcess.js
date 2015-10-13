function renderprocess_constructor(sb) {
    'use strict';

    //var {camera} = params;
    var gl = sb.getGL();
    var camera = sb.getCamera();
    var shadermanager = sb.getShaderManager();
    var shaderprogram = shadermanager.useShader("per-fragment-lighting");
    var em = sb.getEntityManager();
    // constructor() {

    var deltatime = null;
    var rotation = 0;

    //var shaderProgram = sm.init("per-fragment-lighting");

    //var shadermanager = shader_manager_constuctor();
    //var shaderprogram = shadermanager.init("per-fragment-lighting");

    //}

    var update = function(deltatime, timeFromStart) {

        if (timeFromStart > 2000) {
            for (var e = 0; e < em.entities.length; e++) {
                var le = em.entities[e];
                if (le.components.Visibility && le.components.Visibility.visibility == false) {
                    le.components.Visibility.visibility = true;

                }

            }
        }

        if (rotation > 360)
            rotation = 0;
        rotation += (90 * deltatime) / 1000.0;

    };

    var draw = function(le) {

        if (le.components.RenderableComponent && le.components.MeshComponent) {

            camera.mvPushMatrix();
            var mvMatrix = camera.getMVMatrix();

            //we do not render objects wich health is zero
            if (le.components.HealthComponent && le.components.HealthComponent.getAmount() < 1)
                return;

            //if (le.components.Visibility && le.components.Visibility.visibility == false) {
            //    continue;
            //}

            //var rc = le.components.Renderable;
            var mc = le.components.MeshComponent;
            var rc = le.components.RenderableComponent;

            //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            shadermanager.setProgram(shaderprogram);

            gl.uniform1f(shaderprogram.alphaUniform, 1);
            gl.uniform1i(shaderprogram.uDrawColors, 0);

            gl.uniform1i(shaderprogram.uUseLighting, 1);
            //model coordinates
            gl.uniform3f(shaderprogram.uLightPosition, 100, 20, 100);
            gl.uniform3f(shaderprogram.uLightAmbient, 0, 0, 0);
            gl.uniform3f(shaderprogram.uLightDiffuse, 0.8, 0.8, 0.8);
            gl.uniform3f(shaderprogram.uLightSpecular, 0.8, 0.8, 0.8);
            gl.uniform1f(shaderprogram.uMaterialShininess, 200.0);



            //gl.uniform3fv(this.shaderProgram.uMaterialDiffuse, mc.mesh.diffuse);

            if (le.components.SelectableComponent) {
                gl.uniform3fv(shaderprogram.uDrawColor, le.components.SelectableComponent.getColor());
            }
            else {
                gl.uniform3fv(shaderprogram.uDrawColor, [0.5, 0.5, 0.5]);
            }

            mat4.translate(mvMatrix, [rc.getXPos(), rc.getYPos(), rc.getZPos()]);

            mat4.rotate(mvMatrix, degToRad(rc.getAngleY()), [0, 1, 0]);
            mat4.rotate(mvMatrix, degToRad(rc.getAngleZ()), [0, 0, 1]);
            mat4.rotate(mvMatrix, degToRad(rc.getAngleX()), [1, 0, 0]);

            if (rc.getScale() !== 1) {
                mat4.scale(mvMatrix, [rc.getScale(), rc.getScale(), rc.getScale()]);
            }

            var xRot = 0;
            var yRot = 0;
            var zRot = 0;

            if (le.components.RotationComponent && rotation) {

                if (le.components.RotationComponent.getX() > 0) {
                    xRot = 1;
                }
                if (le.components.RotationComponent.getY() > 0) {
                    yRot = 1;
                }

                if (le.components.RotationComponent.getZ() > 0) {
                    zRot = 1;
                }
                mat4.rotate(camera.getMVMatrix(), degToRad(rotation), [xRot, yRot, zRot]);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, mc.getMesh().getVertexPositionBuffer());
            gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, mc.getMesh().getNormalPositionBuffer());
            gl.vertexAttribPointer(shaderprogram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, mc.getMesh().getTexturePositionBuffer());
            gl.vertexAttribPointer(shaderprogram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, mc.getMesh().getTexture());
            gl.uniform1i(shaderprogram.samplerUniform, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mc.getMesh().getIndexPositionBuffer());

            gl.uniformMatrix4fv(shaderprogram.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(shaderprogram.uMVMatrix, false, mvMatrix);

            var normalMatrix = mat3.create();
            mat4.toInverseMat3(mvMatrix, normalMatrix);
            mat3.transpose(normalMatrix);
            gl.uniformMatrix3fv(shaderprogram.uNMatrix, false, normalMatrix);

            gl.drawElements(gl.TRIANGLES, mc.getMesh().getIndexPositionBuffer().numItems, gl.UNSIGNED_SHORT, 0);
            camera.addDrawCall();
            camera.mvPopMatrix();

        }
    };

    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        update,
        draw,
        init: function() {
        }

    });

}