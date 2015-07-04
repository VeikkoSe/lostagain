function MomentumComponent() {


    let name = "MomentumComponent";
    let lt = 0;
    let turnSpeed = 10000;
    let speed = 10;
    let acceleration = 50;
    let accelerationOn = 0;
    let rotateLeft = 0;
    let rotateRight = 0;
    let velocityX = 0;
    let velocityY = 0;
    let velocityZ = 0;
    let routeEndXpos = 0;
    let routeEndYpos = 0;
    let routeEndZpos = 0;

    return {
        name,
        getTurnSpeed:function() {return turnSpeed;},
        setTurnSpeed:function(v) {turnSpeed = v;},
        getSpeed:function() {return speed;},
        setSpeed:function(v) {speed =v},
        getAccelerationAmount:function() {return acceleration;},
        setAccelerationAmount:function(v) {acceleration = v},
        setCurrentlyAccelerating:function(v) {accelerationOn = v},
        getCurrentlyAccelerating:function() {return accelerationOn;},
        getRotatingLeft:function() {return rotateLeft;},
        setRotatingLeft:function(v) {rotateLeft = v;},
        getRotatingRight:function() {return rotateRight;},
        setRotatingRight:function(v) {rotateRight = v;},
        getVelocityX:function() {return velocityX;},
        setVelocityX:function(v) {velocityX = v;},
        getVelocityZ:function() {return velocityZ;},
        setVelocityZ:function(v) {velocityZ = v;},
        getVelocityY:function() {return velocityY;},
        setVelocityY:function(v) {velocityY = v;},
        setRouteEndXpos:function(v) {routeEndXpos = v; },
        getRouteEndXpos:function() {return routeEndXpos},
        setRouteEndYpos:function(v) {routeEndYpos = v;},
        getRouteEndYpos:function() {return routeEndYpos;},
        setRouteEndZpos:function(v) {routeEndZpos = v;},
        getRouteEndZpos:function() {return routeEndZpos;}

    };


}

