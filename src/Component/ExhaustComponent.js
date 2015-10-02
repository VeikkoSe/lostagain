function ExhaustComponent(sprite, length, width, offSetFromCenter, offSetSideFromCenter) {
    "use strict";

    //constructor(sprite, length = 30, width = 2, offSetFromCenter = 0, offSetSideFromCenter = 0) {
    var name = "ExhaustComponent";
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
    return {
        getName: function () {
            return name;
        },
        getFlow: function () {
            return flow;
        },
        getSquare: function () {
            return square;
        },
        getTexturecoordinates: function () {
            return texturecoordinates;
        },
        setFlow: function (v) {
            flow = v;
        },

        getSprite: function () {
            return sprite;
        },
        getPoints: function () {
            return points;
        },
        setPoints: function (v) {
            points = v;
        }
    }


}