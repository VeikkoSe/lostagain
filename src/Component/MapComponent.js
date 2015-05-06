class MapComponent extends Component {
    constructor(x,y) {
        this.name = "MapComponent";
        //this.map = map;
        this.xGridWorldPos = 0;
        this.yGridWorldPos = 0;
        this.xPlayerPos = 0;
        this.yPlayerPos = 0;
        this.width = x;
        this.height = y;
        this.visited = {};
        this.holes = {};
        this.xEndBoss = 5;
        this.yEndBoss = 5;



    }

}