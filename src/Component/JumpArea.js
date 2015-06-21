function JumpAreaController(x, y, z, color) {
    //constructor(x, y, z, color) {
    let name = "JumpAreaController";
    let radius = 300;
    let pointAmount = 200;
    let xPos = x;
    let yPos = y;
    let zPos = z;
    let points = circleXY({x: this.xPos, y: this.yPos, z: this.zPos}, this.radius, this.pointAmount);
    let color = color;
    let visible = false;

    //}
    return {}


}