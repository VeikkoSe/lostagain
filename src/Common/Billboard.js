class Billboard_eikaytossa {
    constructor(name, xpos, ypos, numofParticles = 1, particleLifetime = -1) {

        this.pointEndPositionsBuffer = gl.createBuffer();
        this.pointLifetimeBuffer = gl.createBuffer();
        this.pointStartPositionsBuffer = gl.createBuffer();
        this.time = 0;
        this.numParticles = numofParticles;
        this.xPos = xpos;
        this.yPos = ypos;
        this.buildBuffers();
        this.name = name;

    }


    buildBuffers() {

        var lifetimes = [];
        var startPositions = [];
        var endPositions = [];


        gl.bindBuffer(gl.ARRAY_BUFFER, this.xPos);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
        this.pointStartPositionsBuffer.itemSize = 3;
        this.pointStartPositionsBuffer.numItems = this.numParticles;


    }

}