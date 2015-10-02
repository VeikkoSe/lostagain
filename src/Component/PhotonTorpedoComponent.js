function PhotonTorpedoComponent(sprite) {
    "use strict";

    //constructor() {
    var name = 'PhotonTorpedoComponent';

    var sprite = sprite;


    return {
        getName: function () {
            return name;
        },
        getSprite: function () {
            return sprite;
        }
    }

}