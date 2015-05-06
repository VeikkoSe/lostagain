var Hexagon = function Hexagon(size) {
  "use strict";
  this.area = this.createHexagonArea(size);
};
($traceurRuntime.createClass)(Hexagon, {
  updateArea: function(holes, visited, xPlayerPos, yPlayerPos) {
    "use strict";
  },
  createHexagonArea: function(size) {
    "use strict";
    var oneHexagon = [1, 0, 2, -1, 0, 2, -1, 0, -2, 1, 0, 2, -1, 0, -2, 1, 0, -2, 1, 0, 2, 1, 0, -2, 2, 0, 0, -1, 0, 2, -2, 0, 0, -1, 0, -2];
    var allHexagons = [];
    for (var x = 0; x < size; x++) {
      for (var y = 0; y < size * 3; y++) {
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
