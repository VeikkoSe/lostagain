class Layout {
    constructor(xPos,yPos,sprite=null,component=null) {

        this.sprite = sprite;
        this.xPos = xPos;

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