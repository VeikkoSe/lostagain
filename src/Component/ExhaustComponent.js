function ExhaustComponent(msh, offSetFromCenter, offSetSideFromCenter) {
    'use strict';

    var offSetSideFromCenter = offSetSideFromCenter;
    var offSetFromCenter = offSetFromCenter;

    var name = 'ExhaustComponent';

    var mesh = msh;

    //   }
    return {
        getName: function() {
            return name;
        },
        getMesh: function() {
            return mesh;
        },
        getOffSetSideFromCenter: function() {
            return offSetSideFromCenter;
        },
        getOffSetFromCenter: function() {
            return offSetFromCenter;
        }

    };

}