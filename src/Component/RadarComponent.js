function RadarComponent(sprite) {
    'use strict';

    //constructor(sprite) {
    var name = 'RadarComponent';

    return Object.freeze({
        getName: function() {
            return name;
        }
        , sprite
    });

}
