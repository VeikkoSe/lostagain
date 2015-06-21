var Hexagon = function Hexagon(size) {
  "use strict";
  this.hexsizeX = size;
  this.hexsizeY = size * 3;
  this.mapLevels = [];
  {
    try {
      throw undefined;
    } catch ($x) {
      {
        $x = 0;
        for (; $x < this.hexsizeX; $x++) {
          try {
            throw undefined;
          } catch (x) {
            {
              x = $x;
              try {
                $traceurRuntime.setProperty(this.mapLevels, x, []);
                {
                  try {
                    throw undefined;
                  } catch ($y) {
                    {
                      $y = 0;
                      for (; $y < this.hexsizeY; $y++) {
                        try {
                          throw undefined;
                        } catch (y) {
                          {
                            y = $y;
                            try {
                              $traceurRuntime.setProperty(this.mapLevels[$traceurRuntime.toProperty(x)], y, []);
                              $traceurRuntime.setProperty(this.mapLevels[$traceurRuntime.toProperty(x)], y, this.randomIntFromInterval(1, 3));
                            } finally {
                              $y = y;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } finally {
                $x = x;
              }
            }
          }
        }
      }
    }
  }
  this.deniedBlock = [2, 0];
  this.movableBlock = [3, 1];
  this.movingBlock = [0, 2];
  this.baseBlock = [2, 3];
  this.posBlock = [4, 0];
  this.bossBlock = [0, 3];
  this.deniedArea = [];
  this.bossPos = [3, 11];
  this.playerPos = [1, 1];
  this.mapArray = [];
  this.deniedAmount = 4;
  this.visited = [];
  this.deniedBlocks();
  this.updateArea();
  this.area = this.createHexagonArea();
  this.textureCoordinates = this.createTextures();
  var t = new Texture('maptiles', true);
  this.texture = t.loadedTexture;
};
($traceurRuntime.createClass)(Hexagon, {
  getPlayerPosXInWC: function() {
    "use strict";
    if (this.playerPos[1] % 2 == 0 && this.playerPos[1] != 0) {
      return this.playerPos[0] * 7;
    } else {
      return 3 + this.playerPos[0] * 7;
    }
  },
  getPlayerPosZInWC: function() {
    "use strict";
    return this.playerPos[1] * 2.5;
  },
  deniedBlocks: function() {
    "use strict";
    var amount = this.deniedAmount;
    var g = 0;
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < amount; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  try {
                    throw undefined;
                  } catch (randY) {
                    try {
                      throw undefined;
                    } catch (randX) {
                      {
                        randX = this.randomIntFromInterval(0, this.hexsizeX - 1);
                        randY = this.randomIntFromInterval(0, this.hexsizeY - 1);
                        if (randX == this.playerPos[0] && randY == this.playerPos[1]) {
                          amount++;
                        } else if (randX == this.bossPos[0] && randY == this.bossPos[1]) {
                          amount++;
                        } else if (typeof this.deniedArea[$traceurRuntime.toProperty(randX)] !== 'undefined' && typeof this.deniedArea[$traceurRuntime.toProperty(randY)] !== 'undefined') {
                          amount++;
                        } else {
                          $traceurRuntime.setProperty(this.deniedArea, g, [randX, randY]);
                          g++;
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
  },
  surround: function(x, y) {
    "use strict";
    if (y % 2 == 0 && y != 0) {
      try {
        throw undefined;
      } catch (pos) {
        {
          pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x - 1, y - 1], [x - 1, y + 1]];
        }
      }
    } else {
      try {
        throw undefined;
      } catch (pos) {
        {
          pos = [[x, y + 2], [x, y - 2], [x, y - 1], [x, y + 1], [x + 1, y - 1]];
          if (y !== 0) {
            pos.push([x + 1, y + 1]);
          } else {
            pos.push([x - 1, y + 1]);
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
          for (; $i < pos.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  if (pos[$traceurRuntime.toProperty(i)][0] < 0 || pos[$traceurRuntime.toProperty(i)][1] < 0) {
                    pos.splice(i, 1);
                    i--;
                  }
                  if (pos[$traceurRuntime.toProperty(i)][0] > this.hexsizeX - 1 || pos[$traceurRuntime.toProperty(i)][1] > this.hexsizeY - 1) {
                    pos.splice(i, 1);
                    i--;
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
    return pos;
  },
  updateArea: function() {
    "use strict";
    var movingUp = arguments[0] !== (void 0) ? arguments[0] : 0;
    var movingDown = arguments[1] !== (void 0) ? arguments[1] : 0;
    var movingLeft = arguments[2] !== (void 0) ? arguments[2] : 0;
    var movingRight = arguments[3] !== (void 0) ? arguments[3] : 0;
    var selecting = arguments[4] !== (void 0) ? arguments[4] : false;
    {
      try {
        throw undefined;
      } catch ($x) {
        {
          $x = 0;
          for (; $x < this.hexsizeX; $x++) {
            try {
              throw undefined;
            } catch (x) {
              {
                x = $x;
                try {
                  $traceurRuntime.setProperty(this.mapArray, x, []);
                  {
                    try {
                      throw undefined;
                    } catch ($y) {
                      {
                        $y = 0;
                        for (; $y < this.hexsizeY; $y++) {
                          try {
                            throw undefined;
                          } catch (y) {
                            {
                              y = $y;
                              try {
                                $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)], y, []);
                                $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 0, this.baseBlock[0]);
                                $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 1, this.baseBlock[1]);
                              } finally {
                                $y = y;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $x = x;
                }
              }
            }
          }
        }
      }
    }
    var surround = this.surround(this.playerPos[0], this.playerPos[1]);
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < surround.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][0])][$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][1])], 0, this.movableBlock[0]);
                  $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][0])][$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][1])], 1, this.movableBlock[1]);
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
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
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < this.deniedArea.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  try {
                    throw undefined;
                  } catch (y) {
                    try {
                      throw undefined;
                    } catch (x) {
                      {
                        x = this.deniedArea[$traceurRuntime.toProperty(i)][0];
                        y = this.deniedArea[$traceurRuntime.toProperty(i)][1];
                        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 0, this.deniedBlock[0]);
                        $traceurRuntime.setProperty(this.mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 1, this.deniedBlock[1]);
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
    this.textureCoordinates = this.createTextures();
  },
  possiblemove: function(x, y) {
    "use strict";
    {
      try {
        throw undefined;
      } catch ($j) {
        {
          $j = 0;
          for (; $j < this.deniedArea.length; $j++) {
            try {
              throw undefined;
            } catch (j) {
              {
                j = $j;
                try {
                  if (x == this.deniedArea[$traceurRuntime.toProperty(j)][0] && y == this.deniedArea[$traceurRuntime.toProperty(j)][1]) {
                    return false;
                  }
                } finally {
                  $j = j;
                }
              }
            }
          }
        }
      }
    }
    if (x >= 0 && y >= 0 && y < this.hexsizeY && x < this.hexsizeX) {
      return true;
    }
    return false;
  },
  setSelecting: function(selecting, x, y) {
    "use strict";
    {
      try {
        throw undefined;
      } catch ($e) {
        {
          $e = 0;
          for (; $e < em.entities.length; $e++) {
            try {
              throw undefined;
            } catch (e) {
              {
                e = $e;
                try {
                  try {
                    throw undefined;
                  } catch (le) {
                    {
                      le = em.entities[$traceurRuntime.toProperty(e)];
                      if (le.components.GasComponent) {
                        try {
                          throw undefined;
                        } catch (gc) {
                          {
                            gc = le.components.GasComponent;
                            if (gc.amount > 0 && selecting) {
                              this.playerPos = [x, y];
                              gc.amount--;
                              game.stateEngine.changeState("gamestate");
                              if (this.randomIntFromInterval(0, 1) == 1) {
                                loadManager.loadLevel('third');
                                game.currentLevel = 'third';
                              } else if (this.randomIntFromInterval(0, 1) == 0) {
                                loadManager.loadLevel('first');
                                game.currentLevel = 'first';
                              } else {
                                loadManager.loadLevel('second');
                                game.currentLevel = 'second';
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $e = e;
                }
              }
            }
          }
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
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < tex.length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  if ((i + 1) % 2 == 0 && i != 0) {
                    $traceurRuntime.setProperty(tex, i, (tex[$traceurRuntime.toProperty(i)] / 4) + (posY * (1 / 4)));
                  } else {
                    $traceurRuntime.setProperty(tex, i, (tex[$traceurRuntime.toProperty(i)] / 4) + (posX * (1 / 4)));
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
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < this.hexsizeX; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  {
                    try {
                      throw undefined;
                    } catch ($k) {
                      {
                        $k = 0;
                        for (; $k < this.hexsizeY; $k++) {
                          try {
                            throw undefined;
                          } catch (k) {
                            {
                              k = $k;
                              try {
                                try {
                                  throw undefined;
                                } catch (oneTexture) {
                                  {
                                    oneTexture = this.oneTexture(this.mapArray[$traceurRuntime.toProperty(i)][$traceurRuntime.toProperty(k)][0], this.mapArray[$traceurRuntime.toProperty(i)][$traceurRuntime.toProperty(k)][1]);
                                    {
                                      try {
                                        throw undefined;
                                      } catch ($j) {
                                        {
                                          $j = 0;
                                          for (; $j < oneTexture.length; $j++) {
                                            try {
                                              throw undefined;
                                            } catch (j) {
                                              {
                                                j = $j;
                                                try {
                                                  allTextures.push(oneTexture[$traceurRuntime.toProperty(j)]);
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
                              } finally {
                                $k = k;
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
    return allTextures;
  },
  createHexagonArea: function() {
    "use strict";
    var oneHexagon = this.oneHexagon();
    var allHexagons = [];
    {
      try {
        throw undefined;
      } catch ($x) {
        {
          $x = 0;
          for (; $x < this.hexsizeX; $x++) {
            try {
              throw undefined;
            } catch (x) {
              {
                x = $x;
                try {
                  {
                    try {
                      throw undefined;
                    } catch ($y) {
                      {
                        $y = 0;
                        for (; $y < this.hexsizeY; $y++) {
                          try {
                            throw undefined;
                          } catch (y) {
                            {
                              y = $y;
                              try {
                                try {
                                  throw undefined;
                                } catch (addition) {
                                  {
                                    addition = 0;
                                    if ((y + 1) % 2 == 0)
                                      addition = 3.5;
                                    {
                                      try {
                                        throw undefined;
                                      } catch ($h) {
                                        {
                                          $h = 0;
                                          for (; $h < oneHexagon.length; $h += 3) {
                                            try {
                                              throw undefined;
                                            } catch (h) {
                                              {
                                                h = $h;
                                                try {
                                                  allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h)] + (x * 7) + addition);
                                                  allHexagons.push(0);
                                                  allHexagons.push(oneHexagon[$traceurRuntime.toProperty(h + 2)] + (y * 2.5));
                                                } finally {
                                                  $h = h;
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
                                $y = y;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } finally {
                  $x = x;
                }
              }
            }
          }
        }
      }
    }
    return allHexagons;
  }
}, {});
