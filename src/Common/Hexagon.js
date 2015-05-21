class Hexagon {

    constructor(size) {

        //this.data = null;
        //this.initDone = 0;

        //this.vertexPositionBuffer = gl.createBuffer();
        //this.texturePositionBuffer = gl.createBuffer();
        //this.indexPositionBuffer = gl.createBuffer();
        //this.normalPositionBuffer = gl.createBuffer();
        this.hexsize = size;

        this.area = this.createHexagonArea();
        this.textureCoordinates = this.oneTexture();

        var t = new Texture('maptiles',true);

        this.texture = t.loadedTexture;



    }

    updateArea(holes,visited,xPlayerPos,yPlayerPos) {

    }
    oneTexture() {
       var tex = [


            //center square
           3/4,1-1/16,
           1/4,1-1/16,
           1/4,1/16,

           3/4,1-1/16,
           1/4,1/16,
           3/4,1/16,

            //right side
           3/4,1-1/16,
           3/4,1/16,
           1,0.5,


            //left side

           1/4,1-1/16,
            0,0.5,
           1/4,1/16




        ];

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

    createHexagonArea(size) {

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


            //for (var y = 0; y < size*3; y++) {
            for (var y = 0; y < this.hexsize; y++) {
                var addition = 0;
                if ((y + 1) % 2 == 0)
                    addition = 3.5;
                //console.log(oneHexagon.length);


                for (var h = 0; h < oneHexagon.length; h += 3) {


/*
                    allHexagons.push(oneHexagon[h] + (x * 7) + addition);
                    allHexagons.push(0);
                    allHexagons.push(oneHexagon[h + 2] + (y * 2.5 ));
*/
                    allHexagons.push(oneHexagon[h]);
                    allHexagons.push(0);
                    allHexagons.push(oneHexagon[h + 2] );



                    /*
                    var jj = h%9;

                    if(g==2) {




                        allHexagons.push(1);
                        allHexagons.push(1);
                        allHexagons.push(0);
                        allHexagons.push(1);
                        allHexagons.push(0);
                        allHexagons.push(1);
                    }
                    */

                    //g++;
                }
            }
        }

        return allHexagons;

    }


}