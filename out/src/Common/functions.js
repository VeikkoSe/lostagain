$(document).ready(function() {
  var CORE = new Core(800, 600);
  CORE.start_modules();
  CORE.start_game();
  init();
  startSound();
});
function printMessage(msg) {
  $('#debugarea').html(msg);
}
function pInt(nro) {
  return parseInt(nro, 10);
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function logGLCall(functionName, args) {
  console.log("gl." + functionName + "(" + WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function circleXY(center, radius, amount) {
  var points = [];
  var stepSize = ((2 * Math.PI) / amount);
  var y = 0;
  {
    try {
      throw undefined;
    } catch ($d) {
      {
        $d = 0;
        for (; $d <= (2 * Math.PI) - stepSize; $d += stepSize) {
          try {
            throw undefined;
          } catch (d) {
            {
              d = $d;
              try {
                points.push(((Math.sin(d) * radius) + center.x), y, (Math.cos(d) * radius) + center.z);
              } finally {
                $d = d;
              }
            }
          }
        }
      }
    }
  }
  return points;
}
function viewport() {
  var e = window;
  var a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return {
    width: e[$traceurRuntime.toProperty(a + 'Width')],
    height: e[$traceurRuntime.toProperty(a + 'Height')]
  };
}
function updateLightPosition() {
  var x = $('#slider-x').slider("value");
  var y = $('#slider-y').slider("value");
  var z = $('#slider-z').slider("value");
  $('#slider-x-value').html(x);
  $('#slider-y-value').html(y);
  $('#slider-z-value').html(z);
}
function updateCameraPosition() {
  var x = $('#cslider-x').slider("value");
  var y = $('#cslider-y').slider("value");
  var z = $('#cslider-z').slider("value");
  $('#cslider-x-value').html(x);
  $('#cslider-y-value').html(y);
  $('#cslider-z-value').html(z);
}
function updateRotation() {
  var x = $('#rslider-x').slider("value");
  $('#rotslider-x-value').html(x);
}
function intersectionpoint(A, B) {
  var r = -A[1] / B[1];
  var x = (r * B[0] + A[0]) / (r + 1);
  var z = (r * B[2] + A[2]) / (r + 1);
  return [x, 0, z];
}
function objectLabelGenerator() {
  var color = [Math.random(), Math.random(), Math.random(), 1.0];
  var key = color[0] + ':' + color[1] + ':' + color[2];
  if ($traceurRuntime.toProperty(key) in colorset) {
    return uniqueColorGenerator();
  } else {
    $traceurRuntime.setProperty(colorset, key, true);
    return color;
  }
}
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
function isClose(currentCoord, newCoord) {
  if (currentCoord <= newCoord + 0.1 && currentCoord >= newCoord - 0.1) {
    return true;
  }
  return false;
}
function mouseX(e) {
  if (e.pageX)
    return e.pageX;
  else if (e.clientX)
    return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  else
    return null;
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function mouseY(e) {
  if (e.pageY)
    return e.pageY;
  else if (e.clientY)
    return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  else
    return null;
}
function simpleWorldToViewX(x) {
  return x / resolutionWidth;
}
function simpleWorldToViewY(y) {
  return y / resolutionHeight;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function buildPlane(width, squares) {
  var xLength = squares;
  var yLength = squares;
  var heightMapVertexData = [];
  var hd = [];
  var zPosition = 0;
  var part = width / squares;
  var c = 0;
  {
    try {
      throw undefined;
    } catch ($x) {
      {
        $x = 0;
        for (; $x < xLength; $x++) {
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
                      for (; $y < yLength; $y++) {
                        try {
                          throw undefined;
                        } catch (y) {
                          {
                            y = $y;
                            try {
                              try {
                                throw undefined;
                              } catch (yPosition6) {
                                try {
                                  throw undefined;
                                } catch (xPosition6) {
                                  try {
                                    throw undefined;
                                  } catch (yPosition5) {
                                    try {
                                      throw undefined;
                                    } catch (xPosition5) {
                                      try {
                                        throw undefined;
                                      } catch (yPosition4) {
                                        try {
                                          throw undefined;
                                        } catch (xPosition4) {
                                          try {
                                            throw undefined;
                                          } catch (yPosition3) {
                                            try {
                                              throw undefined;
                                            } catch (xPosition3) {
                                              try {
                                                throw undefined;
                                              } catch (yPosition2) {
                                                try {
                                                  throw undefined;
                                                } catch (xPosition2) {
                                                  try {
                                                    throw undefined;
                                                  } catch (yPosition1) {
                                                    try {
                                                      throw undefined;
                                                    } catch (xPosition1) {
                                                      {
                                                        xPosition1 = part * x + part;
                                                        yPosition1 = part * y;
                                                        xPosition2 = part * x + part;
                                                        yPosition2 = part * y + part;
                                                        xPosition3 = part * x;
                                                        yPosition3 = part * y;
                                                        xPosition4 = part * x;
                                                        yPosition4 = part * y;
                                                        xPosition5 = part * x + part;
                                                        yPosition5 = part * y + part;
                                                        xPosition6 = part * x;
                                                        yPosition6 = part * y + part;
                                                        $traceurRuntime.setProperty(hd, c++, [xPosition1, yPosition1]);
                                                        $traceurRuntime.setProperty(hd, c++, [xPosition2, yPosition2]);
                                                        $traceurRuntime.setProperty(hd, c++, [xPosition3, yPosition3]);
                                                        $traceurRuntime.setProperty(hd, c++, [xPosition4, yPosition4]);
                                                        $traceurRuntime.setProperty(hd, c++, [xPosition5, yPosition5]);
                                                        $traceurRuntime.setProperty(hd, c++, [xPosition6, yPosition6]);
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
  c = 0;
  var iloop = [];
  var il = 0;
  var added = {};
  var val = [];
  var alreadyAdded;
  {
    try {
      throw undefined;
    } catch ($i) {
      {
        $i = 0;
        for (; $i < hd.length; $i++) {
          try {
            throw undefined;
          } catch (i) {
            {
              i = $i;
              try {
                alreadyAdded = false;
                if ($traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1]) in added) {
                  iloop.push(added[$traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1])]);
                  alreadyAdded = true;
                }
                if (!alreadyAdded) {
                  $traceurRuntime.setProperty(heightMapVertexData, c++, hd[$traceurRuntime.toProperty(i)][0]);
                  $traceurRuntime.setProperty(heightMapVertexData, c++, 0);
                  $traceurRuntime.setProperty(heightMapVertexData, c++, hd[$traceurRuntime.toProperty(i)][1]);
                  $traceurRuntime.setProperty(added, hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1], il);
                  iloop.push(il);
                  il++;
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
  var plane = [];
  plane.push(iloop);
  plane.push(heightMapVertexData);
  return plane;
}
