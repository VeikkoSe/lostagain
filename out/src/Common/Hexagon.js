var Hexagon = function Hexagon(size) {
  "use strict";
  this.area = this.createHexagonArea(size);
  var t = new Texture('maptiles', true);
  this.texture = t.loadedTexture;
};
($traceurRuntime.createClass)(Hexagon, {
  updateArea: function(holes, visited, xPlayerPos, yPlayerPos) {
    "use strict";
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
    for (var x = 0; x < size; x++) {
      for (var y = 0; y < size; y++) {
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
