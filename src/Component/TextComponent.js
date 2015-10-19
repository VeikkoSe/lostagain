function TextComponent() {
    'use strict';

    //constructor(level) {
    var name = 'TextComponent';
    var textBuffer;
    var texts;
    var currentString = '';
    var positionX;
    var positionY;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getTexts: function() {
            return texts;
        },
        setTexts: function(level) {
            var t = TextTimer();
            t.init();
            texts = t.getLevelText(level);
        },
        setTextBuffer: function(v) {
            textBuffer = v;
        },
        getTextBuffer: function() {
            return textBuffer;
        },
        getCurrentString: function() {
            return currentString;
        },
        setCurrentString: function(v) {
            currentString = v;
        },
        setPosition: function(x, y) {
            positionX = x;
            positionY = y;
        },
        getXPos: function() {
            return positionX;

        },
        getYPos: function() {
            return positionY;

        }
    });

}

