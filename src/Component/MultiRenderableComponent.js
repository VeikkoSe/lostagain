function MultiRenderableComponent(renderables) {
    'use strict';

    //constructor(renderables) {
    var name = 'MultiRenderable';

    return Object.freeze({
        getName: function() {
            return name;
        }, renderables
    });

}
