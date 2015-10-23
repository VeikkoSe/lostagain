function timedTextProcess(sb) {
    'use strict';

    var text = sb.getText();

    var em = sb.getEntityManager();

    var update = function(deltatime, timeSinceStart) {

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];
            if (le.components.TextComponent) {

                var tc = le.components.TextComponent;
                var texts = tc.getTexts();

                for (var key in texts) {
                    if (texts.hasOwnProperty(key)) {

                        if (parseInt(key, 10) < timeSinceStart) {

                            tc.setCurrentString(texts[key]);

                        }

                    }
                }

                if (tc.getCurrentString() != '') {

                    var str = tc.getCurrentString();

                    var characterArray = text.textToC(str);
                    tc.setTextBuffer(text.buildData(characterArray, true, tc.getXPos(), tc.getYPos()));

                }

            }
        }

    };

    return Object.freeze({
        draw: function() {
        }, update, init: function() {
        }
    });
}