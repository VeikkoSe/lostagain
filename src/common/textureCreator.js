function Texture(gl) {
    'use strict';
    this.gl = gl;
}

//var loadedTexture = null;
//var gl = sandbox.getGL();

Texture.prototype.load = function(name, noflip, repeat) {
    'use strict';

    var loadedTexture = this.gl.createTexture();
    var gl = this.gl;
    loadedTexture.loaded = false;
    loadedTexture.image = new Image();
    loadedTexture.image.onload = function() {

        if (noflip) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        else {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }

        gl.bindTexture(gl.TEXTURE_2D, loadedTexture);
        gl.texImage2D(gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            loadedTexture.image);
        if (repeat) {

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MAG_FILTER,
                gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MIN_FILTER,
                gl.LINEAR);

        }

        else {
            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MAG_FILTER,
                gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D,
                gl.TEXTURE_MIN_FILTER,
                gl.LINEAR);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        loadedTexture.loaded = true;

    };

    loadedTexture.image.src = 'resources/images/' + name + '.png';

    return loadedTexture;

};
