function action_mapper() {


    let currentlyPressedKeys = {};
    let sb;


    let handleKeyDown = function (event) {

        currentlyPressedKeys[event.keyCode] = true;
    }


    let handleKeyUp = function (event) {
        currentlyPressedKeys[event.keyCode] = false;
    }

    let init = function (sandbox) {
        sb = sandbox;
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        document.onmousemove = handleMouseMove;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;

        let event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        window.addEventListener(event, handleMouseWheel);

    }


    let handleMouseWheel = function(event) {
        //http://jsfiddle.net/BXhzD/
        var normalized;
        if (event.wheelDelta) {
            normalized = (event.wheelDelta % 120 - 0) == -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
        } else {
            var rawAmmount = event.deltaY ? event.deltaY : event.detail;
            normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
        }

        sb.publish("mousewheel", normalized);

    }


    let handleMouseMove = function (e) {



        sb.publish("mousemove", e);
    }

    let handleMouseDown = function (event) {

        sb.publish("mousedown", event);

    }
    let handleMouseUp = function (event) {

        sb.publish("mouseup", event);

    }



    let start = function() {

    }

    return { // immutable (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

        init, subscribe: function () {
        },start,getCurrentlyPressedKeys :function() {return currentlyPressedKeys}



    };
}
