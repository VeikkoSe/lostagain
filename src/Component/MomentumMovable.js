function MomentumComponent(params) {

    let {speed,turnSpeed,routeEndXpos,routeEndYpos,routeEndZpos} = params;
    let name = "MomentumComponent";
    let lt = 0;
    let turnSpeed = turnSpeed;
    let speed = speed;
    let acceleration = 50;
    let accelerationOn = 0;
    let rotateLeft = 0;
    let rotateRight = 0;
    let velocityX = 0;
    let velocityZ = 0;

    return Object.freeze({
        name,
        lt,
        turnSpeed,
        speed,
        acceleration,
        accelerationOn,
        rotateLeft,
        rotateRight,
        velocityX,
        velocityZ
    });


}

