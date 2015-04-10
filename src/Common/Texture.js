/**
 * Created by Vge on 3.3.2014.
 */
class Texture {

    constructor(name, noflip = false,repeat = false) {
        this.name = name;
        this.loadedTexture = null;
        this.loaded = 0;
        this.repeat = repeat;
        this.noflip = noflip;
        levelManager.loadTotal++;
        this.initTexture(this.name);
    }

    handleLoadedTexture() {
        if (!this.noflip) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }


        gl.bindTexture(gl.TEXTURE_2D, this.loadedTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.loadedTexture.image);
        if(this.repeat)
        {

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        }
        else
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.loaded = 1;
        levelManager.loadTotal--;
    }


    initTexture(name) {

        this.loadedTexture = gl.createTexture();
        this.loadedTexture.image = new Image();
        this.loadedTexture.image.onload = this.handleLoadedTexture.bind(this);
        this.loadedTexture.image.src = 'resources/images/' + name + '.png';
    }
}