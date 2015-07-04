function RenderableComponent() {

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let xPos = 0;
let yPos = 0;
let zPos = 0;
let scale = 1;
let xWidth = 1;
let yWidth = 1;
let zWidth = 1;
    let name = "RenderableComponent";


    return {
        name,
        getXPos: function() {return xPos;},
        setXPos: function(v) {xPos = v;},
        getYPos: function() {return yPos;},
        setYPos: function(v) {yPos = v;},
        getZPos: function() {return zPos;},
        setZPos: function(v) {zPos = v;},

        getScale: function() {return scale;},
        setScale: function(v) {scale = v;},

        getAngleX: function() {return angleX;},
        setAngleX: function(v) {angleX=v;},
        getAngleY: function() {return angleY;},
        setAngleY: function(v) {angleY = v;},
         getAngleZ: function() {return angleZ;},
        setAngleZ: function(v) {angleZ = v},
        getXWidth: function() {return xWidth;},
        setXWidth: function(v) {xWidth = v;},

        getYWidth: function() {return yWidth;},
        setYWidth: function(v) {yWidth = v;},
        getZWidth: function() {return zWidth;},
        setZWidth: function(v) {zWidth = v;}
    };


}

