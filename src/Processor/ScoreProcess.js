function ScoreProcess(sb) {
    'use strict';

    var shadermanager = sb.getShaderManager();
    var program = shadermanager.useShader('gui');

    var text = sb.getText();

    var gl = sb.getGL();

    var am = sb.getAssetManager();
    //var t = texture_constructor(sb);

    //var texture = t.loadedTexture;

    //var camera = sb.getCamera();
    var textBuffer, rotation, characterArray;
    var currentString = '';
    var sprite;

    var vertexPositionBuffer = gl.createBuffer();

    var em = sb.getEntityManager();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    //this.squareBuffer.size = textBuffer.length / 5;

    var str = '';

    var init = function() {
        characterArray = text.textToC(str);

        textBuffer = text.buildData(characterArray, true);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

        sprite = am.getSprite('font', true);

    };

    var update = function(deltatime, timeSinceStart) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.TextComponent) {

                var tc = le.components.TextComponent;
                var texts = tc.getTexts();

                for (var key in texts) {
                    if (texts.hasOwnProperty(key)) {

                        if (parseInt(key, 10) < timeSinceStart) {
                            currentString = texts[key];
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

    var draw = function(le) {

        if (textBuffer == null && currentString != '') {
            return true;
        }

        //for (var e = 0; e < em.entities.length; e++) {
        //   var le = em.entities[e];

        if (le.components.TextComponent) {

            shadermanager.setProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
            gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
            gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, sprite.getTexture());
            gl.uniform1i(program.samplerUniform, 0);

            gl.drawArrays(gl.TRIANGLES, 0, textBuffer.length / 5);
            camera.addDrawCall();
            //camera.mvPopMatrix();
        }

        //}

    };

    return {
        draw, update, init
    }
}