class MomentumMovable extends Component {
    constructor(speed = 0.01, turnSpeed = 300, routeEndXpos = false, routeEndYpos = false, routeEndZpos = false) {

        this.name = "MomentumMovable";

        this.newXpos = false;
        this.newYpos = false;
        this.newZpos = false;

        //we make the object move when it's created.
        this.routeDone = false;
        this.routeEndXpos = routeEndXpos;
        this.routeEndYpos = routeEndYpos;
        this.routeEndZpos = routeEndZpos;

        //this.path = {};


        this.lt = 0;
        this.turnSpeed = turnSpeed;
        this.speed = speed;
        this.acceleration = 50;
        this.accelerationOn = 0;
        this.rotateLeft = 0;
        this.rotateRight = 0;
        this.velocityX = 0;
        this.velocityZ = 0;


    }


}