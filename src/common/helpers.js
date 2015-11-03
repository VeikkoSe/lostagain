function helpers() {
    'use strict';

    var randomRangedIntFromPos = function(pos) {

        var rnd = getRandomInt(800 + pos, -800 + pos);
        if (rnd > 600 + pos ||
            rnd < -600 + pos) {
            return rnd;
        }
        else {
            return randomRangedIntFromPos(pos);
        }
    };

    var randomCloseInt = function() {

        return randomCloseInt(30, -30);

    };

    var randomRangedInt = function() {

        var rnd = getRandomInt(500, -500);
        if (rnd > 300 ||
            rnd < -300) {
            return rnd;
        }
        else {
            return getRandomInt(500, -500);
        }
    };

    var getRandomInt = function(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        randomRangedIntFromPos,
        randomCloseInt,
        randomRangedInt,

        //Todo: better volume handling
        swap: function(id, CORE) {

            var e = document.getElementById(id);

            if (e.className === 'soundon') {
                e.className = 'soundoff';

                CORE.setAudioMasterVolume(0);
            }
            else {

                e.className = 'soundon';
                CORE.setAudioMasterVolume(100);
            }
        },

        createHit: function(hc, sc) {

            var timeNow = new Date().getTime();

            if (sc) {
                sc.setLastHit(timeNow);
                if (sc.getLastShieldAdded() === 0) {

                    sc.setLastShieldAdded(timeNow); //TODO: Combine variables

                }
            }

            if (sc && sc.getAmount() > 0) {
                //we count from the first hit untill the shield has reset

                sc.setAmount(sc.getAmount() - 1);
            }
            else {
                hc.setAmount(hc.getAmount() - 1);
            }

            if (hc.getAmount() < 0) {
                hc.setAmount(0);
            }

        },

        printMessage: function(msg) {

            //$('#debugarea').html(msg);
        },

        readCookie: function(name) {

            var nameEQ = name + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        },

        setCookie: function(cname, cvalue, exdays) {

            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires;
        },

        pInt: function(nro) {

            return parseInt(nro, 10);
        },



        randomIntFromInterval: function(min, max) {

            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        getMousePos: function(canvas, evt) {

            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        },

        isInCircle: function(centerX, centerY, radius, x, y) {

            return ((centerX - x) * (centerX - x)) + ((centerY - y) * (centerY - y)) < (radius * radius);
        },

        circleXY: function(x, y, z, radius, amount) {

            var points = [];
            var stepSize = ((2 * Math.PI) / amount);
            for (var d = 0; d <= (2 * Math.PI) - stepSize; d += stepSize) {
                points.push(((Math.sin(d) * radius) + x), y, (Math.cos(d) * radius) + z);
            }
            return points;
        },

        intersectionpoint: function(A, B) {

            //http://stackoverflow.com/questions/2447361/3d-line-plane-intersection-with-simple-plane
            var r = -A[1] / B[1];

            var x = (r * B[0] + A[0]) / (r + 1);
            var z = (r * B[2] + A[2]) / (r + 1);

            return [x, 0, z];

        },
        /*
         objectLabelGenerator: function() {

         var color = [Math.random(), Math.random(), Math.random(), 1.0];
         var key = color[0] + ':' + color[1] + ':' + color[2];
         if (key in colorset) {
         return uniqueColorGenerator();
         }
         else {
         colorset[key] = true;
         return color;
         }
         },
         */
        degToRad: function(degrees) {

            return degrees * Math.PI / 180;
        },

        isClose: function(currentCoord, newCoord) {

            if (currentCoord <= newCoord + 0.1 && currentCoord >= newCoord - 0.1) {
                return true;
            }

            return false;
        },

        isCloseOrbit: function(currentCoord, newCoord) {

            if (currentCoord <= newCoord + 100 && currentCoord >= newCoord - 100) {
                return true;
            }

            return false;
        },

        mouseX: function(e) {

            if (e.pageX) {
                return e.pageX;
            }
            else if (e.clientX) {
                return e.clientX + (document.documentElement.scrollLeft ?
                        document.documentElement.scrollLeft :
                        document.body.scrollLeft);
            }
            else {
                return null;
            }
        },

        isNumeric: function(n) {

            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        mouseY: function(e) {

            if (e.pageY) {
                return e.pageY;
            }
            else if (e.clientY) {
                return e.clientY + (document.documentElement.scrollTop ?
                        document.documentElement.scrollTop :
                        document.body.scrollTop);
            }
            else {
                return null;
            }
        },

        buildPlane: function(width, squares) {

            var xLength = squares;
            var yLength = squares;

            var heightMapVertexData = [];
            var hd = [];

            var zPosition = 0;

            var part = width / squares;

            var c = 0;
            // First, build the data for the vertex buffer
            for (var x = 0; x < xLength; x++) {

                for (var y = 0; y < yLength; y++) {

                    var xPosition1 = part * x + part;
                    var yPosition1 = part * y;

                    var xPosition2 = part * x + part;
                    var yPosition2 = part * y + part;

                    var xPosition3 = part * x;
                    var yPosition3 = part * y;

                    var xPosition4 = part * x;
                    var yPosition4 = part * y;

                    var xPosition5 = part * x + part;
                    var yPosition5 = part * y + part;

                    var xPosition6 = part * x;
                    var yPosition6 = part * y + part;

                    // Position
                    hd[c++] = [xPosition1, yPosition1];
                    hd[c++] = [xPosition2, yPosition2];
                    hd[c++] = [xPosition3, yPosition3];

                    hd[c++] = [xPosition4, yPosition4];
                    hd[c++] = [xPosition5, yPosition5];
                    hd[c++] = [xPosition6, yPosition6];

                }
            }

            c = 0;
            var iloop = [];
            var il = 0;
            var added = {};
            var val = [];
            var alreadyAdded;

            for (var i = 0; i < hd.length; i++) {
                alreadyAdded = false;

                if (hd[i][0] + ',' + hd[i][1] in added) {

                    iloop.push(added[hd[i][0] + ',' + hd[i][1]]);
                    alreadyAdded = true;

                }

                if (!alreadyAdded) {
                    heightMapVertexData[c++] = hd[i][0];
                    heightMapVertexData[c++] = 0;
                    heightMapVertexData[c++] = hd[i][1];

                    added[hd[i][0] + ',' + hd[i][1]] = il;
                    iloop.push(il);

                    il++;
                }
            }
            var plane = [];
            plane.push(iloop);
            plane.push(heightMapVertexData);
            return plane;
        }
    };

}