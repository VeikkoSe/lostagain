/*
 * Handles creating the point sprites that represent explosion
 */
function asteroidExplosion(sb) {
    'use strict';

    //var size = sizeString;

    var time = 0;
    var numParticles = 500;
    var xPos;
    var yPos;
    var zPos;
    var gl = sb.getGL();
    var visible = 0;

    var pointEndPositionsBuffer = gl.createBuffer();
    var pointLifetimeBuffer = gl.createBuffer();
    var pointStartPositionsBuffer = gl.createBuffer();

    var init = function() {

        var lifetimes = [];
        var startPositions = [];
        var endPositions = [];
        for (var i = 0; i < numParticles; i++) {
            lifetimes.push(Math.random());

            startPositions.push((Math.random() * 0.25) - 0.125);
            startPositions.push((Math.random() * 0.25) - 0.125);
            startPositions.push((Math.random() * 0.25) - 0.125);
            //if (size === 'small') {
            endPositions.push((Math.random() * 10) - 5);
            endPositions.push((Math.random() * 10) - 5);
            endPositions.push((Math.random() * 10) - 5);
            // }
            /*else if (size === 'medium') {
             endPositions.push((Math.random() * 30) - 20);
             endPositions.push((Math.random() * 30) - 20);
             endPositions.push((Math.random() * 30) - 20);
             }
             else if (size === 'large') {

             endPositions.push((Math.random() * 50) - 40);
             endPositions.push((Math.random() * 50) - 40);
             endPositions.push((Math.random() * 50) - 40);
             }*/
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, pointLifetimeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(lifetimes), gl.STATIC_DRAW);

        pointLifetimeBuffer.itemSize = 1;
        pointLifetimeBuffer.numItems = numParticles;

        gl.bindBuffer(gl.ARRAY_BUFFER, pointStartPositionsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(startPositions), gl.STATIC_DRAW);

        pointStartPositionsBuffer.itemSize = 3;
        pointStartPositionsBuffer.numItems = numParticles;

        gl.bindBuffer(gl.ARRAY_BUFFER, pointEndPositionsBuffer);

        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(endPositions), gl.STATIC_DRAW);
        pointEndPositionsBuffer.itemSize = 3;
        pointEndPositionsBuffer.numItems = numParticles;

    };

    return Object.freeze({
        init,
        getTime: function() {
            return time;
        },
        setTime: function(v) {
            time = v;
        },
        getPointStartPositionsBuffer: function() {
            return pointStartPositionsBuffer;
        },
        getPointLifetimeBuffer: function() {
            return pointLifetimeBuffer;
        },
        getPointEndPositionsBuffer: function() {
            return pointEndPositionsBuffer;
        },
        getXPos: function() {
            return xPos;
        },
        getYPos: function() {
            return yPos;
        },
        getZPos: function() {
            return zPos;
        },
        setXPos: function(v) {
            xPos = v;
        },
        setYPos: function(v) {
            yPos = v;
        },
        setZPos: function(v) {
            zPos = v;
        },
        setVisible: function(v) {
            visible = v;
        },
        getVisible: function() {
            return visible;
        }

    });

}


