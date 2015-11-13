function hexagon(size) {
    'use strict';

    var hexsizeX = size;
    var hexsizeY = size * 3;
    var mapLevels = [];

    //coordinates in hexagonimage
    var deniedBlock = [2, 0];
    var movableBlock = [3, 1];
    var movingBlock = [0, 2];
    var baseBlock = [2, 3];
    var posBlock = [4, 0];
    var bossBlock = [0, 3];

    var deniedArea = [];
    var bossPos = [3, 11];
    var playerPos = [1, 1];
    var mapArray = [];
    var deniedAmount = 4;
    //var visited = [];
    var area = null;
    var textureCoordinates = null;

    var init = function() {

        for (var x = 0; x < hexsizeX; x++) {
            mapLevels[x] = [];
            for (var y = 0; y < hexsizeY; y++) {
                mapLevels[x][y] = [];
                mapLevels[x][y] = randomIntFromInterval(1, 3);
            }
        }

        deniedBlocks();
        updateArea();
        area = createHexagonArea();
        textureCoordinates = createTextures();

        //var tc = texture_constructor(sb);
        //tc.load({name});

    };
    // }

    var getPlayerPosXInWC = function() {
        if (playerPos[1] % 2 === 0 && playerPos[1] !== 0) {
            return playerPos[0] * 7;
        }
        else {
            return 3 + playerPos[0] * 7;
        }
    };

    var getPlayerPosZInWC = function() {
        return playerPos[1] * 2.5;
    };

    //set 3 random denied blocks
    var deniedBlocks = function() {

        var amount = deniedAmount;
        var g = 0;
        for (var i = 0; i < amount; i++) {
            var randX = randomIntFromInterval(0, hexsizeX - 1);
            var randY = randomIntFromInterval(0, hexsizeY - 1);
            //When we originally create the denied blocks we cannot allow the player default position
            if (randX === playerPos[0] && randY === playerPos[1]) {
                amount++;
            }
            //bossblock cannot be denied
            else if (randX === bossPos[0] && randY === bossPos[1]) {
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
    };

    var surround = function(x, y) {
        var pos;
        if (y % 2 === 0 && y !== 0) {
            pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x - 1, y - 1], [x - 1, y + 1]];
        }
        else {
            pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x + 1, y - 1]];
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
            if (pos[i][0] > hexsizeX - 1 || pos[i][1] > hexsizeY - 1) {
                pos.splice(i, 1);
                i--;
            }
        }
        return pos;
    };

    var updateArea = function(movingUp, movingDown, movingLeft, movingRight, selecting) {


        //set all basepositions to "walkable"
        for (var x = 0; x < hexsizeX; x++) {
            mapArray[x] = [];
            for (var y = 0; y < hexsizeY; y++) {
                mapArray[x][y] = [];

                mapArray[x][y][0] = baseBlock[0];
                mapArray[x][y][1] = baseBlock[1];

            }
        }

        //player is surrounded with positions he can move
        var srd = surround(playerPos[0], playerPos[1]);

        for (var i = 0; i < surround.length; i++) {
            mapArray[srd[i][0]][srd[i][1]][0] = movableBlock[0];
            mapArray[srd[i][0]][srd[i][1]][1] = movableBlock[1];
        }

        //set the player pos with correct color
        mapArray[playerPos[0]][playerPos[1]][0] = posBlock[0];
        mapArray[playerPos[0]][playerPos[1]][1] = posBlock[1];

        //bossblock
        mapArray[bossPos[0]][bossPos[1]][0] = bossBlock[0];
        mapArray[bossPos[0]][bossPos[1]][1] = bossBlock[1];

        if (playerPos[1] % 2 === 0 && playerPos[1] !== 0) {

            movingPosition(movingUp, movingDown, movingLeft, movingRight, selecting);
        }
        else {

            movingPositionOdd(movingUp, movingDown, movingLeft, movingRight, selecting);
        }

        //set 3 random denied blocks
        for (var d = 0; d < deniedArea.length; d++) {
            var x = deniedArea[d][0];
            var y = deniedArea[d][1];

            mapArray[x][y][0] = deniedBlock[0];
            mapArray[x][y][1] = deniedBlock[1];

        }
        //TODO: too slow, need to figure why it was used
        //textureCoordinates = createTextures();

    };

    var possiblemove = function(x, y) {
        //we cant move to deneiedarea
        for (var j = 0; j < deniedArea.length; j++) {
            if (x === deniedArea[j][0] && y === deniedArea[j][1]) {
                return false;
            }
        }

        return (x >= 0 && y >= 0 && y < hexsizeY && x < hexsizeX);

    };

    var setSelecting = function(selecting, x, y) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.GasComponent) {
                var gc = le.components.GasComponent;
                if (gc.getAmount() > 0 && selecting) {
                    playerPos = [x, y];
                    gc.setAmount(gc.getAmount() - 1);

                    //game.stateEngine.changeState('gamestate');
                    if (randomIntFromInterval(0, 1) === 1) {
                        // loadManager.loadLevel('third');
                        // game.currentLevel = 'third';
                    }
                    else if (randomIntFromInterval(0, 1) === 0) {
                        //loadManager.loadLevel('first');
                        //game.currentLevel = 'first';
                    }
                    //else {
                    // loadManager.loadLevel('second');
                    //game.currentLevel = 'second';
                    //}

                }
            }
        }
    };

    var movingPosition = function(movingUp, movingDown, movingLeft, movingRight, selecting) {

        var x = playerPos[0];
        var y = playerPos[1];

        if (movingUp === 1) {
            if (movingLeft === 1 && possiblemove(x - 1, y - 1)) {
                mapArray[x - 1][y - 1][0] = movingBlock[0];
                mapArray[x - 1][y - 1][1] = movingBlock[1];

                setSelecting(selecting, x - 1, y - 1);

            }
            else if (movingRight === 1 && possiblemove(x, y - 1)) {
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

        else if (movingDown === 1) {
            if (movingLeft === 1 && possiblemove(x - 1, y + 1)) {
                mapArray[x - 1][y + 1][0] = movingBlock[0];
                mapArray[x - 1][y + 1][1] = movingBlock[1];
                setSelecting(selecting, x - 1, y + 1);

            }
            else if (movingRight === 1 && possiblemove(x, y + 1)) {
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

    };

    var movingPositionOdd = function(movingUp, movingDown, movingLeft, movingRight, selecting) {

        var x = playerPos[0];
        var y = playerPos[1];

        if (movingUp === 1) {
            if (movingLeft === 1 && possiblemove(x, y - 1)) {
                mapArray[x][y - 1][0] = movingBlock[0];
                mapArray[x][y - 1][1] = movingBlock[1];
                setSelecting(selecting, x, y - 1);

            }
            else if (movingRight === 1 && possiblemove(x + 1, y - 1)) {
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

        else if (movingDown === 1) {
            if (movingLeft === 1 && possiblemove(x, y + 1)) {
                if (y === 0) {
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
            else if (movingRight === 1 && possiblemove(x + 1, y + 1)) {
                if (y === 0) {
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
    };

    var oneTexture = function(posX, posY) {

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
            if ((i + 1) % 2 === 0 && i !== 0) {
                tex[i] = (tex[i] / 4) + (posY * (1 / 4));
            }
            else {
                tex[i] = (tex[i] / 4) + (posX * (1 / 4));
            }

        }

        return tex;
    };

    var oneHexagon = function() {
        return [

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

    };

    var randomIntFromInterval = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var createTextures = function() {
        var allTextures = [];
        for (var i = 0; i < hexsizeX; i++) {
            for (var k = 0; k < hexsizeY; k++) {
                var oneT = oneTexture(mapArray[i][k][0], mapArray[i][k][1]);
                for (var j = 0; j < oneT.length; j++) {
                    allTextures.push(oneT[j]);
                }
            }
        }
        return allTextures;
    };

    var createHexagonArea = function() {


        /*

         -1,2     1,2
         ------
         -2,0  /|   / |\  2,0
         \| /   |/
         \...../
         -1,-2   1,-2


         */

        var oh = oneHexagon();

        var allHexagons = [];

        for (var x = 0; x < hexsizeX; x++) {

            for (var y = 0; y < hexsizeY; y++) {

                var addition = 0;
                if ((y + 1) % 2 === 0) {
                    addition = 3.5;
                }
                for (var h = 0; h < oh.length; h += 3) {

                    allHexagons.push(oh[h] + (x * 7) + addition);
                    allHexagons.push(0);
                    allHexagons.push(oh[h + 2] + (y * 2.5));

                }
            }
        }

        return allHexagons;

    };

    return Object.freeze({
        init,
        //getTexture: function() {
        //    return texture;
        //},
        start: function() {

        },
        getArea: function() {
            return area;
        },
        updateArea,
        getTextureCoordinates: function() {
            return textureCoordinates;
        },
        getHexsizeX: function() {
            return hexsizeX;
        },
        getHexsizeY: function() {
            return hexsizeY;
        }

    });

}