function layout(xPos, yPos, component, size) {
    'use strict';

    var children = [];

    return {
        getChildren: function() {
            return children;
        },
        getXPos: function() {
            return xPos;
        },
        getYPos: function() {
            return yPos;
        },

        getSize: function() {
            return size;
        },
        setSize: function(v) {
            size = v;
        },
        getComponent: function() {
            return component;
        },

        addChildren: function(layout) {
            children.push(layout);
        },
        init: function() {

        },
        start: function() {

        },
        subscribe: function() {

        }
    };

}
