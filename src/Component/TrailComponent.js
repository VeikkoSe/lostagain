function TrailComponent(sprite, length, width, offSetFromCenter, offSetSideFromCenter) {
    'use strict';

    //constructor(sprite, length = 30, width = 2, offSetFromCenter = 0, offSetSideFromCenter = 0) {
    var name = 'ExhaustComponent';
    var sprite = sprite;
    //points that are calculated from flow points
    var points = [];
    var flow = [];
    var length = length;
    var width = width;
    var offSetFromCenter = offSetFromCenter;
    var texturecoordinates = [];
    var square = [];
    var offSetSideFromCenter = offSetSideFromCenter;

    //}
    return Object.freeze({
        getName: function() {
            return name;
        },
        getOffSetFromCenter: function() {
            return offSetFromCenter;
        },
        getOffSetSideFromCenter: function() {
            return offSetSideFromCenter;
        },
        getLength: function() {
            return length;
        },
        getWidth: function() {
            return width;
        },
        getFlow: function() {
            return flow;
        },

        getSquare: function() {
            return square;
        },
        getTexturecoordinates: function() {
            return texturecoordinates;
        },
        setFlow: function(v) {
            flow = v;
        },
        setTexturecoordinates: function(v) {
            texturecoordinates = v;
        },

        getSprite: function() {
            return sprite;
        },
        getPoints: function() {
            return points;
        },
        setPoints: function(v) {
            points = v;
        },
        setSquare: function(v) {
            square = v;
        },
        resetTrail: function(v) {
            points = [];
            square = [];
            flow = [];
            texturecoordinates = [];
        }
    });

}