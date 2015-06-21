function text_process_constructor(sb) {
    //constructor() {

    let fontProgram = sm.init('font');

    let text = new Text();
    let str = 'The quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog';
    let characterArray = text.textToC(str);
    let textBuffer = text.buildData(characterArray);


    let gl = sb.getGL();
    let rotation = null;

    let t = texture_constructor(sb);

    let texture = t.loadedTexture;

    let em = sb.getEntityManager();

    let squareBuffer = gl.createBuffer();


    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareBuffer);
    let size = textBuffer.length / 5;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);

    //}

    let update = function (deltatime) {


    }


    let draw = function (text) {


        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.TextComponent) {
                sm.setProgram(this.fontProgram);
                camera.mvPushMatrix();
                mat4.scale(camera.mvMatrix, [0.2, 0.2, 0.2]);

                //mat4.rotate(camera.mvMatrix, helpers.degToRad(this.rotation), [1, 1,1]);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.squareBuffer);
                gl.vertexAttribPointer(this.fontProgram.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
                gl.vertexAttribPointer(this.fontProgram.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.uniform1i(this.fontProgram.samplerUniform, 0);

                gl.uniformMatrix4fv(this.fontProgram.uPMatrix, false, camera.pMatrix);
                gl.uniformMatrix4fv(this.fontProgram.uMVMatrix, false, camera.mvMatrix);


                gl.drawArrays(gl.TRIANGLES, 0, this.squareBuffer.size);
                camera.mvPopMatrix();
            }

        }


    }
    return {}
}