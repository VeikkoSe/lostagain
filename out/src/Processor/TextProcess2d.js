var TextProcess2d = function TextProcess2d() {
  "use strict";
  this.program = sm.init('gui');
  this.text = new Text();
  var t = new Texture('font', true);
  this.texture = t.loadedTexture;
  this.textBuffer = null;
  this.currentString = '';
  this.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  var str = '';
  var characterArray = this.text.textToC(str);
  this.textBuffer = this.text.buildData(characterArray, true);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textBuffer), gl.STATIC_DRAW);
};
($traceurRuntime.createClass)(TextProcess2d, {
  update: function(deltatime, timeSinceStart) {
    "use strict";
    this.currentString = '';
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.TextComponent) {
        var tc = le.components.TextComponent;
        for (var key in tc.texts) {
          if (tc.texts.hasOwnProperty(key)) {
            if (parseInt(key, 10) < timeSinceStart) {
              this.currentString = tc.texts[$traceurRuntime.toProperty(key)];
            }
          }
        }
      }
    }
    if (this.currentString != '') {
      var str = this.currentString;
      var characterArray = this.text.textToC(str);
      this.textBuffer = this.text.buildData(characterArray, true);
    }
  },
  draw: function() {
    "use strict";
    if (this.textBuffer == null && this.currentString != '') {
      return true;
    }
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.TextComponent) {
        sm.setProgram(this.program);
        camera.mvPushMatrix();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.program.aVertexPosition, 3, gl.FLOAT, false, 20, 0);
        gl.vertexAttribPointer(this.program.textureCoordAttribute, 2, gl.FLOAT, false, 20, 12);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textBuffer), gl.STATIC_DRAW);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(this.program.samplerUniform, 0);
        gl.drawArrays(gl.TRIANGLES, 0, this.textBuffer.length / 5);
        camera.mvPopMatrix();
      }
    }
  }
}, {}, Processor);
