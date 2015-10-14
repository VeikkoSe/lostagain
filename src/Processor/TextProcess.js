function TextProcess(sb) {
    'use strict';
    var gl = sb.getGL();

    var camera = sb.getCamera();

    var shadermanager = sb.getShaderManager();
    var program = shadermanager.useShader('font');

    var am = sb.getAssetManager();

    var squareBuffer = gl.createBuffer();
    var sprite;
    var size;
    var text = sb.getText();

    var em = sb.getEntityManager();

    var init = function() {

        //var t = texture_constructor(sb);

        //var text = text_constructor(sb);
        //text.init();

        var str = 'The quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog';

        var characterArray = text.textToC(str);

        var textBuffer = text.buildData(characterArray, true);

        //var texture = t.loadedTexture;
        sprite = am.getSprite('font');

        gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
        size = textBuffer.length / 5;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);
    }

    //}

    var update = function(deltatime) {

    };

    var draw = function(le) {

        //for (var e = 0; e < em.entities.length; e++) {
        //  var le = em.entities[e];

        if (le.components.TextComponent) {

            camera.mvPushMatrix();
            var mvMatrix = camera.getMVMatrix();
            shadermanager.setProgram(program);

            mat4.scale(mvMatrix, [0.2, 0.2, 0.2]);

            gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
            gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
            gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, sprite.getTexture());
            gl.uniform1i(program.samplerUniform, 0);

            gl.uniformMatrix4fv(program.uPMatrix, false, camera.getPMatrix());
            gl.uniformMatrix4fv(program.uMVMatrix, false, mvMatrix);

            gl.drawArrays(gl.TRIANGLES, 0, size);
            camera.addDrawCall();
            camera.mvPopMatrix();
        }

        // }

    };
    return {
        draw, update, init
    }
}