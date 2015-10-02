function text_process_constructor(sb) {
    "use strict";

    //constructor() {

    var fontProgram = sm.init('font');

    var text = new Text();
    var str = 'The quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog';
    var characterArray = text.textToC(str);
    var textBuffer = text.buildData(characterArray);


    var gl = sb.getGL();
    var rotation = null;

    var t = texture_constructor(sb);

    var texture = t.loadedTexture;

    var em = sb.getEntityManager();

    var squareBuffer = gl.createBuffer();


    gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
    var size = textBuffer.length / 5;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

    //}

    var update = function (deltatime) {


    };


    var draw = function (text) {


        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.TextComponent) {
                // sm.setProgram(this.fontProgram);
                camera.mvPushMatrix();
                mat4.scale(camera.mvMatrix, [0.2, 0.2, 0.2]);

                //mat4.rotate(camera.mvMatrix, helpers.degToRad(this.rotation), [1, 1,1]);
                gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
                gl.vertexAttribPointer(fontProgram.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
                gl.vertexAttribPointer(fontProgram.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(fontProgram.samplerUniform, 0);

                gl.uniformMatrix4fv(fontProgram.uPMatrix, false, camera.getPMatrix());
                gl.uniformMatrix4fv(fontProgram.uMVMatrix, false, camera.getMVMatrix());


                gl.drawArrays(gl.TRIANGLES, 0, squareBuffer.size);
                camera.mvPopMatrix();
            }

        }


    };
    return {
        draw, update, init: function () {
        }
    }
}