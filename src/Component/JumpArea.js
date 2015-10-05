function JumpAreaComponent(buffer, pts, x, y, z, color) {
    'use strict';

    //constructor(x, y, z, color) {
    var name = "JumpAreaComponent";
    var radius = 300;
    var pointAmount = 200;
    var xPos = x;
    var yPos = y;
    var zPos = z;
    var points = pts;
    var color = color;
    var visible = true;
    var vertexPositionBuffer = buffer;
    //}
    return {
        getName: function() {
            return name;
        },
        getRadius: function() {
            return radius;
        },
        getPointAmount: function() {
            return pointAmount;
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
        getPoints: function() {
            return points;
        },
        setPoints: function(v) {
            points = v;
        },

        getColor: function() {
            return color;
        },
        getVisible: function() {
            return visible;
        },
        getVertexPositionBuffer: function() {
            return vertexPositionBuffer;
        }

    }

}