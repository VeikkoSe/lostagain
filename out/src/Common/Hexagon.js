var Hexagon = function Hexagon(size) {
  "use strict";
  this.area = this.createHexagonArea(size);
};
($traceurRuntime.createClass)(Hexagon, {createHexagonArea: function(size) {
    "use strict";
    size = 20;
    var oneHexagon = [1, 0, 2, -1, 0, 2, -1, 0, -2, 1, 0, 2, -1, 0, -2, 1, 0, -2, 1, 0, 2, 1, 0, -2, 2, 0, 0, -1, 0, 2, -2, 0, 0, -1, 0, -2];
    var allHexagons = [];
    for (var x = 0; x < size; x++) {
      for (var y = 0; y < size; y++) {
        var addition = 0;
        if ((y + 1) % 2 == 0)
          addition = 3;
        for (var h = 0; h < oneHexagon.length; h += 3) {
          allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h)] + (x * 6) + addition);
          allHexagons.push(0);
          allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h + 2)] + (y * 6));
        }
      }
    }
    console.log(allHexagons);
    return allHexagons;
  }}, {});
