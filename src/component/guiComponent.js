function guiComponent(sprites) {
    'use strict';

    var name = 'GuiComponent';

    return Object.freeze({
        getName: function() {
            return name;
        },
        getSprites: function() {
            return sprites;
        }
    });

}
