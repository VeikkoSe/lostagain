/*
 * Handles creating the point sprites that represent explosion
 */
function asteroidexplosion_constructor(sb, x, y, z) {
    "use strict";
    //constructor(x, y, z) {

    var sb = sb;

    var time = 0;
    var numParticles = 500;
    var xPos = x;
    var yPos = y;
    var zPos = z;
    var gl = sb.getGL();

    var pointEndPositionsBuffer = gl.createBuffer();
    var pointLifetimeBuffer = gl.createBuffer();
    var pointStartPositionsBuffer = gl.createBuffer();

    var init = function () {


        var lifetimes = [];
        var startPositions = [];
        var endPositions = [];
        for (var i = 0; i < numParticles; i++) {
            lifetimes.push(Math.random());

            startPositions.push((Math.random() * 0.25) - 0.125);
            startPositions.push((Math.random() * 0.25) - 0.125);
            startPositions.push((Math.random() * 0.25) - 0.125);

            endPositions.push((Math.random() * 50) - 40);
            endPositions.push((Math.random() * 50) - 40);
            endPositions.push((Math.random() * 50) - 40);
        }


        gl.bindBuffer(gl.ARRAY_BUFFER, pointLifetimeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lifetimes), gl.STATIC_DRAW);
        pointLifetimeBuffer.itemSize = 1;
        pointLifetimeBuffer.numItems = numParticles;


        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(startPositions), gl.STATIC_DRAW);
        pointStartPositionsBuffer.itemSize = 3;
        pointStartPositionsBuffer.numItems = numParticles;


        gl.bindBuffer(gl.ARRAY_BUFFER, pointEndPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(endPositions), gl.STATIC_DRAW);
        pointEndPositionsBuffer.itemSize = 3;
        pointEndPositionsBuffer.numItems = numParticles;


    };

    return {
        init,
        getTime: function () {
            return time;
        },
        setTime: function (v) {
            time = v;
        },
        getPointStartPositionsBuffer: function () {
            return pointStartPositionsBuffer;
        },
        getPointLifetimeBuffer: function () {
            return pointLifetimeBuffer;
        },
        getPointEndPositionsBuffer: function () {
            return pointEndPositionsBuffer;
        },
        getXPos: function () {
            return xPos;
        },
        getYPos: function () {
            return yPos;
        },
        getZPos: function () {
            return zPos;
        }

    }


}


