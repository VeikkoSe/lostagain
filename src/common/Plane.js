function Plane(sb, size) {
    'use strict';

    this.gl = sb.getGL();
    this.data = null;
    this.initDone = 0;

    this.vertexPositionBuffer = this.gl.createBuffer();
    //this.texturePositionBuffer = gl.createBuffer();
    this.indexPositionBuffer = this.gl.createBuffer();
    this.normalPositionBuffer = this.gl.createBuffer();

    this.plane = this.createHeightMap(size);

}

Plane.prototype.createHeightMap = function(size) {
    'use strict';

    //var heightData = this.getHeightData(this.texture.loadedTexture.image);

    var squares = size;
    var width = size;

    var xLength = squares;
    var yLength = squares;

    var heightMapVertexData = [];
    var hd = [];

    var part = width / squares;

    var c = 0;
    // First, build the data for the vertex buffer
    for (var x = 0; x < xLength; x++) {

        for (var y = 0; y < yLength; y++) {

            //first triangle of square
            var xPosition1 = x + 1;
            var yPosition1 = y;

            var xPosition2 = x + 1;
            var yPosition2 = y + 1;

            var xPosition3 = x;
            var yPosition3 = y;

            //second triangle of square
            var xPosition4 = x;
            var yPosition4 = y;

            var xPosition5 = x + 1;
            var yPosition5 = y + 1;

            var xPosition6 = x;
            var yPosition6 = y + 1;

            // Position
            hd[c++] = [xPosition1, yPosition1];
            hd[c++] = [xPosition2, yPosition2];
            hd[c++] = [xPosition3, yPosition3];

            hd[c++] = [xPosition4, yPosition4];
            hd[c++] = [xPosition5, yPosition5];
            hd[c++] = [xPosition6, yPosition6];

        }
    }

    c = 0;
    //keeps the indices;
    var iloop = [];
    //indice order number
    var il = 0;
    //if we have already used a vertice don't add it again
    //just link the original with index
    var added = {};

    //we create indexbuffer
    for (var i = 0; i < hd.length; i++) {
        var alreadyAdded = false;

        if (hd[i][0] + ',' + hd[i][1] in added) {

            iloop.push(added[hd[i][0] + ',' + hd[i][1]]);
            alreadyAdded = true;

        }

        if (!alreadyAdded) {
            //x y z
            //y is determined from heightmap value in same xy position
            heightMapVertexData[c++] = hd[i][1] * part; //z

            heightMapVertexData[c++] = 0;//heightData[hd[i][1]][hd[i][0]]; //y
            heightMapVertexData[c++] = hd[i][0] * part; //x

            added[hd[i][0] + ',' + hd[i][1]] = il;
            iloop.push(il);

            il++;
        }
    }

    var normals = this.createNormals(heightMapVertexData, iloop);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(heightMapVertexData), this.gl.STATIC_DRAW);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iloop), this.gl.STATIC_DRAW);
    this.indexPositionBuffer.numItems = iloop.length;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalPositionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);

};

Plane.prototype.createNormals = function(vs, ind) {
    'use strict';

    var x = 0;
    var y = 1;
    var z = 2;

    var ns = [];
    //for each vertex, initialize normal x, normal y, normal z
    for (var i = 0; i < vs.length; i++) {
        ns[i] = 0.0;
    }
    //we work on triads of vertices to
    //  calculate normals so i = i+3 (i = indices index)
    for (i = 0; i < ind.length; i = i + 3) {
        var v1 = [];
        var v2 = [];
        var normal = [];
        //p1 - p0
        v1[x] = vs[3 * ind[i + 1] + x] - vs[3 * ind[i] + x];
        v1[y] = vs[3 * ind[i + 1] + y] - vs[3 * ind[i] + y];
        v1[z] = vs[3 * ind[i + 1] + z] - vs[3 * ind[i] + z];
        // p0 - p1
        v2[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
        v2[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
        v2[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];
        //p2 - p1
        // v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
        // v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
        // v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
        // p0 - p1
        // v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
        // v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
        // v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
        //cross product by Sarrus Rule
        normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
        normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
        normal[z] = v1[x] * v2[y] - v1[y] * v2[x];

        // ns[3*ind[i]+x] += normal[x];
        // ns[3*ind[i]+y] += normal[y];
        // ns[3*ind[i]+z] += normal[z];

        //update the normals of that triangle: sum of vectors
        for (var j = 0; j < 3; j++) {
            ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
            ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
            ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
        }
    }
    //normalize the result
    //the increment here is because each vertex occurs
    // with an offset of 3 in the array (due to x, y, z contiguous values)
    for (i = 0; i < vs.length; i = i + 3) {

        var nn = [];
        nn[x] = ns[i + x];
        nn[y] = ns[i + y];
        nn[z] = ns[i + z];

        var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
        if (len === 0) {
            len = 0.00001;
        }

        nn[x] = nn[x] / len;
        nn[y] = nn[y] / len;
        nn[z] = nn[z] / len;

        ns[i + x] = nn[x];
        ns[i + y] = nn[y];
        ns[i + z] = nn[z];
    }

    return ns;
};
