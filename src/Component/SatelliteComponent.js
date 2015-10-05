function SatelliteComponent(sprite) {
    'use strict';

    var name = "GuiComponent";

    var sprite = sprite;

    //}
    return {
        getName: function() {
            return name;
        },
        getSprite: function() {
            return sprite;
        }
    }

}