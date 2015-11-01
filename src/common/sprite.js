function sprite(gl, textureCreator) {
    'use strict';

    //var gl = sandbox.getGL();

    return Object.freeze({
        load: function(name, noflip, repeat) {

            var t = textureCreator;

            //var loadReturn = {};

            var itemSize = 3;
            var numParticles = 1;
            var pointStartPositionsBuffer = gl.createBuffer();
            // var spriteName = name;

            var texture;
            t.load(name, noflip, repeat, function(t) {
                texture = t;
            });

            //texture = t.getLoadedTexture();
            //var texture =;

            //build buffers
            var startPositions = [];

            startPositions.push(0);
            startPositions.push(0);
            startPositions.push(0);

            gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);

            return {
                getTexture: function() {
                    return texture;
                },
                getItemSize: function() {
                    return itemSize;
                },
                getNumParticles: function() {
                    return numParticles;
                },
                getBuffer: function() {
                    return pointStartPositionsBuffer;
                }
            };
        }

        //getName: function() {
        //   return spriteName;
        // }
    });
}




