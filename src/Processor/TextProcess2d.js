function text_process_2d_constructor(sb) {
    "use strict";

    //constructor() {

    var shadermanager = sb.getShaderManager();
    var program = shadermanager.useShader("per-fragment-lighting");

    var text = sb.getText();

    var gl = sb.getGL();
    var t = texture_constructor(sb);

    var texture = t.loadedTexture;

    var camera = sb.getCamera();
    var textBuffer = null;
    var rotation = null;
    var currentString = '';

    var vertexPositionBuffer = gl.createBuffer();

    var em = sb.getEntityManager();


    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    //this.squareBuffer.size = textBuffer.length / 5;


    var str = '';
    var characterArray = text.textToC(str);
    var textBuffer = text.buildData(characterArray, true);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

    //}

    var update = function (deltatime, timeSinceStart) {

        currentString = '';
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.TextComponent) {
                var tc = le.components.TextComponent;

                for (var key in tc.texts) {
                    if (tc.texts.hasOwnProperty(key)) {

                        if (parseInt(key, 10) < timeSinceStart) {
                            currentString = tc.texts[key];
                        }

                    }
                }

            }
        }
        if (currentString != '') {
            var str = currentString;
            var characterArray = text.textToC(str);
            textBuffer = text.buildData(characterArray, true);
            //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);
        }


    };


    var draw = function () {

        if (textBuffer == null && currentString != '') {
            return true;
        }

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.TextComponent) {
                shadermanager.setProgram(program);
                camera.mvPushMatrix();


                gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
                gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
                gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);

                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(program.samplerUniform, 0);

                //gl.uniformMatrix4fv(program.uPMatrix, false, camera.pMatrix);
                //gl.uniformMatrix4fv(program.uMVMatrix, false, camera.mvMatrix);


                gl.drawArrays(gl.TRIANGLES, 0, textBuffer.length / 5);

                camera.mvPopMatrix();
            }

        }


    };

    return {
        draw, update, init: function () {
        }
    }
}