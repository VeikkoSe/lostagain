class Hexagon {

    constructor(size) {


        this.hexsizeX = size;
        this.hexsizeY = size * 3;
        this.mapLevels = [];
        for(var x=0;x<this.hexsizeX ;x++) {
            this.mapLevels[x] = [];
            for (var y=0;y<this.hexsizeY;y++) {
                this.mapLevels[x][y] =[];
                this.mapLevels[x][y] = this.randomIntFromInterval(1,3);
            }
        }


        //coordinates to hexagonmap
        this.deniedBlock = [2, 0];
        this.movableBlock = [3, 1];
        this.movingBlock = [0, 2];
        this.baseBlock = [2, 3];
        this.posBlock = [4, 0];
        this.bossBlock = [0, 3];

        this.deniedArea = [];
        this.bossPos = [3, 11];
        this.playerPos = [0, 10];
        this.mapArray = [];


        this.visited = [];

        this.deniedBlocks();
        this.updateArea();

        this.area = this.createHexagonArea();
        this.textureCoordinates = this.createTextures();


        var t = new Texture('maptiles', true);

        this.texture = t.loadedTexture;


    }

    deniedBlocks() {
        //set 3 random denied blocks


        for (var i = 0; i < 4; i++) {
            var randX = this.randomIntFromInterval(0, this.hexsizeX - 1);
            var randY = this.randomIntFromInterval(0, this.hexsizeY - 1);

            this.deniedArea[i] = [randX, randY];


        }

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

    updateArea(movingUp = 0, movingDown = 0, movingLeft = 0, movingRight = 0, selecting = false) {

        //set all basepositions to "walkable"
        for (var x = 0; x < this.hexsizeX; x++) {
            this.mapArray[x] = [];
            for (var y = 0; y < this.hexsizeY; y++) {
                this.mapArray[x][y] = [];

                this.mapArray[x][y][0] = this.baseBlock[0];
                this.mapArray[x][y][1] = this.baseBlock[1];


            }
        }

        //set 3 random denied blocks
        for (var i = 0; i < this.deniedArea.length; i++) {
            var x = this.deniedArea[i][0];
            var y = this.deniedArea[i][1];

            this.mapArray[x][y][0] = this.deniedBlock[0];
            this.mapArray[x][y][1] = this.deniedBlock[1];

        }

        //player is surrounded with positions he can move
        var surround = this.surround(this.playerPos[0], this.playerPos[1]);
        for (var i = 0; i < surround.length; i++) {
            this.mapArray[surround[i][0]][surround[i][1]][0] = this.movableBlock[0];
            this.mapArray[surround[i][0]][surround[i][1]][1] = this.movableBlock[1];
        }

        //set the player pos with correct color
        this.mapArray[this.playerPos[0]][this.playerPos[1]][0] = this.posBlock[0];
        this.mapArray[this.playerPos[0]][this.playerPos[1]][1] = this.posBlock[1];

        //bossblock
        this.mapArray[this.bossPos[0]][this.bossPos[1]][0] = this.bossBlock[0];
        this.mapArray[this.bossPos[0]][this.bossPos[1]][1] = this.bossBlock[1];


        if (this.playerPos[1] % 2 == 0 && this.playerPos[1] != 0) {

            this.movingPosition(movingUp, movingDown, movingLeft, movingRight, selecting);
        }
        else {

            this.movingPositionOdd(movingUp, movingDown, movingLeft, movingRight, selecting);
        }

        this.textureCoordinates = this.createTextures();


    }

    possiblemove(x, y) {
        if (x >= 0 && y >= 0 && y < this.hexsizeY && x < this.hexsizeX) {
            return true;
        }
        return false;
    }

    setSelecting(selecting, x, y) {
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.GasComponent) {
                var gc = le.components.GasComponent;
                if (gc.amount > 0 && selecting) {
                    this.playerPos = [x, y];
                    gc.amount--;


                    game.stateEngine.changeState("gamestate");
                    if(this.randomIntFromInterval(0,1)==1) {
                    loadManager.loadLevel('third');
                        game.currentLevel = 'third';
                    }
                    else if(this.randomIntFromInterval(0,1)==0) {
                        loadManager.loadLevel('first');
                        game.currentLevel = 'first';
                    }
                    else {
                        loadManager.loadLevel('second');
                        game.currentLevel = 'second';
                    }



                }
            }
        }
    }

    movingPosition(movingUp, movingDown, movingLeft, movingRight, selecting) {

        var x = this.playerPos[0];
        var y = this.playerPos[1];


        if (movingUp == 1) {
            if (movingLeft == 1 && this.possiblemove(x - 1, y - 1)) {
                this.mapArray[x - 1][y - 1][0] = this.movingBlock[0];
                this.mapArray[x - 1][y - 1][1] = this.movingBlock[1];

                this.setSelecting(selecting, x - 1, y - 1);

            }
            else if (movingRight == 1 && this.possiblemove(x, y - 1)) {
                this.mapArray[x][y - 1][0] = this.movingBlock[0];
                this.mapArray[x][y - 1][1] = this.movingBlock[1];

                this.setSelecting(selecting, x, y - 1);

            }
            else if (this.possiblemove(x, y - 2)) {
                this.mapArray[x][y - 2][0] = this.movingBlock[0];
                this.mapArray[x][y - 2][1] = this.movingBlock[1];
                this.setSelecting(selecting, x, y - 2);

            }
        }

        else if (movingDown == 1) {
            if (movingLeft == 1 && this.possiblemove(x - 1, y + 1)) {
                this.mapArray[x - 1][y + 1][0] = this.movingBlock[0];
                this.mapArray[x - 1][y + 1][1] = this.movingBlock[1];
                this.setSelecting(selecting, x - 1, y + 1);

            }
            else if (movingRight == 1 && this.possiblemove(x, y + 1)) {
                this.mapArray[x][y + 1][0] = this.movingBlock[0];
                this.mapArray[x][y + 1][1] = this.movingBlock[1];
                this.setSelecting(selecting, x, y + 1);

            }
            else if (this.possiblemove(x, y + 2)) {
                this.mapArray[x][y + 2][0] = this.movingBlock[0];
                this.mapArray[x][y + 2][1] = this.movingBlock[1];
                this.setSelecting(selecting, x, y + 2);

            }
        }


    }


    movingPositionOdd(movingUp, movingDown, movingLeft, movingRight, selecting) {

        var x = this.playerPos[0];
        var y = this.playerPos[1];


        if (movingUp == 1) {
            if (movingLeft == 1 && this.possiblemove(x, y - 1)) {
                this.mapArray[x][y - 1][0] = this.movingBlock[0];
                this.mapArray[x][y - 1][1] = this.movingBlock[1];
                this.setSelecting(selecting, x, y - 1);

            }
            else if (movingRight == 1 && this.possiblemove(x + 1, y - 1)) {
                this.mapArray[x + 1][y - 1][0] = this.movingBlock[0];
                this.mapArray[x + 1][y - 1][1] = this.movingBlock[1];
                this.setSelecting(selecting, x + 1, y - 1);
            }
            else if (this.possiblemove(x, y - 2)) {
                this.mapArray[x][y - 2][0] = this.movingBlock[0];
                this.mapArray[x][y - 2][1] = this.movingBlock[1];
                this.setSelecting(selecting, x, y - 2);
            }
        }

        else if (movingDown == 1) {
            if (movingLeft == 1 && this.possiblemove(x, y + 1)) {
                if (y == 0) {
                    this.mapArray[x - 1][y + 1][0] = this.movingBlock[0];
                    this.mapArray[x - 1][y + 1][1] = this.movingBlock[1];
                    this.setSelecting(selecting, x - 1, y + 1);
                }
                else {
                    this.mapArray[x][y + 1][0] = this.movingBlock[0];
                    this.mapArray[x][y + 1][1] = this.movingBlock[1];
                    this.setSelecting(selecting, x, y + 1);

                }
            }
            else if (movingRight == 1 && this.possiblemove(x + 1, y + 1)) {
                if (y == 0) {
                    this.mapArray[x][y + 1][0] = this.movingBlock[0];
                    this.mapArray[x][y + 1][1] = this.movingBlock[1];
                    this.setSelecting(selecting, x, y + 1);
                }
                else {
                    this.mapArray[x + 1][y + 1][0] = this.movingBlock[0];
                    this.mapArray[x + 1][y + 1][1] = this.movingBlock[1];
                    this.setSelecting(selecting, x + 1, y + 1);
                }
            }
            else if (this.possiblemove(x, y + 2)) {
                this.mapArray[x][y + 2][0] = this.movingBlock[0];
                this.mapArray[x][y + 2][1] = this.movingBlock[1];
                this.setSelecting(selecting, x, y + 2);

            }
        }
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