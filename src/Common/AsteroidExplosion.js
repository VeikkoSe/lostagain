function asteroidexplosion_constructor(sb, x, y, z) {
    //constructor(x, y, z) {

    let pointEndPositionsBuffer = gl.createBuffer();
    let pointLifetimeBuffer = gl.createBuffer();
    let pointStartPositionsBuffer = gl.createBuffer();
    let time = 0;
    let numParticles = 500;
    let xPos = x;
    let yPos = y;
    let zPos = z;
    let gl = sb.getGL();

    let init = function () {
        buildBuffers();


    }


    let buildBuffers = function () {

        let lifetimes = [];
        let startPositions = [];
        let endPositions = [];
        for (let i = 0; i < numParticles; i++) {
            lifetimes.push(Math.random());

            startPositions.push((Math.random() * 0.25) - 0.125);
            startPositions.push((Math.random() * 0.25) - 0.125);
            startPositions.push((Math.random() * 0.25) - 0.125);

            endPositions.push((Math.random() * 50) - 40);
            endPositions.push((Math.random() * 50) - 40);
            endPositions.push((Math.random() * 50) - 40);
        }


        gl.bindBuffer(gl.ARRAY_BUFFER, pointLifetimeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lifetimes), gl.STATIC_DRAW);
        pointLifetimeBuffer.itemSize = 1;
        pointLifetimeBuffer.numItems = numParticles;


        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
        pointStartPositionsBuffer.itemSize = 3;
        pointStartPositionsBuffer.numItems = numParticles;


        gl.bindBuffer(gl.ARRAY_BUFFER, pointEndPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(endPositions), gl.STATIC_DRAW);
        pointEndPositionsBuffer.itemSize = 3;
        pointEndPositionsBuffer.numItems = numParticles;
    }

}


