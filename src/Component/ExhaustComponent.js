class ExhaustComponent extends Component {
    constructor(sprite,length = 30,width=2,offSetFromCenter =0,offSetSideFromCenter = 0) {
        this.name = "ExhaustComponent";
        this.sprite = sprite;
        //points that are calculated from flow points
        this.points = [];
        this.flow = [];
        this.length = length;
        this.width  = width;
        this.offSetFromCenter = offSetFromCenter;
        this.texturecoordinates = [];
        this.square = [];
        this.offSetSideFromCenter = offSetSideFromCenter;


    }


}