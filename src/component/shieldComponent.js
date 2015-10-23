function shieldComponent(amount, sprite) {
    'use strict';

    var name = 'ShieldComponent';
    var max = amount;
    var lastHit = 0;

    return Object.freeze({
        getName: function() {
            return name;
        },
        getAmount: function() {
            return amount;
        },
        setAmount: function(v) {
            amount = v;
        },
        getSprite: function() {
            return sprite;
        },
        setLastHit: function(v) {
            lastHit = v;
        },
        getLastHit: function() {
            return lastHit;
        },
        getMax: function() {
            return max;
        }
    });

}
