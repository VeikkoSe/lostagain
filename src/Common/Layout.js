class Layout {
    constructor(xPos,yPos,parent=null,component=null) {
        this.parent = parent;
        this.xPos = xPos;
        this.yPos = yPos;
        this.component = component;
        this.children = null;
        this.rootX = null;
        this.rootY = null;

    }


    getChildren() {
        return this.children;
    }

    addChildren(layout) {
        this.children = layout;
    }











}