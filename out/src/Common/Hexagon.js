var Hexagon = function Hexagon(size) {
  "use strict";
  this.hexsize = size;
  this.area = this.createHexagonArea();
  this.textureCoordinates = this.createTextures();
  var t = new Texture('maptiles', true);
  this.texture = t.loadedTexture;
};
($traceurRuntime.createClass)(Hexagon, {
  updateArea: function(holes, visited, xPlayerPos, yPlayerPos) {
    "use strict";
  },
  oneTexture: function(posX, posY) {
    "use strict";
    var tex = [3 / 4, 1 - 1 / 16, 1 / 4, 1 - 1 / 16, 1 / 4, 1 / 16, 3 / 4, 1 - 1 / 16, 1 / 4, 1 / 16, 3 / 4, 1 / 16, 3 / 4, 1 - 1 / 16, 3 / 4, 1 / 16, 1, 0.5, 1 / 4, 1 - 1 / 16, 0, 0.5, 1 / 4, 1 / 16];
    for (var i = 0; i < tex.length; i++) {
      if ((i + 1) % 2 == 0 && i != 0) {
        $traceurRuntime.setProperty(tex, i, (tex[$traceurRuntime.toProperty(i)] / 4) + (posY * (1 / 4)));
      } else {
        $traceurRuntime.setProperty(tex, i, (tex[$traceurRuntime.toProperty(i)] / 4) + (posX * (1 / 4)));
      }
    }
    return tex;
  },
  oneHexagon: function() {
    "use strict";
    var oneHexagon = [1, 0, 2, -1, 0, 2, -1, 0, -2, 1, 0, 2, -1, 0, -2, 1, 0, -2, 1, 0, 2, 1, 0, -2, 2, 0, 0, -1, 0, 2, -2, 0, 0, -1, 0, -2];
    return oneHexagon;
  },
  randomIntFromInterval: function(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  createTextures: function() {
    "use strict";
    var allTextures = [];
    for (var i = 0; i < this.hexsize; i++) {
      for (var k = 0; k < this.hexsize * 3; k++) {
        var oneTexture = this.oneTexture(this.randomIntFromInterval(0, 3), this.randomIntFromInterval(0, 3));
        for (var j = 0; j < oneTexture.length; j++) {
          allTextures.push(oneTexture[$traceurRuntime.toProperty(j)]);
        }
      }
    }
    return allTextures;
  },
  createHexagonArea: function() {
    "use strict";
    var oneHexagon = this.oneHexagon();
    var allHexagons = [];
    for (var x = 0; x < this.hexsize; x++) {
      for (var y = 0; y < this.hexsize * 3; y++) {
        var addition = 0;
        if ((y + 1) % 2 == 0)
          addition = 3.5;
        for (var h = 0; h < oneHexagon.length; h += 3) {
          allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h)] + (x * 7) + addition);
          allHexagons.push(0);
          allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h + 2)] + (y * 2.5));
        }
      }
    }
    return allHexagons;
  }
}, {});
