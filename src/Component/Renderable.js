class Renderable extends Component {
    constructor(x = 0, y = 0, z = 0, scale = 1, angleX = 0, angleY = 0, angleZ = 0) {
        this.name = "Renderable";

        this.xPos = x;
        this.yPos = y;
        this.zPos = z;

        this.angleX = angleX;
        this.angleY = angleY;
        this.angleZ = angleZ;

        this.scale = scale;

        //this.block = blockManager.getBlockFromXY(imitialX, initialZ);


    }


}