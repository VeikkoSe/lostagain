function TextTimer(level) {
    'use strict';
    //constructor(level) {

    var events = {};
    //this.events['0'] = 'A';

    //}

    var init = function() {
        events['2000'] = 'Lights!';
        events['4000'] = 'Camera!';
        events['6000'] = 'Action!';

        events['8000'] = ' ';
    };

    var getLevelText = function(level) {
        return events;
    };
    return {
        getLevelText,
        init
    }

}