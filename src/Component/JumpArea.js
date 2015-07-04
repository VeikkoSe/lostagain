function JumpAreaComponent(buffer, pts, x, y, z, color) {
    //constructor(x, y, z, color) {
    let name = "JumpAreaComponent";
    let radius = 300;
    let pointAmount = 200;
    let xPos = x;
    let yPos = y;
    let zPos = z;
    let points = pts;
    let color = color;
    let visible = true;
    let vertexPositionBuffer = buffer;
    //}
    return {name, radius, xPos, zPos, yPos, visible, pointAmount, color, points, vertexPositionBuffer}


}