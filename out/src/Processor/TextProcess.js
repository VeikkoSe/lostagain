var TextProcess = function TextProcess() {
  "use strict";
  var text = new Text();
  var str = 'The quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog\nThe quick brown fox jumps over the lazy dog';
  var characterArray = text.textToC(str);
  var textBuffer = text.buildData(characterArray);
  this.rotation = null;
  var t = new Texture('font', true);
  this.texture = t.loadedTexture;
  this.squareBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.squareBuffer);
  this.squareBuffer.size = textBuffer.length / 5;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textBuffer), gl.STATIC_DRAW);
};
($traceurRuntime.createClass)(TextProcess, {
  update: function(deltatime) {
    "use strict";
    if (this.rotation > 360)
      this.rotation = 0;
    this.rotation += (90 * deltatime) / 1000.0;
  },
  draw: function(text) {
    "use strict";
    gl.useProgram(fontProgram);
    camera.mvPushMatrix();
    mat4.scale(camera.mvMatrix, [0.2, 0.2, 0.2]);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareBuffer);
    gl.vertexAttribPointer(fontProgram.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(fontProgram.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(fontProgram.samplerUniform, 0);
    gl.uniformMatrix4fv(fontProgram.uPMatrix, false, camera.pMatrix);
    gl.uniformMatrix4fv(fontProgram.uMVMatrix, false, camera.mvMatrix);
    gl.drawArrays(gl.TRIANGLES, 0, this.squareBuffer.size);
    camera.mvPopMatrix();
  }
}, {}, Processor);
