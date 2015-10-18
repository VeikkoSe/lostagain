function ScoreComponent(amount, sprite) {
    'use strict';

    //constructor(amount, sprite = null) {
    var name = 'ScoreComponent';
    var score = 0;
    var sprite = sprite;

    return {
        getName: function() {
            return name;
        },
        getAmount: function() {
            return 1;
        },
        getValue: function() {
            return score;
        },
        setValue: function(v) {
            score = v;
        },
        getSprite: function(v) {
            return sprite;
        }
    }

}