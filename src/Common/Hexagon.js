function hexagon_constructor(size) {

    let hexsizeX = size;
    let hexsizeY = size * 3;
    let mapLevels = [];


    //coordinates in hexagonimage
    let deniedBlock = [2, 0];
    let movableBlock = [3, 1];
    let movingBlock = [0, 2];
    let baseBlock = [2, 3];
    let posBlock = [4, 0];
    let bossBlock = [0, 3];

    let deniedArea = [];
    let bossPos = [3, 11];
    let playerPos = [1, 1];
    let mapArray = [];
    let deniedAmount = 4;
    let visited = [];

    //constructor(size) {
    let init = function () {


        for (let x = 0; x < hexsizeX; x++) {
            mapLevels[x] = [];
            for (let y = 0; y < hexsizeY; y++) {
                mapLevels[x][y] = [];
                mapLevels[x][y] = randomIntFromInterval(1, 3);
            }
        }

        deniedBlocks();
        updateArea();

        area = createHexagonArea();
        textureCoordinates = createTextures();


        let tc = texture_constructor(sb);
        tc.load({name});

        texture = tc.getLoadedTexture();

    }
    // }

    let getPlayerPosXInWC = function () {
        if (playerPos[1] % 2 == 0 && playerPos[1] != 0) {
            return playerPos[0] * 7;
        }
        else {
            return 3 + playerPos[0] * 7;
        }
    }

    let getPlayerPosZInWC = function () {
        return playerPos[1] * 2.5;
    }

    //set 3 random denied blocks
    let deniedBlocks = function () {

        let amount = deniedAmount;
        let g = 0;
        for (let i = 0; i < amount; i++) {
            let randX = randomIntFromInterval(0, hexsizeX - 1);
            let randY = randomIntFromInterval(0, hexsizeY - 1);
            //When we originally create the denied blocks we cannot allow the player default position
            if (randX == playerPos[0] && randY == playerPos[1]) {
                amount++;
            }
            //bossblock cannot be denied
            else if (randX == bossPos[0] && randY == bossPos[1]) {
                amount++;
            }
            //only unique positions
            else if (typeof deniedArea[randX] !== 'undefined' && typeof deniedArea[randY] !== 'undefined') {
                amount++;
            }
            else {
                deniedArea[g] = [randX, randY];
                g++;
            }
        }
    }

    let surround = function (x, y) {
        if (y % 2 == 0 && y != 0) {
            let pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x - 1, y - 1], [x - 1, y + 1]];
        }
        else {
            let pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x + 1, y - 1]];
            if (y !== 0) {
                pos.push([x + 1, y + 1]);
            }
            else {
                pos.push([x - 1, y + 1]);
            }
        }
        //we remove those positions that are out of bounds
        for (let i = 0; i < pos.length; i++) {
            if (pos[i][0] < 0 || pos[i][1] < 0) {
                pos.splice(i, 1);
                i--;
            }
            if (pos[i][0] > hexsizeX - 1 || pos[i][1] > hexsizeY - 1) {
                pos.splice(i, 1);
                i--;
            }
        }
        return pos;
    }

    let updateArea = function (movingUp = 0, movingDown = 0, movingLeft = 0, movingRight = 0, selecting = false) {

        //set all basepositions to "walkable"
        for (let x = 0; x < hexsizeX; x++) {
            mapArray[x] = [];
            for (let y = 0; y < hexsizeY; y++) {
                mapArray[x][y] = [];

                mapArray[x][y][0] = baseBlock[0];
                mapArray[x][y][1] = baseBlock[1];


            }
        }

        //player is surrounded with positions he can move
        let surround = surround(playerPos[0], playerPos[1]);
        for (let i = 0; i < surround.length; i++) {
            mapArray[surround[i][0]][surround[i][1]][0] = movableBlock[0];
            mapArray[surround[i][0]][surround[i][1]][1] = movableBlock[1];
        }

        //set the player pos with correct color
        mapArray[playerPos[0]][playerPos[1]][0] = posBlock[0];
        mapArray[playerPos[0]][playerPos[1]][1] = posBlock[1];

        //bossblock
        mapArray[bossPos[0]][bossPos[1]][0] = bossBlock[0];
        mapArray[bossPos[0]][bossPos[1]][1] = bossBlock[1];


        if (playerPos[1] % 2 == 0 && playerPos[1] != 0) {

            movingPosition(movingUp, movingDown, movingLeft, movingRight, selecting);
        }
        else {

            movingPositionOdd(movingUp, movingDown, movingLeft, movingRight, selecting);
        }

        //set 3 random denied blocks
        for (let i = 0; i < deniedArea.length; i++) {
            let x = deniedArea[i][0];
            let y = deniedArea[i][1];

            mapArray[x][y][0] = deniedBlock[0];
            mapArray[x][y][1] = deniedBlock[1];

        }

        textureCoordinates = createTextures();


    }

    let possiblemove = function (x, y) {
        //we cant move to deneiedarea
        for (let j = 0; j < deniedArea.length; j++) {
            if (x == deniedArea[j][0] && y == deniedArea[j][1]) {
                return false;
            }
        }

        if (x >= 0 && y >= 0 && y < hexsizeY && x < hexsizeX) {
            return true;
        }

        return false;
    }

    let setSelecting = function (selecting, x, y) {

        for (let e = 0; e < em.entities.length; e++) {
            let le = em.entities[e];

            if (le.components.GasComponent) {
                let gc = le.components.GasComponent;
                if (gc.amount > 0 && selecting) {
                    playerPos = [x, y];
                    gc.amount--;


                    game.stateEngine.changeState("gamestate");
                    if (randomIntFromInterval(0, 1) == 1) {
                        // loadManager.loadLevel('third');
                        // game.currentLevel = 'third';
                    }
                    else if (randomIntFromInterval(0, 1) == 0) {
                        //loadManager.loadLevel('first');
                        //game.currentLevel = 'first';
                    }
                    else {
                        // loadManager.loadLevel('second');
                        //game.currentLevel = 'second';
                    }


                }
            }
        }
    }

    let movingPosition = function (movingUp, movingDown, movingLeft, movingRight, selecting) {

        let x = playerPos[0];
        let y = playerPos[1];


        if (movingUp == 1) {
            if (movingLeft == 1 && possiblemove(x - 1, y - 1)) {
                mapArray[x - 1][y - 1][0] = movingBlock[0];
                mapArray[x - 1][y - 1][1] = movingBlock[1];

                setSelecting(selecting, x - 1, y - 1);

            }
            else if (movingRight == 1 && possiblemove(x, y - 1)) {
                mapArray[x][y - 1][0] = movingBlock[0];
                mapArray[x][y - 1][1] = movingBlock[1];

                setSelecting(selecting, x, y - 1);

            }
            else if (possiblemove(x, y - 2)) {
                mapArray[x][y - 2][0] = movingBlock[0];
                mapArray[x][y - 2][1] = movingBlock[1];
                setSelecting(selecting, x, y - 2);

            }
        }

        else if (movingDown == 1) {
            if (movingLeft == 1 && possiblemove(x - 1, y + 1)) {
                mapArray[x - 1][y + 1][0] = movingBlock[0];
                mapArray[x - 1][y + 1][1] = movingBlock[1];
                setSelecting(selecting, x - 1, y + 1);

            }
            else if (movingRight == 1 && possiblemove(x, y + 1)) {
                mapArray[x][y + 1][0] = movingBlock[0];
                mapArray[x][y + 1][1] = movingBlock[1];
                setSelecting(selecting, x, y + 1);

            }
            else if (possiblemove(x, y + 2)) {
                mapArray[x][y + 2][0] = movingBlock[0];
                mapArray[x][y + 2][1] = movingBlock[1];
                setSelecting(selecting, x, y + 2);

            }
        }


    }


    let movingPositionOdd = function (movingUp, movingDown, movingLeft, movingRight, selecting) {

        let x = playerPos[0];
        let y = playerPos[1];


        if (movingUp == 1) {
            if (movingLeft == 1 && possiblemove(x, y - 1)) {
                mapArray[x][y - 1][0] = movingBlock[0];
                mapArray[x][y - 1][1] = movingBlock[1];
                setSelecting(selecting, x, y - 1);

            }
            else if (movingRight == 1 && possiblemove(x + 1, y - 1)) {
                mapArray[x + 1][y - 1][0] = movingBlock[0];
                mapArray[x + 1][y - 1][1] = movingBlock[1];
                setSelecting(selecting, x + 1, y - 1);
            }
            else if (possiblemove(x, y - 2)) {
                mapArray[x][y - 2][0] = movingBlock[0];
                mapArray[x][y - 2][1] = movingBlock[1];
                setSelecting(selecting, x, y - 2);
            }
        }

        else if (movingDown == 1) {
            if (movingLeft == 1 && possiblemove(x, y + 1)) {
                if (y == 0) {
                    mapArray[x - 1][y + 1][0] = movingBlock[0];
                    mapArray[x - 1][y + 1][1] = movingBlock[1];
                    setSelecting(selecting, x - 1, y + 1);
                }
                else {
                    mapArray[x][y + 1][0] = movingBlock[0];
                    mapArray[x][y + 1][1] = movingBlock[1];
                    setSelecting(selecting, x, y + 1);

                }
            }
            else if (movingRight == 1 && possiblemove(x + 1, y + 1)) {
                if (y == 0) {
                    mapArray[x][y + 1][0] = movingBlock[0];
                    mapArray[x][y + 1][1] = movingBlock[1];
                    setSelecting(selecting, x, y + 1);
                }
                else {
                    mapArray[x + 1][y + 1][0] = movingBlock[0];
                    mapArray[x + 1][y + 1][1] = movingBlock[1];
                    setSelecting(selecting, x + 1, y + 1);
                }
            }
            else if (possiblemove(x, y + 2)) {
                mapArray[x][y + 2][0] = movingBlock[0];
                mapArray[x][y + 2][1] = movingBlock[1];
                setSelecting(selecting, x, y + 2);

            }
        }
    }


    let oneTexture = function (posX, posY) {


        let tex = [


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

        for (let i = 0; i < tex.length; i++) {
            if ((i + 1) % 2 == 0 && i != 0) {
                tex[i] = (tex[i] / 4) + (posY * (1 / 4));
            }
            else {
                tex[i] = (tex[i] / 4) + (posX * (1 / 4));
            }

        }

        return tex;
    }


    let oneHexagon = function () {
        let oneHexagon = [

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

    let randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    let createTextures = function () {
        let allTextures = [];
        for (let i = 0; i < hexsizeX; i++) {
            for (let k = 0; k < hexsizeY; k++) {
                let oneTexture = oneTexture(mapArray[i][k][0], mapArray[i][k][1]);
                for (let j = 0; j < oneTexture.length; j++) {
                    allTextures.push(oneTexture[j]);
                }
            }
        }
        return allTextures;
    }

    let createHexagonArea = function () {

        /*

         -1,2     1,2
         ------
         -2,0  /|   / |\  2,0
         \| /   |/
         \...../
         -1,-2   1,-2


         */


        let oneHexagon = oneHexagon();


        let allHexagons = [];

        for (let x = 0; x < hexsizeX; x++) {


            for (let y = 0; y < hexsizeY; y++) {

                let addition = 0;
                if ((y + 1) % 2 == 0)
                    addition = 3.5;


                for (let h = 0; h < oneHexagon.length; h += 3) {


                    allHexagons.push(oneHexagon[h] + (x * 7) + addition);
                    allHexagons.push(0);
                    allHexagons.push(oneHexagon[h + 2] + (y * 2.5 ));


                }
            }
        }

        return allHexagons;

    }

    return {
        init
    }


}