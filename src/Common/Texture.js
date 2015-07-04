/**
 * Created by Vge on 3.3.2014.
 */
function texture_constructor(sandbox) {

    //let {name,noflip} = params;

    let loadedTexture = null;
    let gl = sandbox.getGL();


    let load = function (params) {
        let {name, noflip,repeat} = params;
        loadedTexture = gl.createTexture();

        loadedTexture.image = new Image();
        loadedTexture.image.onload = function () {

            if (noflip) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            }
            else {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            }


            gl.bindTexture(gl.TEXTURE_2D, loadedTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, loadedTexture.image);
            if (repeat) {

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            }

            else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
            gl.bindTexture(gl.TEXTURE_2D, null);


        }

        loadedTexture.image.src = 'resources/images/' + name + '.png';
    }

    let getLoadedTexture = function () {
        return loadedTexture;
    };

    return Object.freeze({


        load,
        getLoadedTexture

    });

}