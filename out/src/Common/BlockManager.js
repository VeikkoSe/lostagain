var BlockManager = function BlockManager() {
  "use strict";
  this.parts = [];
  this.currentBlock = 0;
  this.mapSize = 2048;
  this.blockSize = 256;
  this.part = this.mapSize / this.blockSize;
  var d = 0;
  var cnt = this.part * this.part;
  {
    try {
      throw undefined;
    } catch ($s) {
      {
        $s = 0;
        for (; $s < cnt; $s++) {
          try {
            throw undefined;
          } catch (s) {
            {
              s = $s;
              try {
                $traceurRuntime.setProperty(this.parts, s, []);
                if (s - this.part - 1 >= 0 && (s - this.part) % this.part != 0) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s - this.part - 1);
                }
                if (s - this.part >= 0) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s - this.part);
                }
                if (s - this.part + 1 >= 0 && (s - this.part + 1) % this.part != 0) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s - this.part + 1);
                }
                if (s - 1 >= 0 && (s) % this.part != 0) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s - 1);
                }
                if (s + 1 < cnt && (s + 1) % this.part != 0) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s + 1);
                }
                if ((s + this.part - 1 + 1) % this.part != 0 && s + this.part - 1 < cnt) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s + this.part - 1);
                }
                if (s + this.part < cnt) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s + this.part);
                }
                if (s + this.part + 1 < cnt && (s + 1) % this.part != 0) {
                  this.parts[$traceurRuntime.toProperty(s)].push(s + this.part + 1);
                }
              } finally {
                $s = s;
              }
            }
          }
        }
      }
    }
  }
};
($traceurRuntime.createClass)(BlockManager, {
  setCurrentBlock: function(block) {
    "use strict";
    this.currentBlock = block;
  },
  getCurrentBlock: function() {
    "use strict";
    return this.currentBlock;
  },
  inRange: function(block) {
    "use strict";
    {
      try {
        throw undefined;
      } catch ($i) {
        {
          $i = 0;
          for (; $i < this.parts[$traceurRuntime.toProperty(this.currentBlock)].length; $i++) {
            try {
              throw undefined;
            } catch (i) {
              {
                i = $i;
                try {
                  if (block == this.parts[$traceurRuntime.toProperty(this.currentBlock)][$traceurRuntime.toProperty(i)])
                    return true;
                } finally {
                  $i = i;
                }
              }
            }
          }
        }
      }
    }
    if (block == this.currentBlock || block == -1) {
      return true;
    }
    return false;
  },
  getBlockFromXY: function(x, y) {
    "use strict";
    var block = 0;
    var chosenblock = -1;
    {
      try {
        throw undefined;
      } catch ($yloop) {
        {
          $yloop = 0;
          for (; $yloop < this.mapSize; $yloop = $yloop + this.blockSize) {
            try {
              throw undefined;
            } catch (yloop) {
              {
                yloop = $yloop;
                try {
                  {
                    try {
                      throw undefined;
                    } catch ($xloop) {
                      {
                        $xloop = 0;
                        for (; $xloop < this.mapSize; $xloop = $xloop + this.blockSize) {
                          try {
                            throw undefined;
                          } catch (xloop) {
                            {
                              xloop = $xloop;
                              try {
                                if (x >= xloop && x < xloop + this.blockSize && y >= yloop && y < yloop + this.blockSize) {
                                  chosenblock = block;
                                  break;
                                }
                                block++;
                              } finally {
                                $xloop = xloop;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  if (chosenblock != -1) {
                    break;
                  }
                } finally {
                  $yloop = yloop;
                }
              }
            }
          }
        }
      }
    }
    return chosenblock;
  }
}, {});
