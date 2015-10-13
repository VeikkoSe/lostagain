function FaceComponent() {
    'use strict';

    var name = "FaceComponent";
    var target;

    //}

    return {
        getName: function() {
            return name;
        },
        getTarget: function() {
            return target;
        },
        setTarget: function(v) {
            target = v;
        }
    }

}