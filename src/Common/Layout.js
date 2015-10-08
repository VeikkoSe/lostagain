function layout_constructor(xPos, yPos, component, size) {
    // constructor(xPos, yPos, component = null, size = 64) {

    var xPos = xPos;

    var size = size;
    var yPos = yPos;
    var component = component;
    var children = [];
    //var rootX = null;
    //var rootY = null;

    //}

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