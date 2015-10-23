function layoutComponent(laS) {
    'use strict';

    var name = 'LayoutComponent';
    var layout = laS;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getLayout: function() {
            return layout;
        }
    });

}





