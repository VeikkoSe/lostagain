class Sprite {
    constructor(name) {

        //this.xPos = x;
        //this.yPos = y;
        //this.width = 16;
        //this.height = 16;
        //this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        //this.frames = frames;


        this.name = name;
        //this.dir = dir || 'horizontal';
        //this.once = once;

        var t = new Texture(this.name);

        this.texture = t.loadedTexture;
        this.textureLoaded = t.loaded;


        this.pointStartPositionsBuffer = gl.createBuffer();
        this.time = 0;
        this.numParticles = 1;

        this.buildBuffers();

    }


    buildBuffers() {

        //var lifetimes = [];
        var startPositions = [];
        //var endPositions = [];

        //lifetimes.push(Math.random());

        startPositions.push(0);
        startPositions.push(0);
        startPositions.push(0);

        //endPositions.push((Math.random() * 2) - 1);
        //endPositions.push((Math.random() * 2) - 1);
        //endPositions.push((Math.random() * 2) - 1);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
        this.pointStartPositionsBuffer.itemSize = 3;
        this.pointStartPositionsBuffer.numItems = this.numParticles;


    }


}




