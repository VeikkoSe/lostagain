class Mesh {
    constructor(name) {

        // var that = this;
        this.name = name;
        this.vertices = null;
        this.texturecoordinates = [];
        this.normals = [];
        this.indices = [];
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.batch = 0;
        this.meshLoaded = false;
        levelManager.loadTotal++;


        this.ambient = null;
        this.diffuse = null;
        this.specular = null;


        this.rotation = 0;

        this.vertexPositionBuffer = gl.createBuffer();
        this.texturePositionBuffer = gl.createBuffer();
        this.indexPositionBuffer = gl.createBuffer();
        this.normalPositionBuffer = gl.createBuffer();


        this.loadMesh();

        var t = new Texture(this.name);

        this.texture = t.loadedTexture;
        this.textureLoaded = t.loaded;

    }


    loadMesh() {


        var request = new XMLHttpRequest();
        request.open("GET", "resources/models/" + this.name + ".js?" + Math.random(), true);
        request.send();
        var that = this;

        request.onreadystatechange = function () {


            if (request.readyState == 4 && request.status == 200) {

                that.inputData(request.responseText);
                that.buildBuffers();
                levelManager.loadTotal--;
            }
        }


    }


    inputData(data) {


        var d = JSON.parse(data);

        this.vertices = d.vertices;

        this.texturecoordinates = d.texturecoordinates;

        this.indices = d.indices;

        //if (d.normals.length < 1) {
        this.normals = this.createNormals(this.vertices, this.indices);
        //}
        //else {
        //    this.normals = d.normals;
        //}

        this.xPos = d.x;
        this.yPos = d.y;
        this.zPos = d.z;
        //this.batch = d.batch;


        this.ambient = d.ambient;
        this.diffuse = d.diffuse;
        this.specular = d.specular;

    }

    createNormals(vs, ind) {
        var x = 0;
        var y = 1;
        var z = 2;

        var ns = [];
        for (var i = 0; i < vs.length; i++) { //for each vertex, initialize normal x, normal y, normal z
            ns[i] = 0.0;
        }

        for (var i = 0; i < ind.length; i = i + 3) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
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
            for (var j = 0; j < 3; j++) { //update the normals of that triangle: sum of vectors
                ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
                ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
                ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
            }
        }
        //normalize the result
        for (var i = 0; i < vs.length; i = i + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

            var nn = [];
            nn[x] = ns[i + x];
            nn[y] = ns[i + y];
            nn[z] = ns[i + z];

            var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
            if (len == 0) len = 0.00001;

            nn[x] = nn[x] / len;
            nn[y] = nn[y] / len;
            nn[z] = nn[z] / len;

            ns[i + x] = nn[x];
            ns[i + y] = nn[y];
            ns[i + z] = nn[z];
        }

        return ns;
    }


    buildBuffers() {

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        this.vertexPositionBuffer.itemSize = 3;
        this.vertexPositionBuffer.numItems = this.vertices.length / 3;


        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texturecoordinates), gl.STATIC_DRAW);
        this.texturePositionBuffer.itemSize = 2;
        this.texturePositionBuffer.numItems = this.texturecoordinates.length / 2;


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
        this.indexPositionBuffer.itemSize = 1;
        this.indexPositionBuffer.numItems = this.indices.length;

        if (this.normals.length > 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
            this.normalPositionBuffer.itemSize = 1;
            this.normalPositionBuffer.numItems = this.normals.length / 3;
        }
    }
}
