function hexagon_constructor(size) {
  var hexsizeX = size;
  var hexsizeY = size * 3;
  var mapLevels = [];
  var deniedBlock = [2, 0];
  var movableBlock = [3, 1];
  var movingBlock = [0, 2];
  var baseBlock = [2, 3];
  var posBlock = [4, 0];
  var bossBlock = [0, 3];
  var deniedArea = [];
  var bossPos = [3, 11];
  var playerPos = [1, 1];
  var mapArray = [];
  var deniedAmount = 4;
  var visited = [];
  var init = function() {
    {
      try {
        throw undefined;
      } catch ($x) {
        {
          $x = 0;
          for (; $x < hexsizeX; $x++) {
            try {
              throw undefined;
            } catch (x) {
              {
                x = $x;
                try {
                  $traceurRuntime.setProperty(mapLevels, x, []);
                  {
                    try {
                      throw undefined;
                    } catch ($y) {
                      {
                        $y = 0;
                        for (; $y < hexsizeY; $y++) {
                          try {
                            throw undefined;
                          } catch (y) {
                            {
                              y = $y;
                              try {
                                $traceurRuntime.setProperty(mapLevels[$traceurRuntime.toProperty(x)], y, []);
                                $traceurRuntime.setProperty(mapLevels[$traceurRuntime.toProperty(x)], y, randomIntFromInterval(1, 3));
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
    deniedBlocks();
    updateArea();
    area = createHexagonArea();
    textureCoordinates = createTextures();
    var tc = texture_constructor(sb);
    tc.load({name: name});
    texture = tc.getLoadedTexture();
  };
  var getPlayerPosXInWC = function() {
    if (playerPos[1] % 2 == 0 && playerPos[1] != 0) {
      return playerPos[0] * 7;
    } else {
      return 3 + playerPos[0] * 7;
    }
  };
  var getPlayerPosZInWC = function() {
    return playerPos[1] * 2.5;
  };
  var deniedBlocks = function() {
    var amount = deniedAmount;
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
                        randX = randomIntFromInterval(0, hexsizeX - 1);
                        randY = randomIntFromInterval(0, hexsizeY - 1);
                        if (randX == playerPos[0] && randY == playerPos[1]) {
                          amount++;
                        } else if (randX == bossPos[0] && randY == bossPos[1]) {
                          amount++;
                        } else if (typeof deniedArea[$traceurRuntime.toProperty(randX)] !== 'undefined' && typeof deniedArea[$traceurRuntime.toProperty(randY)] !== 'undefined') {
                          amount++;
                        } else {
                          $traceurRuntime.setProperty(deniedArea, g, [randX, randY]);
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
  };
  var surround = function(x, y) {
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
                  if (pos[$traceurRuntime.toProperty(i)][0] > hexsizeX - 1 || pos[$traceurRuntime.toProperty(i)][1] > hexsizeY - 1) {
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
  };
  var updateArea = function() {
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
          for (; $x < hexsizeX; $x++) {
            try {
              throw undefined;
            } catch (x) {
              {
                x = $x;
                try {
                  $traceurRuntime.setProperty(mapArray, x, []);
                  {
                    try {
                      throw undefined;
                    } catch ($y) {
                      {
                        $y = 0;
                        for (; $y < hexsizeY; $y++) {
                          try {
                            throw undefined;
                          } catch (y) {
                            {
                              y = $y;
                              try {
                                $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)], y, []);
                                $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 0, baseBlock[0]);
                                $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 1, baseBlock[1]);
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
    var surround = surround(playerPos[0], playerPos[1]);
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
                  $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][0])][$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][1])], 0, movableBlock[0]);
                  $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][0])][$traceurRuntime.toProperty(surround[$traceurRuntime.toProperty(i)][1])], 1, movableBlock[1]);
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(playerPos[0])][$traceurRuntime.toProperty(playerPos[1])], 0, posBlock[0]);
    $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(playerPos[0])][$traceurRuntime.toProperty(playerPos[1])], 1, posBlock[1]);
    $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(bossPos[0])][$traceurRuntime.toProperty(bossPos[1])], 0, bossBlock[0]);
    $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(bossPos[0])][$traceurRuntime.toProperty(bossPos[1])], 1, bossBlock[1]);
    if (playerPos[1] % 2 == 0 && playerPos[1] != 0) {
      movingPosition(movingUp, movingDown, movingLeft, movingRight, selecting);
    } else {
      movingPositionOdd(movingUp, movingDown, movingLeft, movingRight, selecting);
    }
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < deniedArea.length; $i++) {
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
                        x = deniedArea[$traceurRuntime.toProperty(i)][0];
                        y = deniedArea[$traceurRuntime.toProperty(i)][1];
                        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 0, deniedBlock[0]);
                        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y)], 1, deniedBlock[1]);
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
    textureCoordinates = createTextures();
  };
  var possiblemove = function(x, y) {
    {
      try {
        throw undefined;
      } catch ($j) {
        {
          $j = 0;
          for (; $j < deniedArea.length; $j++) {
            try {
              throw undefined;
            } catch (j) {
              {
                j = $j;
                try {
                  if (x == deniedArea[$traceurRuntime.toProperty(j)][0] && y == deniedArea[$traceurRuntime.toProperty(j)][1]) {
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
    if (x >= 0 && y >= 0 && y < hexsizeY && x < hexsizeX) {
      return true;
    }
    return false;
  };
  var setSelecting = function(selecting, x, y) {
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
                              playerPos = [x, y];
                              gc.amount--;
                              game.stateEngine.changeState("gamestate");
                              if (randomIntFromInterval(0, 1) == 1) {} else if (randomIntFromInterval(0, 1) == 0) {} else {}
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
  };
  var movingPosition = function(movingUp, movingDown, movingLeft, movingRight, selecting) {
    var x = playerPos[0];
    var y = playerPos[1];
    if (movingUp == 1) {
      if (movingLeft == 1 && possiblemove(x - 1, y - 1)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y - 1)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y - 1)], 1, movingBlock[1]);
        setSelecting(selecting, x - 1, y - 1);
      } else if (movingRight == 1 && possiblemove(x, y - 1)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 1, movingBlock[1]);
        setSelecting(selecting, x, y - 1);
      } else if (possiblemove(x, y - 2)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 1, movingBlock[1]);
        setSelecting(selecting, x, y - 2);
      }
    } else if (movingDown == 1) {
      if (movingLeft == 1 && possiblemove(x - 1, y + 1)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 1, movingBlock[1]);
        setSelecting(selecting, x - 1, y + 1);
      } else if (movingRight == 1 && possiblemove(x, y + 1)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 1, movingBlock[1]);
        setSelecting(selecting, x, y + 1);
      } else if (possiblemove(x, y + 2)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 1, movingBlock[1]);
        setSelecting(selecting, x, y + 2);
      }
    }
  };
  var movingPositionOdd = function(movingUp, movingDown, movingLeft, movingRight, selecting) {
    var x = playerPos[0];
    var y = playerPos[1];
    if (movingUp == 1) {
      if (movingLeft == 1 && possiblemove(x, y - 1)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 1)], 1, movingBlock[1]);
        setSelecting(selecting, x, y - 1);
      } else if (movingRight == 1 && possiblemove(x + 1, y - 1)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y - 1)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y - 1)], 1, movingBlock[1]);
        setSelecting(selecting, x + 1, y - 1);
      } else if (possiblemove(x, y - 2)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y - 2)], 1, movingBlock[1]);
        setSelecting(selecting, x, y - 2);
      }
    } else if (movingDown == 1) {
      if (movingLeft == 1 && possiblemove(x, y + 1)) {
        if (y == 0) {
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 0, movingBlock[0]);
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x - 1)][$traceurRuntime.toProperty(y + 1)], 1, movingBlock[1]);
          setSelecting(selecting, x - 1, y + 1);
        } else {
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 0, movingBlock[0]);
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 1, movingBlock[1]);
          setSelecting(selecting, x, y + 1);
        }
      } else if (movingRight == 1 && possiblemove(x + 1, y + 1)) {
        if (y == 0) {
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 0, movingBlock[0]);
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 1)], 1, movingBlock[1]);
          setSelecting(selecting, x, y + 1);
        } else {
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y + 1)], 0, movingBlock[0]);
          $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x + 1)][$traceurRuntime.toProperty(y + 1)], 1, movingBlock[1]);
          setSelecting(selecting, x + 1, y + 1);
        }
      } else if (possiblemove(x, y + 2)) {
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 0, movingBlock[0]);
        $traceurRuntime.setProperty(mapArray[$traceurRuntime.toProperty(x)][$traceurRuntime.toProperty(y + 2)], 1, movingBlock[1]);
        setSelecting(selecting, x, y + 2);
      }
    }
  };
  var oneTexture = function(posX, posY) {
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
  };
  var oneHexagon = function() {
    var oneHexagon = [1, 0, 2, -1, 0, 2, -1, 0, -2, 1, 0, 2, -1, 0, -2, 1, 0, -2, 1, 0, 2, 1, 0, -2, 2, 0, 0, -1, 0, 2, -2, 0, 0, -1, 0, -2];
    return oneHexagon;
  };
  var randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var createTextures = function() {
    var allTextures = [];
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < hexsizeX; $i++) {
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
                        for (; $k < hexsizeY; $k++) {
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
                                    oneTexture = oneTexture(mapArray[$traceurRuntime.toProperty(i)][$traceurRuntime.toProperty(k)][0], mapArray[$traceurRuntime.toProperty(i)][$traceurRuntime.toProperty(k)][1]);
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
  };
  var createHexagonArea = function() {
    var oneHexagon = oneHexagon();
    var allHexagons = [];
    {
      try {
        throw undefined;
      } catch ($x) {
        {
          $x = 0;
          for (; $x < hexsizeX; $x++) {
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
                        for (; $y < hexsizeY; $y++) {
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
  };
  return {init: init};
}
