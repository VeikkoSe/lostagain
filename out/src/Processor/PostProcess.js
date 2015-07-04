function postprocess_constructor(sb) {
  var lastTime = 0;
  var elapsedTotal = 0;
  var x = 0;
  var framebuffer = null;
  var renderbuffer = null;
  var texture = null;
  var basebuffer = gl.createFramebuffer();
  var framebuffer = gl.createFramebuffer();
  var framebuffer2 = gl.createFramebuffer();
  var texture2 = null;
  var texture3 = null;
  var wall = null;
  var points = [];
  var gl = sb.getGL();
  var camera = sb.getCamera();
  points.push(-50, 0, 0);
  points.push(20, 0, 0);
  var vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  var init = function() {
    texture = initTextureFramebuffer(framebuffer);
    texture2 = initTextureFramebuffer(framebuffer2);
    texture3 = initTextureFramebuffer(basebuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    setRectangle(0, 0, gl.viewportWidth, gl.viewportHeight);
    wall = mm.getOrAdd('maps');
  };
  var texCoordBuffer = gl.createBuffer();
  var vertBuffer = gl.createBuffer();
  var setRectangle = function(x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x2, y1, x1, y1, x1, y2, x2, y1, x1, y2, x2, y2]), gl.STATIC_DRAW);
  };
  var initTextureFramebuffer = function(fb) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return texture;
  };
  var draw = function() {
    two();
    three();
  };
  var two = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer2);
    sm.setProgram(blurVerticalProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.vertexAttribPointer(blurVerticalProgram.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(blurVerticalProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(blurVerticalProgram.samplerUniform, 0);
    gl.uniform2f(blurVerticalProgram.uResolution, gl.viewportWidth, gl.viewportHeight);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };
  var three = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    sm.setProgram(blurHorizontalProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.vertexAttribPointer(blurHorizontalProgram.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(blurVerticalProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(blurHorizontalProgram.samplerUniform, 0);
    gl.uniform1i(blurHorizontalProgram.samplerUniform2, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture3);
    gl.uniform2f(blurHorizontalProgram.uResolution, gl.viewportWidth, gl.viewportHeight);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    camera.drawCalls++;
  };
  return {
    update: update,
    draw: draw,
    init: init
  };
}
