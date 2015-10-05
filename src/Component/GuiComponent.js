function GuiComponent(sprites) {
    'use strict';

    var name = "GuiComponent";

    var sprites = sprites;

    return {
        getName: function() {
            return name;
        },
        getSprites: function() {
            return sprites;
        }
    }

}