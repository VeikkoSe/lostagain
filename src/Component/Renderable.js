function RenderableComponent(params) {

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let {x,y,z,scale,xWidth,yWidth,zWidth} = params;
    let name = "RenderableComponent";


    return Object.freeze({
        name, x, y, z, scale, angleX, angleY, angleZ, xWidth, yWidth, zWidth
    });


}

