function renderprocess_constructor(sb) {

    //let {camera} = params;
    let gl = sb.getGL();
    let camera = sb.getCamera();
    let shadermanager = sb.getShaderManager();
    let shaderprogram = shadermanager.init("per-fragment-lighting");
    let em = sb.getEntityManager();
    // constructor() {

    let deltatime = null;
    let rotation = 0;

    //let shaderProgram = sm.init("per-fragment-lighting");


    //let shadermanager = shader_manager_constuctor();
    //let shaderprogram = shadermanager.init("per-fragment-lighting");


    //}


    let update = function (deltatime, timeFromStart) {


        if (timeFromStart > 2000) {
            for (let e = 0; e < em.entities.length; e++) {
                let le = em.entities[e];
                if (le.components.Visibility && le.components.Visibility.visibility == false) {
                    le.components.Visibility.visibility = true;

                }


            }
        }

        if (rotation > 360)
            rotation = 0;
        rotation += (90 * deltatime) / 1000.0;

    };

    let rotate = function (rc) {
        if (rc.angleY) {
            mat4.rotate(camera.getMVMatrix(), degToRad(rc.angleY), [0, 1, 0]);
        }
        if (rc.angleZ) {
            mat4.rotate(camera.getMVMatrix(), degToRad(rc.angleZ), [0, 0, 1]);
        }
        if (rc.angleX) {
            mat4.rotate(camera.getMVMatrix(), degToRad(rc.angleX), [1, 0, 0]);
        }
    };

    let draw = function () {

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.Renderable && le.components.MeshComponent) {
                /*
                 //we do not render objects wich health is zero
                 if (le.components.HealthComponent && le.components.HealthComponent.amount < 1)
                 continue;
                 if (le.components.Visibility && le.components.Visibility.visibility == false) {
                 continue;
                 }
                 */

                //let rc = le.components.Renderable;
                let mc = le.components.MeshComponent;
                let rc = le.components.Renderable;

                //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                shadermanager.setProgram(shaderprogram);


                // gl.disable(gl.BLEND);
                // gl.enable(gl.DEPTH_TEST);


                gl.uniform1f(shaderprogram.alphaUniform, 1);
                gl.uniform1i(shaderprogram.uDrawColors, 0);

                gl.uniform1i(shaderprogram.uUseLighting, true);
                gl.uniform3f(shaderprogram.uLightPosition, camera.getX(), -1 * camera.getY(), -1 * camera.getZ());
                gl.uniform3f(shaderprogram.uLightAmbient, 0, 0, 0);
                gl.uniform3f(shaderprogram.uLightDiffuse, 0.8, 0.8, 0.8);
                gl.uniform3f(shaderprogram.uLightSpecular, 0.8, 0.8, 0.8);
                gl.uniform1f(shaderprogram.uMaterialShininess, 200.0);

                camera.mvPushMatrix();

                //gl.uniform3fv(this.shaderProgram.uMaterialDiffuse, mc.mesh.diffuse);


                if (le.components.Selectable) {
                    gl.uniform3fv(shaderprogram.uDrawColor, le.components.Selectable.color);
                }
                else {
                    gl.uniform3fv(shaderprogram.uDrawColor, [0.5, 0.5, 0.5]);
                }

                //mat4.translate(camera.getMVMatrix(), [rc.xPos, rc.yPos, rc.zPos]);

                //console.log(rc.angleY);
                rotate(rc);


                if (rc.scale) {
                    mat4.scale(camera.getMVMatrix(), [rc.scale, rc.scale, rc.scale]);
                }


                let xRot = 0;
                let yRot = 0;
                let zRot = 0;

                if (le.components.ConstantRotation && rotation) {


                    if (le.components.ConstantRotation.x > 0) {
                        xRot = 1;
                    }
                    if (le.components.ConstantRotation.y > 0) {
                        yRot = 1;
                    }

                    if (le.components.ConstantRotation.z > 0) {
                        zRot = 1;
                    }
                    mat4.rotate(camera.getMVMatrix(), degToRad(rotation), [xRot, yRot, zRot]);
                }


                // mat4.rotate(camera.getMVMatrix(), degToRad(rotation), [1, 1, 1]);

                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.vertexPositionBuffer);
                gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.normalPositionBuffer);
                gl.vertexAttribPointer(shaderprogram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


                gl.bindBuffer(gl.ARRAY_BUFFER, mc.mesh.texturePositionBuffer);
                gl.vertexAttribPointer(shaderprogram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, mc.mesh.getTexture());
                gl.uniform1i(shaderprogram.samplerUniform, 0);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mc.mesh.indexPositionBuffer);

                gl.uniformMatrix4fv(shaderprogram.uPMatrix, false, camera.getPMatrix());
                gl.uniformMatrix4fv(shaderprogram.uMVMatrix, false, camera.getMVMatrix());

                let normalMatrix = mat3.create();
                mat4.toInverseMat3(camera.getMVMatrix(), normalMatrix);
                mat3.transpose(normalMatrix);
                gl.uniformMatrix3fv(shaderprogram.uNMatrix, false, normalMatrix);


                gl.drawElements(gl.TRIANGLES, mc.mesh.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
                //camera.drawCalls++;
                camera.mvPopMatrix();


            }
        }
    }


    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
        update,
        draw


    });

}