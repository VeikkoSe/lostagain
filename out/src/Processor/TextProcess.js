function text_process_constructor(sb) {
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
  gl.bindBuffer(gl.ARRAY_BUFFER, this.squareBuffer);
  var size = textBuffer.length / 5;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);
  var update = function(deltatime) {};
  var draw = function(text) {
    {
      try {
        throw undefined;
      } catch ($e) {
        {
          $e = 0;
          for (; $e < em.entities.length; $e++) {
            try {
              throw undefined;
            } catch (e) {
              {
                e = $e;
                try {
                  try {
                    throw undefined;
                  } catch (le) {
                    {
                      le = em.entities[$traceurRuntime.toProperty(e)];
                      if (le.components.TextComponent) {
                        sm.setProgram(this.fontProgram);
                        camera.mvPushMatrix();
                        mat4.scale(camera.mvMatrix, [0.2, 0.2, 0.2]);
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
                } finally {
                  $e = e;
                }
              }
            }
          }
        }
      }
    }
  };
  return {};
}
