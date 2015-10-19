function ShieldComponent(amt, sprite) {
    'use strict';

    //constructor(amount, sprite = null) {
    var name = 'ShieldComponent';
    var amount = amt;
    var max = amt;
    var sprite = sprite;
    var lastHit = 0;

    //}

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
        getSprite: function(v) {
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