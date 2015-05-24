var Hexagon = function Hexagon(size) {
  "use strict";
  this.hexsizeX = size;
  this.hexsizeY = size * 3;
  this.deniedBlock = [2, 0];
  this.movableBlock = [3, 1];
  this.movingBlock = [0, 2];
  this.baseBlock = [2, 3];
  this.posBlock = [4, 0];
  this.bossBlock = [0, 3];
  this.deniedArea = [];
  this.bossPos = [3, 11];
  this.playerPos = [0, 10];
  this.mapArray = [];
  this.visited = [];
  this.deniedBlocks();
  this.updateArea();
  this.area = this.createHexagonArea();
  this.textureCoordinates = this.createTextures();
  var t = new Texture('maptiles', true);
  this.texture = t.loadedTexture;
};
($traceurRuntime.createClass)(Hexagon, {
  deniedBlocks: function() {
    "use strict";
    for (var i = 0; i < 4; i++) {
      var randX = this.randomIntFromInterval(0, this.hexsizeX - 1);
      var randY = this.randomIntFromInterval(0, this.hexsizeY - 1);
      $traceurRuntime.setProperty(this.deniedArea, i, [randX, randY]);
    }
  },
  surround: function(x, y) {
    "use strict";
    if (y % 2 == 0 && y != 0) {
      var pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x - 1, y - 1], [x - 1, y + 1]];
    } else {
      var pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x + 1, y - 1]];
      if (y !== 0) {
        pos.push([x + 1, y + 1]);
      } else {
        pos.push([x - 1, y + 1]);
      }
    }
    for (var i = 0; i < pos.length; i++) {
      if (pos[$traceurRuntime.toProperty(i)][0] < 0 || pos[$traceurRuntime.toProperty(i)][1] < 0) {
        pos.splice(i, 1);
        i--;
      }
      if (pos[$traceurRuntime.toProperty(i)][0] > this.hexsizeX - 1 || pos[$traceurRuntime.toProperty(i)][1] > this.hexsizeY - 1) {
        pos.splice(i, 1);
        i--;
      }
    }
    return pos;
  },
  updateArea: function() {
    "use strict";
    var movingUp = arguments[0] !== (void 0) ? arguments[0] : 0;
    var movingDown = arguments[1] !== (void 0) ? arguments[1] : 0;
    var movingLeft = arguments[2] !== (void 0) ? arguments[2] : 0;
    var movingRight = arguments[3] !== (void 0) ? arguments[3] : 0;
    var selecting = arguments[4] !== (void 0) ? arguments[4] : false;
    for (var x = 0; x < this.hexsizeX; x++) {
      $traceurRuntime.setProperty(this.mapArray, x, []);
      for (var y = 0; y < this.hexsizeY; y++) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)], y, []);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 0, this.baseBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 1, this.baseBlock[1]);
      }
    }
    for (var i = 0; i < this.deniedArea.length; i++) {
      var x = this.deniedArea[$traceurRuntime.toProperty(i)][0];
      var y = this.deniedArea[$traceurRuntime.toProperty(i)][1];
      $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 0, this.deniedBlock[0]);
      $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 1, this.deniedBlock[1]);
    }
    var surround = this.surround(this.playerPos[0], this.playerPos[1]);
    for (var i = 0; i < surround.length; i++) {
      $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][0])][$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][1])], 0, this.movableBlock[0]);
      $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][0])][$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][1])], 1, this.movableBlock[1]);
    }
    $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(this.playerPos[0])][$traceurRuntime.toProperty(this.playerPos[1])], 0, this.posBlock[0]);
    $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(this.playerPos[0])][$traceurRuntime.toProperty(this.playerPos[1])], 1, this.posBlock[1]);
    $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(this.bossPos[0])][$traceurRuntime.toProperty(this.bossPos[1])], 0, this.bossBlock[0]);
    $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(this.bossPos[0])][$traceurRuntime.toProperty(this.bossPos[1])], 1, this.bossBlock[1]);
    if (this.playerPos[1] % 2 == 0 && this.playerPos[1] != 0) {
      this.movingPosition(movingUp, movingDown, movingLeft, movingRight, selecting);
    } else {
      this.movingPositionOdd(movingUp, movingDown, movingLeft, movingRight, selecting);
    }
    this.textureCoordinates = this.createTextures();
  },
  possiblemove: function(x, y) {
    "use strict";
    if (x >= 0 && y >= 0 && y < this.hexsizeY && x < this.hexsizeX) {
      return true;
    }
    return false;
  },
  setSelecting: function(selecting, x, y) {
    "use strict";
    for (var e = 0; e < em.entities.length; e++) {
      var le = em.entities[$traceurRuntime.toProperty(e)];
      if (le.components.GasComponent) {
        var gc = le.components.GasComponent;
        if (gc.amount > 0 && selecting) {
          this.playerPos = [x, y];
          gc.amount--;
        }
      }
    }
  },
  movingPosition: function(movingUp, movingDown, movingLeft, movingRight, selecting) {
    "use strict";
    var x = this.playerPos[0];
    var y = this.playerPos[1];
    if (movingUp == 1) {
      if (movingLeft == 1 && this.possiblemove(x - 1, y - 1)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y - 1)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y - 1)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x - 1, y - 1);
      } else if (movingRight == 1 && this.possiblemove(x, y - 1)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x, y - 1);
      } else if (this.possiblemove(x, y - 2)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x, y - 2);
      }
    } else if (movingDown == 1) {
      if (movingLeft == 1 && this.possiblemove(x - 1, y + 1)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x - 1, y + 1);
      } else if (movingRight == 1 && this.possiblemove(x, y + 1)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x, y + 1);
      } else if (this.possiblemove(x, y + 2)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x, y + 2);
      }
    }
  },
  movingPositionOdd: function(movingUp, movingDown, movingLeft, movingRight, selecting) {
    "use strict";
    var x = this.playerPos[0];
    var y = this.playerPos[1];
    if (movingUp == 1) {
      if (movingLeft == 1 && this.possiblemove(x, y - 1)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x, y - 1);
      } else if (movingRight == 1 && this.possiblemove(x + 1, y - 1)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y - 1)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y - 1)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x + 1, y - 1);
      } else if (this.possiblemove(x, y - 2)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x, y - 2);
      }
    } else if (movingDown == 1) {
      if (movingLeft == 1 && this.possiblemove(x, y + 1)) {
        if (y == 0) {
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 0, this.movingBlock[0]);
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 1, this.movingBlock[1]);
          this.setSelecting(selecting, x - 1, y + 1);
        } else {
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 0, this.movingBlock[0]);
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 1, this.movingBlock[1]);
          this.setSelecting(selecting, x, y + 1);
        }
      } else if (movingRight == 1 && this.possiblemove(x + 1, y + 1)) {
        if (y == 0) {
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 0, this.movingBlock[0]);
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 1, this.movingBlock[1]);
          this.setSelecting(selecting, x, y + 1);
        } else {
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y + 1)], 0, this.movingBlock[0]);
          $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y + 1)], 1, this.movingBlock[1]);
          this.setSelecting(selecting, x + 1, y + 1);
        }
      } else if (this.possiblemove(x, y + 2)) {
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 0, this.movingBlock[0]);
        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 1, this.movingBlock[1]);
        this.setSelecting(selecting, x, y + 2);
      }
    }
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
    for (var i = 0; i < this.hexsizeX; i++) {
      for (var k = 0; k < this.hexsizeY; k++) {
        var oneTexture = this.oneTexture(this.mapArray[$traceurRuntime.toProperty(i)][$traceurRuntime.toProperty(k)][0], this.mapArray[$traceurRuntime.toProperty(i)][$traceurRuntime.toProperty(k)][1]);
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
    for (var x = 0; x < this.hexsizeX; x++) {
      for (var y = 0; y < this.hexsizeY; y++) {
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
