function laser_constructor() {
    'use strict';
    //constructor() {
    var birthTime = 0;

    var xStartPos = 0;
    var yStartPos = 0;
    var zStartPos = 0;

    var xEndPos = 0;
    var yEndPos = 0;
    var zEndPos = 0;

    var visible = 1;
    var deathtime = 1500;

    //}

    return {

        getBirthTime: function() {
            return birthTime
        },

        getXStartPos: function() {
            return xStartPos
        },
        getYStartPos: function() {
            return yStartPos
        },
        getZStartPos: function() {
            return zStartPos
        },
        getXEndPos: function() {
            return xEndPos
        },
        getYEndPos: function() {
            return yEndPos
        },
        getZEndPos: function() {
            return zEndPos
        },

        getVisible: function() {
            return visible
        },
        getDeathtime: function() {
            return deathtime
        },

        setBirthTime: function(v) {
            birthTime = v;
        },

        setXStartPos: function(v) {
            xStartPos = v;
        },
        setYStartPos: function(v) {
            yStartPos = v;
        },
        setZStartPos: function(v) {
            zStartPos = v;
        },
        setXEndPos: function(v) {
            xEndPos = v;
        },
        setYEndPos: function(v) {
            yEndPos = v;
        },
        setZEndPos: function(v) {
            zEndPos = v;
        },
        setVisible: function(v) {
            visible = v;
        },
        setDeathtime: function(v) {
            deathtime = v;
        }

    }

}