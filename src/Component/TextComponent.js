function TextComponent(level) {
    'use strict';

    //constructor(level) {
    var name = 'TextComponent';

    var t = textimer_constructor();
    t.init();
    var texts = t.getLevelText(level);

    return {
        getName: function() {
            return name;
        },
        getTexts: function() {
            return texts;
        }
    };

}

