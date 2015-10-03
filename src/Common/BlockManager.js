/**
 * Handles terrain blocks that are loaded based on hero position
 */
function BlockManager() {


    this.parts = [];
    this.currentBlock = 0;

    this.mapSize = 10;
    this.blockSize = 2;
    this.part = this.mapSize / this.blockSize;

    var d = 0;


    var cnt = this.part * this.part;
    for (var s = 0; s < cnt; s++) {

        this.parts[s] = [];
        if (s - this.part - 1 >= 0 && (s - this.part) % this.part != 0) {
            this.parts[s].push(s - this.part - 1);
        }
        if (s - this.part >= 0) {
            this.parts[s].push(s - this.part);
        }
        if (s - this.part + 1 >= 0 && (s - this.part + 1) % this.part != 0) {
            this.parts[s].push(s - this.part + 1);
        }
        if (s - 1 >= 0 && (s) % this.part != 0) {
            this.parts[s].push(s - 1);
        }
        if (s + 1 < cnt && (s + 1) % this.part != 0) {
            this.parts[s].push(s + 1);
        }
        if ((s + this.part - 1 + 1) % this.part != 0 && s + this.part - 1 < cnt) {
            this.parts[s].push(s + this.part - 1);
        }
        if (s + this.part < cnt) {
            this.parts[s].push(s + this.part);
        }
        if (s + this.part + 1 < cnt && (s + 1) % this.part != 0) {
            this.parts[s].push(s + this.part + 1);
        }


    }


}

BlockManager.prototype.setCurrentBlock = function (block) {
    this.currentBlock = block;
}

BlockManager.prototype.getCurrentBlock = function () {
    return this.currentBlock;
}

BlockManager.prototype.inRange = function (block) {


    //tmp
    for (var i = 0; i < this.parts[this.currentBlock].length; i++) {
        if (block == this.parts[this.currentBlock][i])
            return true;
    }

    if (block == this.currentBlock || block == -1) {
        return true;
    }
    return false;
}

BlockManager.prototype.getBlockFromXY = function (x, y) {

    var block = 0;
    var chosenblock = -1;
    for (var yloop = 0; yloop < this.mapSize; yloop = yloop + this.blockSize) {
        for (var xloop = 0; xloop < this.mapSize; xloop = xloop + this.blockSize) {
            if (x >= xloop && x < xloop + this.blockSize && y >= yloop && y < yloop + this.blockSize) {
                chosenblock = block;
                break;
            }
            block++;
        }
        if (chosenblock != -1) {
            break;
        }
    }
    return chosenblock;

}


