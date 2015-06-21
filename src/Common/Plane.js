/*
 class Plane {

 constructor(size) {

 this.data = null;
 this.initDone = 0;

 this.vertexPositionBuffer = gl.createBuffer();
 //this.texturePositionBuffer = gl.createBuffer();
 this.indexPositionBuffer = gl.createBuffer();
 this.normalPositionBuffer = gl.createBuffer();

 this.plane = this.createHeightMap(size);
 }



 createHeightMap(size) {



 //let heightData = this.getHeightData(this.texture.loadedTexture.image);

 let squares = size;
 let width = size;

 let xLength = squares;
 let yLength = squares;

 let heightMapVertexData = [];
 let hd = [];

 let part = width / squares;

 let c = 0;
 // First, build the data for the vertex buffer
 for (let x = 0; x < xLength; x++) {

 for (let y = 0; y < yLength; y++) {

 //first triangle of square
 let xPosition1 = x + 1;
 let yPosition1 = y;

 let xPosition2 = x + 1;
 let yPosition2 = y + 1;

 let xPosition3 = x;
 let yPosition3 = y;

 //second triangle of square
 let xPosition4 = x;
 let yPosition4 = y;

 let xPosition5 = x + 1;
 let yPosition5 = y + 1;

 let xPosition6 = x;
 let yPosition6 = y + 1;


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
 let iloop = [];
 //indice order number
 let il = 0;
 //if we have already used a vertice don't add it again
 //just link the original with index
 let added = {};


 //we create indexbuffer
 for (let i = 0; i < hd.length; i++) {
 let alreadyAdded = false;

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

 let normals = this.createNormals(heightMapVertexData, iloop);


 // let fakeTexture = [];
 //  let c = 0;
 // for (let i = 0; i < normals.length; i++) {
 //     fakeTexture[c] = 0;
 //     c++;
 //     fakeTexture[c] = 1;
 //    c++;

 //}
 //console.log(fakeTexture);
 //console.log(normals);


 //gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
 //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fakeTexture), gl.STATIC_DRAW);


 gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(heightMapVertexData), gl.STATIC_DRAW);

 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iloop), gl.STATIC_DRAW);
 this.indexPositionBuffer.numItems = iloop.length;

 gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

 return;
 }


 createNormals(vs, ind) {
 let x = 0;
 let y = 1;
 let z = 2;

 let ns = [];
 for (let i = 0; i < vs.length; i++) { //for each vertex, initialize normal x, normal y, normal z
 ns[i] = 0.0;
 }

 for (let i = 0; i < ind.length; i = i + 3) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
 let v1 = [];
 let v2 = [];
 let normal = [];
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
 for (let j = 0; j < 3; j++) { //update the normals of that triangle: sum of vectors
 ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
 ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
 ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
 }
 }
 //normalize the result
 for (let i = 0; i < vs.length; i = i + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

 let nn = [];
 nn[x] = ns[i + x];
 nn[y] = ns[i + y];
 nn[z] = ns[i + z];

 let len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
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
 }
 */