var Hexagon = function Hexagon(size) {
  "use strict";
  this.hexsize = size;
  this.area = this.createHexagonArea();
  this.textureCoordinates = this.oneTexture();
  var t = new Texture('maptiles', true);
  this.texture = t.loadedTexture;
};
($traceurRuntime.createClass)(Hexagon, {
  updateArea: function(holes, visited, xPlayerPos, yPlayerPos) {
    "use strict";
  },
  oneTexture: function() {
    "use strict";
    var tex = [3 / 4, 1 - 1 / 16, 1 / 4, 1 - 1 / 16, 1 / 4, 1 / 16, 3 / 4, 1 - 1 / 16, 1 / 4, 1 / 16, 3 / 4, 1 / 16, 3 / 4, 1 - 1 / 16, 3 / 4, 1 / 16, 1, 0.5, 1 / 4, 1 - 1 / 16, 0, 0.5, 1 / 4, 1 / 16];
    return tex;
  },
  oneHexagon: function() {
    "use strict";
    var oneHexagon = [1, 0, 2, -1, 0, 2, -1, 0, -2, 1, 0, 2, -1, 0, -2, 1, 0, -2, 1, 0, 2, 1, 0, -2, 2, 0, 0, -1, 0, 2, -2, 0, 0, -1, 0, -2];
    return oneHexagon;
  },
  createHexagonArea: function(size) {
    "use strict";
    var oneHexagon = this.oneHexagon();
    var allHexagons = [];
    for (var x = 0; x < this.hexsize; x++) {
      for (var y = 0; y < this.hexsize; y++) {
        var addition = 0;
        if ((y + 1) % 2 == 0)
          addition = 3.5;
        for (var h = 0; h < oneHexagon.length; h += 3) {
          allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h)]);
          allHexagons.push(0);
          allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h + 2)]);
        }
      }
    }
    return allHexagons;
  }
}, {});
