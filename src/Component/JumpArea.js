class JumpArea extends Component {
    constructor(x, y, z, color) {
        this.name = "JumpArea";
        this.radius = 300;
        this.pointAmount = 200;
        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
        this.points = circleXY({x: this.xPos, y: this.yPos, z: this.zPos}, this.radius, this.pointAmount);
        this.color = color;
        this.visible = false;

    }


}