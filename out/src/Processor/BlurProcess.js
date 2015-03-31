var PostProcess = function PostProcess() {
  "use strict";
  this.lastTime = 0;
  this.elapsedTotal = 0;
  this.x = 0;
  this.framebuffer = null;
  this.renderbuffer = null;
  this.texture = null;
  this.framebuffer = gl.createFramebuffer();
  this.framebuffer2 = gl.createFramebuffer();
  this.texture = this.initTextureFramebuffer(this.framebuffer);
  this.texture2 = this.initTextureFramebuffer(this.framebuffer2);
  var points = [];
  points.push(-50, 0, 0);
  points.push(20, 0, 0);
  this.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  this.texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0]), gl.STATIC_DRAW);
  this.vertBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
  this.setRectangle(0, 0, gl.viewportWidth, gl.viewportHeight);
  this.wall = mm.getOrAdd('maps');
};
($traceurRuntime.createClass)(PostProcess, {
  initTextureFramebuffer: function(fb) {
    "use strict";
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
  },
  draw: function() {
    "use strict";
    this.two();
    this.three();
  },
  two: function() {
    "use strict";
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer2);
    gl.useProgram(blurVerticalProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.vertexAttribPointer(blurVerticalProgram.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.vertexAttribPointer(blurVerticalProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(blurVerticalProgram.samplerUniform, 0);
    gl.uniform2f(blurVerticalProgram.uResolution, gl.viewportWidth, gl.viewportHeight);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, this.texture2);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  },
  three: function() {
    "use strict";
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.useProgram(blurHorizontalProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.vertexAttribPointer(blurHorizontalProgram.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.vertexAttribPointer(blurVerticalProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture2);
    gl.uniform1i(blurHorizontalProgram.samplerUniform, 0);
    gl.uniform2f(blurHorizontalProgram.uResolution, gl.viewportWidth, gl.viewportHeight);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}, {}, Processor);
