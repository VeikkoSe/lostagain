function photontorpedo_constructor() {
    //constructor() {
    let birthTime = 0;
    let angle = 0;
    let xPos = 0;
    let yPos = 0;
    let zPos = 0;
    let visible = 0;
    let speed = 100;
    let deathtime = 1500;

    //}

    return {

        getBirthTime:function() {return birthTime},
        getAngle:function() {return angle},
        getXPos:function() {return xPos},
        getYPos:function() {return yPos},
        getZPos:function() {return zPos},
        getVisible:function() {return visible},
        getSpeed:function() {return speed},
        getDeathtime:function() {return deathtime},


        setBirthTime:function(v) {birthTime = v;},
        setAngle:function(v) {angle = v;},
        setXPos:function(v) {xPos = v;},
        setYPos:function(v) {yPos = v;},
        setZPos:function(v) {zPos = v;},
        setVisible:function(v) {visible = v;},
        setSpeed:function(v) {speed = v;},
        setDeathtime:function(v) {deathtime = v;}

    }


}