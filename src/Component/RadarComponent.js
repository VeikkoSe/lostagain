function RadarComponent(sprite) {
    "use strict";

    //constructor(sprite) {
    var name = "RadarComponent";

    var sprite = sprite;

    return {
        getName: function () {
            return name;
        }
        , sprite
    }


}