function mesh_constructor(sandbox) {
  var sb = sandbox;
  var vertices = [];
  var texturecoordinates = [];
  var normals = [];
  var indices = [];
  var xPos = 0;
  var yPos = 0;
  var zPos = 0;
  var gl = sb.getGL();
  var ambient = null;
  var diffuse = null;
  var specular = null;
  var texture = null;
  var vertexPositionBuffer = gl.createBuffer();
  var texturePositionBuffer = gl.createBuffer();
  var indexPositionBuffer = gl.createBuffer();
  var normalPositionBuffer = gl.createBuffer();
  var getTexture = function() {
    return texture;
  };
  var loadMesh = function(name) {
    var tc = texture_constructor(sb);
    tc.load({name: name});
    texture = tc.getLoadedTexture();
    var request = new XMLHttpRequest();
    request.open("GET", "resources/models/" + name + ".js?" + Math.random(), true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        inputData(request.responseText);
        buildBuffers();
        sb.publish("assetload", 'name');
      }
    };
  };
  var inputData = function(data) {
    var d = JSON.parse(data);
    vertices = d.vertices;
    texturecoordinates = d.texturecoordinates;
    indices = d.indices;
    normals = createNormals(vertices, indices);
    xPos = d.x;
    yPos = d.y;
    zPos = d.z;
    ambient = d.ambient;
    diffuse = d.diffuse;
    specular = d.specular;
  };
  var createNormals = function(vs, ind) {
    var x = 0;
    var y = 1;
    var z = 2;
    var ns = [];
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < vs.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  $traceurRuntime.setProperty(ns, i, 0.0);
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < ind.length; $i = $i + 3) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  try {
                    throw undefined;
                  } catch (normal) {
                    try {
                      throw undefined;
                    } catch (v2) {
                      try {
                        throw undefined;
                      } catch (v1) {
                        {
                          v1 = [];
                          v2 = [];
                          normal = [];
                          $traceurRuntime.setProperty(v1, x, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + x)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i)] + x)]);
                          $traceurRuntime.setProperty(v1, y, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + y)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i)] + y)]);
                          $traceurRuntime.setProperty(v1, z, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + z)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i)] + z)]);
                          $traceurRuntime.setProperty(v2, x, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 2)] + x)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + x)]);
                          $traceurRuntime.setProperty(v2, y, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 2)] + y)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + y)]);
                          $traceurRuntime.setProperty(v2, z, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 2)] + z)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + z)]);
                          $traceurRuntime.setProperty(normal, x, v1[$traceurRuntime.toProperty(y)] * v2[$traceurRuntime.toProperty(z)] - v1[$traceurRuntime.toProperty(z)] * v2[$traceurRuntime.toProperty(y)]);
                          $traceurRuntime.setProperty(normal, y, v1[$traceurRuntime.toProperty(z)] * v2[$traceurRuntime.toProperty(x)] - v1[$traceurRuntime.toProperty(x)] * v2[$traceurRuntime.toProperty(z)]);
                          $traceurRuntime.setProperty(normal, z, v1[$traceurRuntime.toProperty(x)] * v2[$traceurRuntime.toProperty(y)] - v1[$traceurRuntime.toProperty(y)] * v2[$traceurRuntime.toProperty(x)]);
                          {
                            try {
                              throw undefined;
                            } catch ($j) {
                              {
                                $j = 0;
                                for (; $j < 3; $j++) {
                                  try {
                                    throw undefined;
                                  } catch (j) {
                                    {
                                      j = $j;
                                      try {
                                        $traceurRuntime.setProperty(ns, 3 * ind[$traceurRuntime.toProperty(i + j)] + x, ns[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + j)] + x)] + normal[$traceurRuntime.toProperty(x)]);
                                        $traceurRuntime.setProperty(ns, 3 * ind[$traceurRuntime.toProperty(i + j)] + y, ns[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + j)] + y)] + normal[$traceurRuntime.toProperty(y)]);
                                        $traceurRuntime.setProperty(ns, 3 * ind[$traceurRuntime.toProperty(i + j)] + z, ns[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + j)] + z)] + normal[$traceurRuntime.toProperty(z)]);
                                      } finally {
                                        $j = j;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < vs.length; $i = $i + 3) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  try {
                    throw undefined;
                  } catch (len) {
                    try {
                      throw undefined;
                    } catch (nn) {
                      {
                        nn = [];
                        $traceurRuntime.setProperty(nn, x, ns[$traceurRuntime.toProperty(i + x)]);
                        $traceurRuntime.setProperty(nn, y, ns[$traceurRuntime.toProperty(i + y)]);
                        $traceurRuntime.setProperty(nn, z, ns[$traceurRuntime.toProperty(i + z)]);
                        len = Math.sqrt((nn[$traceurRuntime.toProperty(x)] * nn[$traceurRuntime.toProperty(x)]) + (nn[$traceurRuntime.toProperty(y)] * nn[$traceurRuntime.toProperty(y)]) + (nn[$traceurRuntime.toProperty(z)] * nn[$traceurRuntime.toProperty(z)]));
                        if (len == 0)
                          len = 0.00001;
                        $traceurRuntime.setProperty(nn, x, nn[$traceurRuntime.toProperty(x)] / len);
                        $traceurRuntime.setProperty(nn, y, nn[$traceurRuntime.toProperty(y)] / len);
                        $traceurRuntime.setProperty(nn, z, nn[$traceurRuntime.toProperty(z)] / len);
                        $traceurRuntime.setProperty(ns, i + x, nn[$traceurRuntime.toProperty(x)]);
                        $traceurRuntime.setProperty(ns, i + y, nn[$traceurRuntime.toProperty(y)]);
                        $traceurRuntime.setProperty(ns, i + z, nn[$traceurRuntime.toProperty(z)]);
                      }
                    }
                  }
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
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
  return Object.freeze({
    loadMesh: loadMesh,
    getTexture: getTexture,
    vertexPositionBuffer: vertexPositionBuffer,
    texturePositionBuffer: texturePositionBuffer,
    indexPositionBuffer: indexPositionBuffer,
    normalPositionBuffer: normalPositionBuffer
  });
}
