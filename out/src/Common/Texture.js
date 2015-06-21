function texture_constructor(sb) {
  var gl = sb.getGL();
  var loadedTexture = null;
  var loadTexture = function(params) {
    var $__0 = $traceurRuntime.assertObject(params),
        name = $__0.name,
        noflip = $__0.noflip;
    loadedTexture = gl.createTexture();
    loadedTexture.image = new Image();
    loadedTexture.image.onload = function() {
      if (noflip) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      } else {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      }
      gl.bindTexture(gl.TEXTURE_2D, loadedTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, loadedTexture.image);
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
    };
    loadedTexture.image.src = 'resources/images/' + name + '.png';
  };
  var getLoadedTexture = function() {
    return loadedTexture;
  };
  return Object.freeze({
    init: function() {},
    loadTexture: loadTexture,
    getLoadedTexture: getLoadedTexture
  });
}
