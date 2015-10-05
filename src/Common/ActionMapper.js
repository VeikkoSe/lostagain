/*
 *
 * Handles key press and publishes event so those that want them can use them
 */
function action_mapper() {
    'use strict';

    var currentlyPressedKeys = {};
    var sb;

    var handleKeyDown = function(event) {

        currentlyPressedKeys[event.keyCode] = true;
    };

    var handleKeyUp = function(event) {
        currentlyPressedKeys[event.keyCode] = false;
    };

    var init = function(sandbox) {
        sb = sandbox;
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        document.onmousemove = handleMouseMove;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;

        var event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        window.addEventListener(event, handleMouseWheel);

    };

    var handleMouseWheel = function(event) {
        //http://jsfiddle.net/BXhzD/
        var normalized;
        if (event.wheelDelta) {
            normalized = (event.wheelDelta % 120) == -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
        } else {
            var rawAmmount = event.deltaY ? event.deltaY : event.detail;
            normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
        }

        sb.publish('mousewheel', normalized);

    };

    var handleMouseMove = function(e) {

        sb.publish('mousemove', e);
    };

    var handleMouseDown = function(event) {

        sb.publish('mousedown', event);

    };
    var handleMouseUp = function(event) {

        sb.publish('mouseup', event);

    };

    var start = function() {

    };

    return { // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

        init, subscribe: function() {
        }, start, getCurrentlyPressedKeys: function() {
            return currentlyPressedKeys;
        }

    };
}
