class Hexagon {

    constructor(size) {


        this.hexsizeX = size;
        this.hexsizeY = size * 3;


        this.deniedBlock = [2, 0];
        this.movableBlock = [3, 1];
        this.visitedBlock = [0, 0];
        this.baseBlock = [2, 3];
        this.baseBlockOdd = [1, 4];
        this.posBlock = [4, 0];

        this.bossBlock = [0, 3];
        this.bossPos = [3, 11];

        this.playerPos = [0, 0];
        this.mapArray = [];

        this.holes = [];
        this.visited = [];


        this.updateArea();

        this.area = this.createHexagonArea();
        this.textureCoordinates = this.createTextures();


        var t = new Texture('maptiles', true);

        this.texture = t.loadedTexture;


    }

    surround(x, y) {
        //
        if (y % 2 == 0 && y != 0) {
            var pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x - 1, y - 1], [x - 1, y + 1]];
        }
        else {
            var pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x + 1, y - 1]];
            if (y !== 0) {
                pos.push([x + 1, y + 1]);
            }
            else {
                pos.push([x - 1, y + 1]);
            }
        }
        //we remove those positions that are out of bounds
        for (var i = 0; i < pos.length; i++) {
            if (pos[i][0] < 0 || pos[i][1] < 0) {
                pos.splice(i, 1);
                i--;
            }
            if (pos[i][0] > this.hexsizeX - 1 || pos[i][1] > this.hexsizeY - 1) {
                pos.splice(i, 1);
                i--;
            }
        }


        return pos;
    }

    updateArea() {

        //set all basepositions to "walkable"
        for (var x = 0; x < this.hexsizeX; x++) {
            this.mapArray[x] = [];
            for (var y = 0; y < this.hexsizeY; y++) {
                this.mapArray[x][y] = [];
                if (x % 2 == 0) {
                    this.mapArray[x][y][0] = this.baseBlock[0];
                    this.mapArray[x][y][1] = this.baseBlock[1];
                }
                else {
                    this.mapArray[x][y][0] = this.baseBlockOdd[0];
                    this.mapArray[x][y][1] = this.baseBlockOdd[1];

                }

            }
        }


        //set 3 random denied blocks
        for (var i = 0; i < 4; i++) {
            var randX = this.randomIntFromInterval(0, 3);
            var randY = this.randomIntFromInterval(0, 3);
            this.mapArray[randX][randY][0] = this.deniedBlock[0];
            this.mapArray[randX][randY][1] = this.deniedBlock[1];

        }

        var surround = this.surround(this.playerPos[0], this.playerPos[1]);
        for (var i = 0; i < surround.length; i++) {
            this.mapArray[surround[i][0]][surround[i][1]][0] = this.movableBlock[0];
            this.mapArray[surround[i][0]][surround[i][1]][1] = this.movableBlock[1];
        }

        //set the player pos with correct color
        this.mapArray[this.playerPos[0]][this.playerPos[1]][0] = this.posBlock[0];
        this.mapArray[this.playerPos[0]][this.playerPos[1]][1] = this.posBlock[1];

        this.mapArray[this.bossPos[0]][this.bossPos[1]][0] = this.bossBlock[0];
        this.mapArray[this.bossPos[0]][this.bossPos[1]][1] = this.bossBlock[1];
    }

    oneTexture(posX, posY) {


        var tex = [


            //center square
            3 / 4, 1 - 1 / 16,
            1 / 4, 1 - 1 / 16,
            1 / 4, 1 / 16,

            3 / 4, 1 - 1 / 16,
            1 / 4, 1 / 16,
            3 / 4, 1 / 16,

            //right side
            3 / 4, 1 - 1 / 16,
            3 / 4, 1 / 16,
            1, 0.5,


            //left side

            1 / 4, 1 - 1 / 16,
            0, 0.5,
            1 / 4, 1 / 16


        ];

        for (var i = 0; i < tex.length; i++) {
            if ((i + 1) % 2 == 0 && i != 0) {
                tex[i] = (tex[i] / 4) + (posY * (1 / 4));
            }
            else {
                tex[i] = (tex[i] / 4) + (posX * (1 / 4));
            }

        }

        return tex;
    }


    oneHexagon() {
        var oneHexagon = [

            //center square
            1, 0, 2,
            -1, 0, 2,
            -1, 0, -2,

            1, 0, 2,
            -1, 0, -2,
            1, 0, -2,


            //right side
            1, 0, 2,
            1, 0, -2,
            2, 0, 0,


            //left side
            -1, 0, 2,
            -2, 0, 0,
            -1, 0, -2


        ];
        return oneHexagon;
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createTextures() {
        var allTextures = [];
        for (var i = 0; i < this.hexsizeX; i++) {
            for (var k = 0; k < this.hexsizeY; k++) {
                var oneTexture = this.oneTexture(this.mapArray[i][k][0], this.mapArray[i][k][1]);
                for (var j = 0; j < oneTexture.length; j++) {
                    allTextures.push(oneTexture[j]);
                }
            }
        }
        return allTextures;
    }

    createHexagonArea() {

        /*

         -1,2     1,2
         ------
         -2,0  /|   / |\  2,0
         \| /   |/
         \...../
         -1,-2   1,-2


         */


        var oneHexagon = this.oneHexagon();


        var allHexagons = [];

        for (var x = 0; x < this.hexsizeX; x++) {


            for (var y = 0; y < this.hexsizeY; y++) {

                var addition = 0;
                if ((y + 1) % 2 == 0)
                    addition = 3.5;


                for (var h = 0; h < oneHexagon.length; h += 3) {


                    allHexagons.push(oneHexagon[h] + (x * 7) + addition);
                    allHexagons.push(0);
                    allHexagons.push(oneHexagon[h + 2] + (y * 2.5 ));


                }
            }
        }

        return allHexagons;

    }


}