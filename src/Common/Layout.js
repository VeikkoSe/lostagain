class Layout {
    constructor(xPos, yPos, component = null, size = 64) {

        this.xPos = xPos;

        this.size = size;
        this.yPos = yPos;
        this.component = component;
        this.children = [];
        this.rootX = null;
        this.rootY = null;

    }


    getChildren() {
        return this.children;
    }

    addChildren(layout) {
        this.children.push(layout);
    }


}