function RespawnComponent() {
    'use strict';

    var name = 'RespawnComponent';
    //TODO: If we want to respawn near something
    //If not specified just spawn at a random spot near player
    var target;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getTarget: function() {
            return target;
        },
        setTarget: function(v) {
            target = v;
        }
    });

}
