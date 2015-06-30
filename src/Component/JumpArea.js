function JumpAreaController(x, y, z, color) {
    //constructor(x, y, z, color) {
    let name = "JumpAreaController";
    let radius = 300;
    let pointAmount = 200;
    let xPos = x;
    let yPos = y;
    let zPos = z;
    let points = circleXY({x: xPos, y: yPos, z: zPos}, radius, pointAmount);
    let color = color;
    let visible = false;

    //}
    return {}


}