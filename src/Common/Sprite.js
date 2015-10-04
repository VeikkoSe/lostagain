function sprite_constructor(sandbox) {
    "use strict";
    var gl = sandbox.getGL();
    var t = texture_constructor(sandbox);


    var loadReturn = {};
    var texture = null;
    var itemSize = 3;
    var numParticles = 1;
    var pointStartPositionsBuffer = null;


    var load = function (name,noflip,repeat) {


        t.load(name, noflip, repeat);

        texture = t.getLoadedTexture();
        //var texture =;

        var pointStartPositionsBuffer = gl.createBuffer();


        //build buffers
        var startPositions = [];

        startPositions.push(0);
        startPositions.push(0);
        startPositions.push(0);

        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);


    };


    return {
        load,
        getTexture: function () {
            return texture;
        },
        getItemSize: function () {
            return itemSize;
        },
        getNumParticles: function () {
            return numParticles;
        },
        getBuffer: function () {
            return pointStartPositionsBuffer;
        }
    }
}




