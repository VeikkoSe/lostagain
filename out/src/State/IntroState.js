var IntroState = function IntroState(canvas) {
  "use strict";
  this.background = null;
};
($traceurRuntime.createClass)(IntroState, {
  draw: function() {
    "use strict";
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.uniform1f(shaderProgram.alphaUniform, 1);
    gl.uniform1i(shaderProgram.uDrawColors, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    camera.mvPushMatrix();
    mat4.translate(camera.mvMatrix, [0, 0, -50]);
    mat4.scale(camera.mvMatrix, [0.05, 0.05, 0.05]);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.normalPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.intro.texturePositionBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.intro.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.intro.indexPositionBuffer);
    helpers.setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, this.intro.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    camera.mvPopMatrix();
  },
  init: function() {
    "use strict";
    this.intro = mm.getOrAddMesh('start');
    actionMapper = new IntroStateActionMapper();
    document.onkeydown = actionMapper.handleKeyDown;
    document.onkeyup = actionMapper.handleKeyUp;
    document.onmousemove = actionMapper.handleMouseMove;
    document.onmousedown = actionMapper.handleMouseDown;
    shaderProgram = initShaders("per-fragment-lighting");
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.mvMatrix);
    mat4.translate(camera.mvMatrix, [0, 0, -10]);
    gl.useProgram(shaderProgram);
  },
  cleanup: function() {
    "use strict";
    document.onkeydown = null;
    document.onkeyup = null;
    document.onmousemove = null;
    document.onmousedown = null;
    actionMapper = null;
    currentlyPressedKeys = {};
  },
  update: function() {
    "use strict";
    actionMapper.handleKeys();
  }
}, {}, StateEngine);
