function sprite_constructor(sb) {
  var gl = sb.getGL();
  var t = texture_constructor(sb);
  var loadReturn = {};
  var load = function(name) {
    t.load({name: name});
    var pointStartPositionsBuffer = gl.createBuffer();
    var numParticles = 1;
    var startPositions = [];
    startPositions.push(0);
    startPositions.push(0);
    startPositions.push(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
    loadReturn = {};
    loadReturn.itemSize = 3;
    loadReturn.numItems = numParticles;
    loadReturn.texture = t.getLoadedTexture();
    loadReturn.buffer = pointStartPositionsBuffer;
    return loadReturn;
  };
  return {load: load};
}
