function PrimitiveComponent(points, color) { // = [0.0, 1.0, 0.0]
    "use strict";

    //constructor(points, color = [0.0, 1.0, 0.0]) {
    var name = "PrimitiveComponent";
    var points = points;
    var color = color;


    return {
        getName: function () {
            return name;
        }
        , points, color
    }


}


