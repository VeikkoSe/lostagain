function SpriteComponent(sprite) {
    'use strict';

    //constructor(sprite) {
    var name = 'SpriteComponent';
    var sprite = sprite;

    //}

    return Object.freeze({
        getName: function() {
            return name;
        }, sprite
    });

}