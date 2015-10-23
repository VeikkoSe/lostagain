function textTimer() {
    'use strict';

    var events = {};

    var init = function() {
        events['2000'] = 'Lights!';
        events['4000'] = 'Camera!';
        events['6000'] = 'Action!';

        events['8000'] = ' ';
    };

    var getLevelText = function() {
        return events;
    };
    return Object.freeze({
        getLevelText,
        init
    });

}
