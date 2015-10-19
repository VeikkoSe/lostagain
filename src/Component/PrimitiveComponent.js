function PrimitiveComponent(points, color) { // = [0.0, 1.0, 0.0]
    'use strict';

    var name = 'PrimitiveComponent';

    return Object.freeze({
        getName: function() {
            return name;
        }
        , points, color
    });

}


