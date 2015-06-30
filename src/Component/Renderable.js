function RenderableComponent(params) {

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let {xPos,yPos,zPos,scale,xWidth,yWidth,zWidth} = params;
    let name = "RenderableComponent";


    return {
        name, xPos, yPos, zPos, scale, angleX, angleY, angleZ, xWidth, yWidth, zWidth
    };


}

