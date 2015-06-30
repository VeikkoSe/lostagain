function text_process_2d_constructor(sb) {
    //constructor() {

    let shadermanager = sb.getShaderManager();
    let program = shadermanager.init("per-fragment-lighting");

    let text = sb.getText();

    let gl = sb.getGL();
    let t = texture_constructor(sb);

    let texture = t.loadedTexture;
    let textBuffer = null;
    let rotation = null;
    let currentString = '';

    let vertexPositionBuffer = gl.createBuffer();

    let em = sb.getEntityManager();


    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    //this.squareBuffer.size = textBuffer.length / 5;


    let str = '';
    let characterArray = text.textToC(str);
    let textBuffer = text.buildData(characterArray, true);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

    //}

    let update = function (deltatime, timeSinceStart) {

        currentString = '';
        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];
            if (le.components.TextComponent) {
                let tc = le.components.TextComponent;

                for (let key in tc.texts) {
                    if (tc.texts.hasOwnProperty(key)) {

                        if (parseInt(key, 10) < timeSinceStart) {
                            currentString = tc.texts[key];
                        }

                    }
                }

            }
        }
        if (currentString != '') {
            let str = currentString;
            let characterArray = text.textToC(str);
            textBuffer = text.buildData(characterArray, true);
            //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);
        }


    }


    let draw = function () {

        if (textBuffer == null && currentString != '') {
            return true;
        }

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.TextComponent) {
                sm.setProgram(program);
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


    }

    return {
        draw, update, init: function () {
        }
    }
}