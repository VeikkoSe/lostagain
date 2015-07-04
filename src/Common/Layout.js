function layout_constructor() {
    // constructor(xPos, yPos, component = null, size = 64) {

    let xPos = xPos;

    let size = size;
    let yPos = yPos;
    let component = component;
    let children = [];
    let rootX = null;
    let rootY = null;

    //}


    return {
        getChildren: function () {
            return children;
        },

        addChildren: function (layout) {
            children.push(layout);
        },
        init: function () {

        },
        start: function () {

        },
        subscribe: function () {

        }
    }


}