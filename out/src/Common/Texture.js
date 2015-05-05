var Texture = function Texture(name) {
  "use strict";
  var noflip = arguments[1] !== (void 0) ? arguments[1] : false;
  var repeat = arguments[2] !== (void 0) ? arguments[2] : false;
  this.name = name;
  this.loadedTexture = null;
  this.loaded = 0;
  this.repeat = repeat;
  this.noflip = noflip;
  loadManager.loadTotal++;
  this.initTexture(this.name);
};
($traceurRuntime.createClass)(Texture, {
  handleLoadedTexture: function() {
    "use strict";
    if (!this.noflip) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    }
    gl.bindTexture(gl.TEXTURE_2D, this.loadedTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.loadedTexture.image);
    if (this.repeat) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.loaded = 1;
    loadManager.loadTotal--;
  },
  initTexture: function(name) {
    "use strict";
    this.loadedTexture = gl.createTexture();
    this.loadedTexture.image = new Image();
    this.loadedTexture.image.onload = this.handleLoadedTexture.bind(this);
    this.loadedTexture.image.src = 'resources/images/' + name + '.png';
  }
}, {});
