function MultiExhaustComponent() {
    'use strict';

    //constructor() {
    var name = 'MultiExhaustComponent';
    var exhaustComponents = [];

    //}

    var addExhaust = function(exhaustComponent) {
        exhaustComponents.push(exhaustComponent);
    };

    return {
        getName: function() {
            return name;
        },
        getExhaustComponents: function() {
            return exhaustComponents;
        },
        addExhaust
    };

}