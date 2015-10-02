function CollisionComponent(group) {
    "use strict";

    var name = "CollisionComponent";
    var group = group;
    var xPos = null;
    var yPos = null;
    var zPos = null;
    var xWidth = 10;
    var yWidth = 10;
    var zWidth = 10;
    var entity = null;


    return Object.freeze({
        getName: function () {
            return name;
        },
        setGroup: function (v) {
            group = v;
        },

        setXPos: function (v) {
            xPos = v
        },
        setYPos: function (v) {
            yPos = v
        },
        setZPos: function (v) {
            zPos = v
        },

        setXWidth: function (v) {
            xWidth = v
        },
        setYWidth: function (v) {
            yWidth = v
        },
        setZWidth: function (v) {
            zWidth = v
        },
        setEntity: function (v) {
            entity = v
        },

        getGroup: function (v) {
            return group;
        },
        getXPos: function () {
            return xPos;
        },
        getZPos: function () {
            return zPos;
        },
        getYPos: function () {
            return yPos;
        },
        getXWidth: function () {
            return xWidth;
        },
        getYWidth: function () {
            return yWidth;
        },
        getZWidth: function () {
            return zWidth;
        },
        getEntity: function () {
            return entity;
        }
    });


}

