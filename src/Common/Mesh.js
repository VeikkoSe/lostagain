function mesh_constructor(sandbox) {
    'use strict';
    // var {name,game} = params;
    var sb = sandbox;
    var vertices = [];
    var texturecoordinates = [];
    var normals = [];
    var indices = [];
    var xPos = 0;
    var yPos = 0;
    var zPos = 0;
    var gl = sb.getGL();

    //

    var ambient = null;
    var diffuse = null;
    var specular = null;
    var texture = null;

    //var rotation = 0;

    var vertexPositionBuffer = gl.createBuffer();
    var texturePositionBuffer = gl.createBuffer();
    var indexPositionBuffer = gl.createBuffer();
    var normalPositionBuffer = gl.createBuffer();

    //loadMesh();

    //var t = new Texture(this.name);

    //this.texture = t.loadedTexture;
    //this.textureLoaded = t.loaded;

    var getTexture = function() {
        return texture;
    };

    var loadMesh = function(name) {

        //loadManager.loadTotal++;
        var tc = texture_constructor(sb);

        tc.load(name, false, false);

        texture = tc.getLoadedTexture();

        //texture = tc.loadedTexture;

        var request = new XMLHttpRequest();
        request.open("GET", "resources/models/" + name + ".js?" + Math.random(), true);
        request.send();
        //var that = this;

        request.onreadystatechange = function() {

            if (request.readyState == 4 && request.status == 200) {

                inputData(request.responseText);
                buildBuffers();
                //loadManager.loadTotal--;
                sb.publish("assetload", 'name');
            }
        }

    };

    var inputData = function(data) {

        var d = JSON.parse(data);

        vertices = d.vertices;
        texturecoordinates = d.texturecoordinates;
        indices = d.indices;

        //if (d.normals.length < 1) {
        normals = createNormals(vertices, indices);
        //}
        //else {
        //    this.normals = d.normals;
        //}

        xPos = d.x;
        yPos = d.y;
        zPos = d.z;
        //this.batch = d.batch;

        ambient = d.ambient;
        diffuse = d.diffuse;
        specular = d.specular;

    };

    var createNormals = function(vs, ind) {
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
    };

    var buildBuffers = function() {

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        vertexPositionBuffer.itemSize = 3;
        vertexPositionBuffer.numItems = vertices.length / 3;

        gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texturecoordinates), gl.STATIC_DRAW);
        texturePositionBuffer.itemSize = 2;
        texturePositionBuffer.numItems = texturecoordinates.length / 2;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexPositionBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        indexPositionBuffer.itemSize = 1;
        indexPositionBuffer.numItems = indices.length;

        if (normals.length > 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, normalPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
            normalPositionBuffer.itemSize = 1;
            normalPositionBuffer.numItems = normals.length / 3;
        }
    };

    return Object.freeze({ // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

        loadMesh,
        getTexture,
        getVertexPositionBuffer: function() {
            return vertexPositionBuffer;
        },
        getTexturePositionBuffer: function() {
            return texturePositionBuffer;
        },
        getIndexPositionBuffer: function() {
            return indexPositionBuffer;
        },
        getNormalPositionBuffer: function() {
            return normalPositionBuffer;
        }

    });
}
