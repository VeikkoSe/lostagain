function PhotonTorpedoComponent(sprite) {
    'use strict';

    //constructor() {
    var name = 'PhotonTorpedoComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSprite: function() {
            return sprite;
        }

    });

}
