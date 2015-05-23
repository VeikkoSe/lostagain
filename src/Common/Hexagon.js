class Hexagon {

    constructor(size) {


        this.hexsize = size;

        this.area = this.createHexagonArea();
        this.textureCoordinates = this.createTextures();

        var t = new Texture('maptiles', true);

        this.texture = t.loadedTexture;


    }


    updateArea(holes, visited, xPlayerPos, yPlayerPos) {

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
        for (var i = 0; i < this.hexsize; i++) {
            for (var k = 0; k < this.hexsize * 3; k++) {
                var oneTexture = this.oneTexture(this.randomIntFromInterval(0, 3), this.randomIntFromInterval(0, 3));
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

        for (var x = 0; x < this.hexsize; x++) {


            for (var y = 0; y < this.hexsize * 3; y++) {

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