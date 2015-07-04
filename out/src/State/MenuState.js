function menustate_constructor(sb) {
  var wall = null;
  var gl = sb.getGL();
  var shadermanager = sb.getShaderManager();
  var shaderprogram = shadermanager.useShader("simplest");
  var camera = sb.getCamera();
  var draw = function() {
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.uniform1f(shaderprogram.alphaUniform, 1);
    gl.uniform1i(shaderprogram.uDrawColors, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    camera.mvPushMatrix();
    gl.bindBuffer(gl.ARRAY_BUFFER, wall.vertexPositionBuffer);
    gl.vertexAttribPointer(shaderprogram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, wall.normalPositionBuffer);
    gl.vertexAttribPointer(shaderprogram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, wall.texturePositionBuffer);
    gl.vertexAttribPointer(shaderprogram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, wall.texture);
    gl.uniform1i(shaderprogram.samplerUniform, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wall.indexPositionBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, wall.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    camera.mvPopMatrix();
  };
  var init = function() {
    wall = mm.getOrAdd('menu');
    actionMapper = new MapStateActionMapper();
    document.onkeydown = actionMapper.handleKeyDown;
    document.onkeyup = actionMapper.handleKeyUp;
    document.onmousemove = actionMapper.handleMouseMove;
    document.onmousedown = actionMapper.handleMouseDown;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    camera.setPerspective();
    mat4.identity(camera.getMVMatrix());
    mat4.translate(camera.getMVMatrix(), [0, 0, -90]);
    sm.setProgram(shaderProgram);
  };
  var update = function() {
    actionMapper.handleKeys();
  };
  var cleanup = function() {};
  return {};
}
