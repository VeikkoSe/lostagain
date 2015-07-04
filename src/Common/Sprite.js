function sprite_constructor(sandbox) {
    let gl = sandbox.getGL();
    let t = texture_constructor(sandbox);


    let loadReturn = {};


    // let time = 0;


    let load = function (name) {


        t.load({name});

        //let texture =;

        let pointStartPositionsBuffer = gl.createBuffer();
        let numParticles = 1;


        //build buffers
        let startPositions = [];

        startPositions.push(0);
        startPositions.push(0);
        startPositions.push(0);

        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);


        //We don't create new objects
        loadReturn = {};

        loadReturn.itemSize = 3;
        loadReturn.numItems = numParticles;
        loadReturn.texture = t.getLoadedTexture();
        loadReturn.buffer = pointStartPositionsBuffer;

        return loadReturn;

    };


    return {
        load
    }
}




