function MultiTrailComponent() {
    "use strict";

    //constructor() {
    var name = "MultiTrailComponent";
    var trailComponents = [];


    //}

    var addTrail = function (trailComponent) {
        trailComponents.push(trailComponent);
    };

    return {
        getName: function () {
            return name;
        },
        getTrailComponents: function() {
            return trailComponents;
        },
        addTrail
    }

}