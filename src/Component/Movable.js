function Movable(speed = 0.1) {
    //constructor(speed = 0.1) {

    let name = "Movable";

    let newXpos = false;
    let newYpos = false;
    let newZpos = false;
    let path = {};

    let angle = 90;
    let lt = 0;
    let speed = speed;
    let acceleration = 5;
    //every jump in the map takes one unit of gas
    //let gas = 1;


//    }

    return {name, newXpos, newYpos, newZpos, path, angle, lt, speed, acceleration}

}